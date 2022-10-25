//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import {
    ListComponentBase,
    GridActionFieldType,
    PageRequestModel,
    GridRowModel,
    CardComponent,
    FormGridPropModel,
    PopupComponent,
    PermissionForm,
    UserRoleModel
} from '../../../shared';
import { Constant, EntityType, Role, FunctionalCode } from '../../../utilities';

import './user-map-manager.scss';
import { UserMapManagerPropModel } from './models/user-map-manager-prop.model';
import { UserMapSectionModel, UserLocationInfoModel, UserMapSectionConstant } from '../../config-shared';

//#endregion application imports

export class UserMapManagerComponent extends ListComponentBase<UserMapManagerPropModel, UserMapSectionModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props, UserMapSectionConstant.form);
        this.setComponentInfo(FunctionalCode.UserMap)
    }

    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook 
     */
    componentDidMount() {
        if (this.hasLocationInfo) {
            this.props.dispatchSetLocationInfo(this.locationInfo as UserLocationInfoModel);
            super.componentDidMount();
        }
        else {
            this.props.dispatchSetError({ isGlobalError: true });
        }
        this.props.dispatchFetchPermissions();
    }

    /**
     * renders html for component 
     */
    render() {
        this.componentInfo.prevPageUrl = this.props.locationInfo?.prevPageUrl;

        return (
            <div>
                <div className="row">
                    <div className="col-sm-12 text-right">
                        {this.renderPrevButton()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <CardComponent
                            content={
                                <>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <label className="field-label">{EntityType[this.props.locationInfo?.entityType]}: {this.props.locationInfo?.entityName}</label>
                                        </div>
                                    </div>
                                </>
                            }
                        />
                    </div>
                </div>
                {this.renderFormTable()}
                {this.renderPermissionPopup()}
            </div>
        );
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
            {
                ...UserMapSectionConstant.headers.role,
                isEditable: (row: GridRowModel<UserMapSectionModel>) => {
                    return this.canEditUserMaps(row.rowData.roleId) &&
                        (row.rowData.entityType !== this.props.locationInfo.entityType ||
                            row.rowData.entityId !== this.props.locationInfo.entityId
                        );
                },
                getFieldPropsCallBack: (row: GridRowModel<UserMapSectionModel>) => {
                    if (this.props.locationInfo?.entityType === EntityType.Project) {
                        if (this.props.userProfile?.role === Role.ProjectAdmin) {
                            return {
                                options: this.props.locationInfo?.roleOptions?.filter(x => x.value === Role.ProjectUser),
                            };
                        }
                    }
                    return {
                        options: this.props.locationInfo?.roleOptions
                    };
                }
            }
        ];

        this.gridPropModel.actionElements = [
            {
                type: GridActionFieldType.Add,
                tooltip: UserMapSectionConstant.assignBtn,
                onClick: this.onAddUserClick.bind(this),
                canDisplay: (row: GridRowModel<UserMapSectionModel>) => {
                    return this.canEditUserMaps(row.rowData.roleId) && (row.rowData.entityType !== this.props.locationInfo.entityType ||
                        row.rowData.entityId !== this.props.locationInfo.entityId
                    );
                }
            },
            {
                type: GridActionFieldType.Remove,
                tooltip: UserMapSectionConstant.unassignBtn,
                onClick: this.onUserRemoveClick.bind(this),
                canDisplay: (row: GridRowModel<UserMapSectionModel>) => {
                    return this.canEditUserMaps(row.rowData.roleId) && (row.rowData.entityType === this.props.locationInfo.entityType &&
                        row.rowData.entityId === this.props.locationInfo.entityId
                    );
                }
            },
            {
                type: GridActionFieldType.Edit,
                tooltip: UserMapSectionConstant.editPermissionBtn,
                onClick: this.onEditPermissionClick.bind(this),
                canDisplay: (row: GridRowModel<UserMapSectionModel>) => {
                    return this.canEditUserMaps(row.rowData.roleId) &&
                        row.rowData.roleId === Role.ProjectUser &&
                        (row.rowData.entityType === this.props.locationInfo.entityType &&
                            row.rowData.entityId === this.props.locationInfo.entityId
                        );
                }
            }
        ];
        this.gridPropModel.paginationInfo.rowsPerPage = 10;
    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult(pageRequest: PageRequestModel) {
        this.props.dispacthFetchAllUsers(
            {
                listParameter: pageRequest,
                excludeInactive: true,
                entityType: this.locationInfo.entityType,
                entityId: this.locationInfo.entityId,
                defaultRole: this.locationInfo.defaultRole
            },
            (response) => {
                if (!this.locationInfo.defaultRole) {
                    (this.gridPropModel as FormGridPropModel<UserMapSectionModel>).isEditableDefault = true;
                }
            },
            this.handleApiFetchError.bind(this)
        );
    }

    /**
     * on back button click go to previous page
     */
    public onPrevButtonClick() {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: this.props.locationInfo?.prevPageUrl,
                    state: this.props.locationInfo
                }
            );
        }
    }

    /**
     * on remove user link click callback
     * @param row
     */
    public onUserRemoveClick(row: GridRowModel<UserMapSectionModel>) {
        let userMap = this.props.assignedUsers.items.find(x => x.userId === row.rowData.userId);
        if (userMap) {
            this.props.dispatchRemoveUser(
                userMap.id,
                (response) => {
                    this.handleApiSaveSuccess(response);
                    if (this.isApiResponseSuccess(response)) {
                        if (this.isApiResponseSuccess(response)) {
                            this.props.dispatchRefresh(
                                {
                                    ...row,
                                    rowData: {
                                        ...row.rowData,
                                        entityId: undefined,
                                        entityType: undefined,
                                        roleId: undefined
                                    }
                                },
                                this.props.formlist,
                                this.props.assignedUsers.items
                            );
                        }
                    }
                },
                this.handleApiSaveError.bind(this));
        }
    }

    /**
     * on add user link click callback
     * @param row
     */
    public onAddUserClick(row: GridRowModel<UserMapSectionModel>) {
        let gridRow = {
            ...this.props.gridFormData.find(x => row.index === x.index),
            actionType: row.actionType,
            index: row.index
        };
        if (gridRow.rowData.roleId > 0) {
            this.props.dispatchSaveUser(
                {
                    entityId: this.props.locationInfo.entityId,
                    entityType: this.props.locationInfo.entityType,
                    userId: gridRow.rowData.userId,
                    roleId: gridRow.rowData.roleId
                },
                (response) => {
                    this.handleApiSaveSuccess(response);
                    if (this.isApiResponseSuccess(response)) {
                        this.props.dispatchRefresh(
                            {
                                ...gridRow,
                                rowData: {
                                    ...gridRow.rowData,
                                    id: response.data,
                                    entityId: this.props.locationInfo.entityId,
                                    entityType: this.props.locationInfo.entityType,
                                }
                            },
                            this.props.formlist,
                            this.props.assignedUsers.items
                        );
                    }

                },
                this.handleApiSaveError.bind(this))
        }
    }

    /**
     * on edit permission link click callback
     * @param row
     */
    public onEditPermissionClick(row: GridRowModel<UserMapSectionModel>) {
        this.props.dispatchSelectedRoles({
            userInfo: {
                entityId: row.rowData.entityId,
                entityType: row.rowData.entityType,
                userId: row.rowData.userId
            },
            roles: row.rowData.userRoles.filter(x => x.entityType === row.rowData.entityType &&
                x.entityId === row.rowData.entityId).map(x => x.roleId)
        });
        this.props.dispatchShowPopup(true);
    }

    /**
     * on save permission link click callback
     * @param roles
     */
    public onSavePermissionClick(roles: UserRoleModel[]) {
        this.props.dispatchSaveUserRoles(roles, this.handleApiSaveSuccess.bind(this), this.handleApiSaveError.bind(this));
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
     * renders permission popup control
     */
    private renderPermissionPopup() {
        return (
            <PopupComponent open={this.props.showPermissionPopup}
                closeHandler={this.onPopupClose.bind(this)}
                popupHeader="Edit Permissions"
                popupContent={
                    <PermissionForm
                        namespace={Constant.reducerKey.userMapManagerReducer}
                        handleSave={this.onSavePermissionClick.bind(this)}
                    />
                }
            >
            </PopupComponent >
        );
    }

    //#endregion private methods
}
