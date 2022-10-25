//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import {
    PageRequestModel,
    PopupComponent,
    ButtonComponent,
    ListComponentBase,
    CardComponent,
    GridActionFieldType
} from '../../../shared';
import { Constant } from '../../../utilities';

import { QualityProfileSectionPropModel } from './models';
import { QualityProfileFormModel, QualityProfileForm } from './quality-profile-form';
import { QualityProfileSectionConstant } from './quality-profile-section.constant';

//#endregion application imports

export class QualityProfileSectionComponent extends ListComponentBase<QualityProfileSectionPropModel, QualityProfileFormModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        super.componentDidMount();
        this.props.dispatchEntityProfiles(this.props.entityType, this.props.entityId, this.handleApiFetchError.bind(this));
    }

    /**
     * renders html for component 
     */
    render() {
        return this.renderQualityProfilePanel();
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * sets grid props 
     */
    public setGridInfo() {
        this.gridPropModel.headerCells = [
            QualityProfileSectionConstant.headers.languageName,
            QualityProfileSectionConstant.headers.qualityProfileName
        ];
        this.gridPropModel.actionElements = [
            {
                type: GridActionFieldType.Edit,
                onClick: this.onEditProfileClick.bind(this)
            },
            {
                type: GridActionFieldType.Delete,
                onClick: this.onRemoveProfileClick.bind(this)
            }
        ]
    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult(pageRequest: PageRequestModel) {
    }

    /**
     * on add profile link click
     */
    public onAddProfileClick() {
        this.props.dispatchShowPopup(true);
        this.props.dispatchSetInitialInfo(null);
    }

    /**
     * on edit profile link click callback
     * @param rowData
     */
    public onEditProfileClick(rowData: QualityProfileFormModel) {
        rowData.isDisable = true;
        this.props.dispatchShowPopup(true);
        this.props.dispatchSetInitialInfo(rowData);
        this.props.dispatchSetSelectedInfo(rowData);
    }

    /**
     * on profile save click
     * @param profileInfo
     */
    public onProfileSave(profileInfo: QualityProfileFormModel) {
        profileInfo.entityId = this.props.entityId;
        profileInfo.entityType = this.props.entityType;
        this.props.dispatchSaveEntityProfile(
            profileInfo,
            (response) => {
                this.handleApiSaveSuccess(response);
                this.props.dispatchEntityProfiles(this.props.entityType, this.props.entityId, this.handleApiFetchError.bind(this));
                this.props.dispatchShowPopup(false);                
            },
            this.handleApiSaveError.bind(this)
        );
        this.props.dispatchShowPopup(false);
        if (this.props.history) {
            this.props.history.push(
                {
                    state: {isRedirect: false}
                }
            );
        }
    }

    /**
     * on popup close
     */
    public onPopupClose() {
        this.props.dispatchShowPopup(false);
    }

    /**
     * on remove profile link click callback
     * @param rowData
     */
    public onRemoveProfileClick(rowData) {
        this.props.dispatchRemoveProfileMapping(
            rowData.id,
            (response) => {
                this.handleApiSaveSuccess(response);
                if (this.isApiResponseSuccess(response)) {
                    this.props.dispatchEntityProfiles(this.props.entityType, this.props.entityId, this.handleApiFetchError.bind(this));
                }
            },
            this.handleApiFetchError.bind(this));
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders quality profile grid
     */
    private renderQualityProfilePanel() {
        if (this.props.showQualityProfileTab) {
            return (
                <CardComponent
                    content={
                        <>
                            {this.renderAddProfileLink()}
                            {this.renderTable()}
                            {this.renderPopup()}
                        </>
                    }
                />
            );
        }
        return (null);
    }

    /**
     *  renders html for add profile link
     */
    private renderAddProfileLink() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <ButtonComponent
                        className="float-right"
                        type="button"
                        displayText="Add Quality Profile"
                        displayType="link"
                        id="btn_project_static_scan_add_quality_profile"
                        fontIconPrefix="fa fa-plus"
                        clickHandler={this.onAddProfileClick.bind(this)}
                    >
                    </ButtonComponent>
                </div>
            </div>
        );
    }

    /**
     * renders popup 
     */
    private renderPopup() {
        let title: string = Constant.pageTitle.addQualityProfilePage;
        if (this.props.selectedProfile && this.props.selectedProfile.isDisable) {
            title = Constant.pageTitle.editQualityProfilePage;
        }
        return (
            <PopupComponent open={this.props.showPopup}
                closeHandler={this.onPopupClose.bind(this)}
                popupHeader={title}
                popupContent={this.getPopupContent()}
            >
            </PopupComponent >
        );
    }

    /**
     * gets popup content
     */
    private getPopupContent() {
        return (
            <QualityProfileForm
                isEdit={this.props.selectedProfile && this.props.selectedProfile.isDisable ? true : false}
                onSubmit={this.onProfileSave.bind(this)}
                namespace={this.props.namespace}
                clientId={this.props.clientId}
            />
        );
    }

    //#endregion private methods
}
