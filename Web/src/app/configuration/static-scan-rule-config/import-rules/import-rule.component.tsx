//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { FunctionalCode } from '../../../utilities';
import { ComponentBase, CardComponent } from '../../../shared';

import { ImportRuleFilterFormModel, ImportRulePropModel } from './models';
import { ImportRuleform } from './import-rule-form';
import { LanguageProfileMapModel } from '../models';
import { RuleManagerForm } from './rule-manager-form';

//#endregion application imports

export class ImportRuleComponent extends ComponentBase<ImportRulePropModel> {

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
        super(props);
        this.setComponentInfo(FunctionalCode.StaticImportRule);
    }

    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook
     */
    componentDidMount() {
        super.componentDidMount();
        this.props.dispatchFetchSeverityTypes(this.handleApiFetchError.bind(this));
        this.props.dispatchFetchVulnerabilityTypes(this.handleApiFetchError.bind(this));
        this.props.dispatchSetSelectedLanguage(this.profileInfo.languageName);
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                {this.renderPrevButton()}
                {this.renderForm()}
                {this.renderRulesGrid()}
            </>

        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on rule search button click
     * @param formData
     */
    public onRuleSearchClick(formData: ImportRuleFilterFormModel) {
        this.props.dispatchSetFilterForm(formData);
    }

    /**
     * on back btn click callback
     */
    public onPrevButtonClick() {
        let profileInfo: LanguageProfileMapModel = new LanguageProfileMapModel();
        profileInfo = this.profileInfo;
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: this.componentInfo.prevPageUrl,
                    state: {
                        profileInfo,
                        isEdit: true
                    }
                }
            );
        }
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders form html 
     */
    private renderForm() {
        return (
            <div className="row">
                <div className="col-12">
                    <CardComponent content=
                        {
                            <ImportRuleform onSubmit={this.onRuleSearchClick.bind(this)} />}
                    >
                    </CardComponent>
                </div>
            </div>
        );
    }

    /**
     * renders grid control 
     */
    private renderRulesGrid() {
        return (
            <div className="row">
                <div className="col-12">
                    <CardComponent content=
                        {
                            <RuleManagerForm history={this.props.history} />
                        }
                    >
                    </CardComponent>
                </div>
            </div>
        );

    }

    //#endregion private methods

}