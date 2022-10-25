//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { Constant, Url, FunctionalCode } from '../../../utilities';
import { ListComponentBase, ButtonComponent, CardComponent, GridActionFieldType } from '../../../shared';

import './quality-profile-config.scss';
import { LanguageProfileMapModel, RuleModel } from '../models';
import { QualityProfileConfigPropModel } from './models/quality-profile-config-prop.model';
import { QualityProfileConfigConstant } from './quality-profile-config.constant';
import { QualityProfileform } from './quality-profile-form/quality-profile.form';

//#endregion application imports

export class QualityProfileConfigComponent extends ListComponentBase<QualityProfileConfigPropModel, RuleModel> {

    //#region model properties

    private get profileInfo(): LanguageProfileMapModel {
        if (this.hasLocationInfo && this.locationInfo.profileInfo) {
            return this.locationInfo.profileInfo;
        }
        return new LanguageProfileMapModel();
    }

    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props, Constant.pageTitle.staticScanAddQualityProfilePage);
        if (this.profileInfo.id && this.profileInfo.id > 0) {
            this.setComponentInfo(FunctionalCode.StaticEditRule);
        }
        else {
            this.setComponentInfo(FunctionalCode.StaticAddRule);
        }
    }

    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook 
     */
    componentDidMount() {
        super.componentDidMount();
        this.props.dispatchFetchlanguageTypes(this.handleApiFetchError.bind(this));
        this.props.dispatchprofileLanguage(this.profileInfo.id);
        this.props.dispatchQualityProfileInfo(this.profileInfo);
        if (this.componentInfo.code === FunctionalCode.StaticEditRule) {
            this.setEditStateDefaults();
        }
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                {this.renderPrevButton()}
                <div>
                    <CardComponent
                        content={
                            <div className="row">
                                <div className="col-sm-12">
                                    <QualityProfileform onSubmit={this.onProfileEditSave.bind(this)} />
                                </div>
                            </div>
                        }
                    />
                    {this.renderImportRulesPanel()}
                </div>
            </>

        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * sets grid props 
     */
    public setGridInfo() {
        this.gridPropModel.headerCells = [
            QualityProfileConfigConstant.headers.RuleName
        ];
        this.gridPropModel.actionElements = [
            {
                type: GridActionFieldType.Delete,
                onClick: this.onRemoveClick.bind(this)
            }
        ]
    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult() {
        this.props.dispatchFetchProfileBasedRules(
            {
                qualityProfileId: this.profileInfo.id,
                pagination: this.getPaginationInfo()
            },
            this.handleApiFetchError.bind(this));
    }

    /**
     * sets edit state default values
     */
    public setEditStateDefaults() {
        super.setEditStateDefaults(FunctionalCode.StaticEditRule);
    }

    /**
     * on clicking remove, rule is deactivated from selected profile 
     * @param data
     */
    public onRemoveClick(data: RuleModel) {
        this.props.dispatchSaveUpdateProfileRules(
            {
                qualityProfileId: this.profileInfo.id || 0,
                ruleKey: data.key,
                isActive: false
            },
            (response) => {
                this.handleApiSaveSuccess(response);
                this.fetchGridResult();
            },
            this.handleApiFetchError.bind(this));

    }

    /**
     * on saving or updating profile.
     * @param importRulesInfo
     */
    public onProfileEditSave(formData: LanguageProfileMapModel) {
        let profileRequest: LanguageProfileMapModel = { ...formData };

        //for edit mode language id will be disabled. Hence fetching from location state
        if (this.profileInfo.id > 0) {
            profileRequest.id = this.profileInfo.id;
            profileRequest.languageId = this.profileInfo.languageId
        }

        this.props.dispatchSaveNewProfile(profileRequest,
            (response) => {
                if (this.isApiResponseSuccess(response) && this.props.isSaveAndContinue) {
                    if (response.data === true) {
                        profileRequest.id = this.profileInfo.id;
                    }
                    else {
                        profileRequest.id = response.data;
                        this.profileInfo.id = response.data;
                    }
                }
                this.props.dispatchQualityProfileInfo({
                    ...profileRequest,
                    languageName: this.props.languageTypes.find(x => x.value === profileRequest.languageId)?.label
                });
                this.props.dispatchprofileLanguage(this.profileInfo.id);
                this.onFormSubmitSuccess(response, { isEdit: true, profileInfo: profileRequest });
            },
            this.handleApiFetchError.bind(this));
    }

    /**
     * on add impoert rules link click
     */
    public onImportRulesClick() {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.ImportStaticScanRulePage,
                    state: { profileInfo: this.props.qualityProfileInfo }
                }
            );
        }
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders rules grid
     */
    private renderImportRulesPanel() {
        if (this.isEditScreen) {
            return (
                <div className="row">
                    <div className="col-12">
                        <CardComponent content=
                            {
                                this.renderRulesPanelContent()
                            }
                        >
                        </CardComponent>
                    </div>
                </div>
            );
        }
        return (null);
    }

    /**
     * renders rules panel content 
     */
    private renderRulesPanelContent() {
        return (
            <>
                {this.renderImportRulesLink()}
                {this.renderTable()}
            </>
        );
    }

    /**
     *  renders html for Import rules
     */
    private renderImportRulesLink() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <ButtonComponent
                        className="float-right mr-0 pr-0"
                        type="submit"
                        displayText="Import Rules"
                        displayType="link"
                        id="btn_add_edit_add_division"
                        fontIconPrefix="fa fa-plus"
                        clickHandler={this.onImportRulesClick.bind(this)}
                    >
                    </ButtonComponent>
                </div>
            </div>
        );
    }

    //#endregion private methods

}