//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import {
    PageRequestModel,
    ButtonComponent,
    ListComponentBase,
    GridActionFieldType,
    CardComponent,    GridRowModel,    PopupComponent,
    PermissionForm,
    UserRoleModel
} from '../../../shared';
import { Url, EntityType, Role } from '../../../utilities';

import { UserMapSectionPropModel, UserMapSectionModel } from './models';
import { UserMapSectionConstant } from './user-map-section.constant';

//#endregion application imports

export class UserMapSectionComponent extends ListComponentBase<UserMapSectionPropModel, UserMapSectionModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook 
     */
    componentDidMount() {
        super.componentDidMount();
        this.props.dispatchFetchPermissions();
    }

    /**
     * renders html for component 
     */
    render() {
        if (this.props.showUserTab) {
            return (
                <CardComponent
                    content={this.renderUserPanelContent()}
                />
            );
        }
        return (null);
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * sets grid props 
     */
    public setGridInfo() {
        this.gridPropModel.headerCells = [
            UserMapSectionConstant.headers.firstName,
            UserMapSectionConstant.headers.lastName,
            UserMapSectionConstant.headers.email,
            UserMapSectionConstant.headers.role
        ];
        this.gridPropModel.actionElements = [
            {
                type: GridActionFieldType.Remove,
                tooltip: UserMapSectionConstant.unassignBtn,
                onClick: this.onUserRemoveClick.bind(this),
                canDisplay: (row: GridRowModel<UserMapSectionModel>) => this.canEditUserMaps(row.rowData.roleId)
            },
            {
                type: GridActionFieldType.Edit,
                tooltip: UserMapSectionConstant.editPermissionBtn,
                onClick: this.onEditPermissionClick.bind(this),
                canDisplay: (row: GridRowModel<UserMapSectionModel>) => {
                    return this.canEditUserMaps(row.rowData.roleId) &&
                        row.rowData.roleId !== Role.ProjectAdmin &&
                        row.rowData.entityType === EntityType.Project;
                }
            }
        ];
    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult(pageRequest: PageRequestModel) {
        this.props.dispatchFetchEntityUsers(
            {
                listParameter: pageRequest,
                excludeInactive: true,
                entityType: this.props.locationInfo.entityType,
                entityId: this.props.locationInfo.entityId,
                defaultRole: this.props.locationInfo.defaultRole
            },
            this.handleApiFetchError.bind(this)
        );
    }

    /**
     * on add user link click
     */
    public onAddUserClick() {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.manageUserMapsPage,
                    state: this.props.locationInfo
                }
            );
        }
    }

    /**
     * on remove user link click callback
     * @param rowData
     */
    public onUserRemoveClick(rowData: UserMapSectionModel) {
        this.props.dispatchRemoveUser(
            rowData.id,
            (response) => {
                this.handleApiSaveSuccess(response);
                if (this.isApiResponseSuccess(response)) {
                    this.props.dispatchFetchEntityUsers(
                        {
                            listParameter: this.getPageRequestInfo(),
                            excludeInactive: true,
                            entityType: this.props.locationInfo.entityType,
                            entityId: this.props.locationInfo.entityId,
                            defaultRole: this.props.locationInfo.defaultRole
                        },
                        this.handleApiFetchError.bind(this)
                    );
                }
            },
            this.handleApiSaveError.bind(this));
    }

    /**
     * on edit permission link click callback
     * @param row
     */
    public onEditPermissionClick(row: UserMapSectionModel) {
        this.props.dispatchSelectedRoles({
            userInfo: {
                entityId: row.entityId,
                entityType: row.entityType,
                userId: row.userId
            },
            roles: row.userRoles.filter(x => x.entityType === row.entityType &&
                x.entityId === row.entityId).map(x => x.roleId)
        });
        this.props.dispatchShowPopup(true);
    }

    /**
     * on save permission link click callback
     * @param roles
     */
    public onSavePermissionClick(roles: UserRoleModel[]) {
        this.props.dispatchSaveUserRoles(roles,
            (response) => {
                if (this.isApiResponseSuccess(response)) {
                    this.fetchGridResult(this.getPageRequestInfo());
                    this.handleApiSaveSuccess(response);
                }
            },
            this.handleApiSaveError.bind(this));

        this.props.dispatchSelectedRoles(null);
        this.props.dispatchShowPopup(false);
    }

    /**
     * on popup close
     */
    public onPopupClose() {
        this.props.dispatchShowPopup(false);
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * determines if user map can be edited
     * @param rowRole
     */
    private canEditUserMaps(rowRole?: number) {
        //If entity is client, check if logged in user has admin role
        if (this.props.locationInfo.entityType === EntityType.Client &&
            this.props.userProfile?.role === Role.Admin) {
            return true;
        }
        //if entity is project and logged in user is project admin, then do not display for other project admins
        if (this.props.locationInfo.entityType === EntityType.Project) {
            switch (this.props.userProfile?.role) {
                case Role.Admin:
                    return true;
                case Role.ClientAdmin:
                    return true;
                case Role.ProjectAdmin:
                    return (!rowRole || rowRole === Role.ProjectUser);
                case Role.ProjectUser:
                    return false;
                default:
                    return false;
            }

        }
        return false;
    }

    /**
     * renders user panel content 
     */
    private renderUserPanelContent() {
        return (
            <>
                {this.renderAddUserLink()}
                {this.renderTable()}
                {this.renderPermissionPopup()}
            </>
        );
    }

    /**
     *  renders html for add/hide division grid
     */
    private renderAddUserLink() {
        if (this.canEditUserMaps()) {
            return (
                <div className="row">
                    <div className="col-sm-12">
                        <ButtonComponent
                            className="float-right"
                            type="button"
                            displayText="Assign Users"
                            displayType="link"
                            id="btn_add_edit_add_user"
                            fontIconPrefix="fa fa-plus"
                            clickHandler={this.onAddUserClick.bind(this)}
                        >
                        </ButtonComponent>
                    </div>
                </div>
            );
        }
        return (null);
    }

    /**
     * renders permission popup control
     */
    private renderPermissionPopup() {
        return (
            <PopupComponent open={this.props.showPermissionPopup}
                closeHandler={this.onPopupClose.bind(this)}
                popupHeader="Edit Permissions"
                popupContent={
                    <PermissionForm
                        namespace={this.props.namespace}
                        handleSave={this.onSavePermissionClick.bind(this)}
                    />
                }
            >
            </PopupComponent >
        );
    }

    //#endregion private methods
}
