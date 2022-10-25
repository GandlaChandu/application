//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { FunctionalCode } from '../../../utilities';
import { ComponentBase, CardComponent } from '../../../shared';

import './dynamic-scan-policy.scss';
import { DynamicScanPolicyPropModel } from './models';
import { DynamicScanPolicyForm } from './dynamic-scan-policy-form/dynamic-scan-policy-form';
import { DynamicPolicyCategoryManagerContainer } from './dynamic-policy-category-manager/dynamic-policy-category-manager.container';
import { DynamicScanPolicyModel } from '../models';

//#endregion application imports

export class DynamicScanPolicyComponent extends ComponentBase<DynamicScanPolicyPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        if (this.hasLocationInfo &&
            this.locationInfo.scanPolicyInfo) {
            this.setComponentInfo(FunctionalCode.DynamicEditRule);
        }
        else {
            this.setComponentInfo(FunctionalCode.DynamicAddRule);
        }
    }

    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook 
     */
    componentDidMount() {
        super.componentDidMount();
        if (this.componentInfo.code === FunctionalCode.DynamicEditRule) {
            this.props.dispatchSetPolicyInfo(this.locationInfo.scanPolicyInfo)
            this.setEditStateDefaults();
        }
        else {
            this.props.dispatchSetEditMode(false);
            this.props.dispatchSetPolicyInfo(null)
        }
        this.props.dispatchFetchAlertShresholdTypes(this.handleApiFetchError.bind(this));
        this.props.dispatchFetchAttackStrengthTypes(this.handleApiFetchError.bind(this));
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                {this.renderPrevButton()}
                {this.renderForm()}
                {this.renderPoliciesGrid()}
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * sets edit state default values
     */
    public setEditStateDefaults() {
        super.setEditStateDefaults(FunctionalCode.DynamicEditRule);
    }

    /**
     * save dynamic scan policy button click event
     * @param formData
     */
    public onDynamicScanRuleSave(formData: DynamicScanPolicyModel) {
        this.props.dispatchSaveDynamicScanRules(formData,
            (response) => {
                let policyInfo: DynamicScanPolicyModel = {
                    ...formData,
                    id: response.data
                };
                if (this.isApiResponseSuccess(response)) {
                    if (this.props.isSaveAndContinue) {
                        this.props.dispatchFetchPolicyInfo(response.data,
                            (result) => {
                                policyInfo.scanPolicyCode = result.data.scanPolicyCode;
                                this.props.dispatchSetPolicyInfo(policyInfo)
                                this.onFormSubmitSuccess(response, { categoryInfo: policyInfo });
                            }
                            , this.handleApiFetchError.bind(this));
                    }

                    else {
                        this.onFormSubmitSuccess(response, { categoryInfo: policyInfo });
                    }
                }
            },
            this.handleApiSaveError.bind(this));
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
                        <DynamicScanPolicyForm
                            onSubmit={this.onDynamicScanRuleSave.bind(this)}
                            history={this.props.history} />
                        }
                    >
                    </CardComponent>
                </div>
            </div>
        );
    }

    /**
     * renders grid control 
     */
    private renderPoliciesGrid() {
        if (this.isEditScreen && this.props.dynamicScanPolicyInfo) {
            return (
                <div className="row">
                    <div className="col-12">
                        <CardComponent content=
                            {
                                <DynamicPolicyCategoryManagerContainer history={this.props.history} />
                            }
                        >
                        </CardComponent>
                    </div>
                </div>
            );
        }
        return (null);
    }

    //#endregion private methods
}