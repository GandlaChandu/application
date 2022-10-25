//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import {
    FormFieldComponent,
    TextboxComponent,
    ValidatorType,
    DropDownComponent,
    DropDownPropModel,
    ComponentBase
} from '../../../../shared';

import './dynamic-scan-policy-form.scss';
import { DynamicScanPolicyFormPropModel } from './models/dynamic-scan-policy-form-prop.model';
import { DynamicScanPolicyFormConstant } from './dynamic-scan-policy-form.constant';

//#endregion application imports

export class DynamicScanPolicyFormComponent extends ComponentBase<DynamicScanPolicyFormPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * renders html for component 
     */
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                {this.renderRuleFormDiv()}
                {this.renderSaveButtons(this.props.pristine || this.props.submitting || this.props.invalid, 'btn_save_client')}
            </form >
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders code analysis div controls 
     */
    private renderRuleFormDiv() {
        return (

            <>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <div className="form-group">
                                <FormFieldComponent
                                    name="name"
                                    component={TextboxComponent}
                                    props={
                                        {
                                            id: 'txt_dynamicscanrule_form_scanpolicy_name',
                                            label: 'Policy Name',
                                            validations: [
                                                {
                                                    validatorType: ValidatorType.Required,
                                                    config: true,
                                                    errorMessage: DynamicScanPolicyFormConstant.errorMessage.scanPolicyNameRequired
                                                }
                                            ]
                                        }
                                    }
                                >
                                </FormFieldComponent>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <FormFieldComponent<DropDownPropModel>
                                name="attackStrength"
                                component={DropDownComponent}
                                props={
                                    {
                                        id: 'drpdwn_dynamicscanrule_form_attackstrength_types',
                                        label: 'Attack Strength',
                                        options: this.props.attackStrengthTypes
                                    }
                                }
                            >
                            </FormFieldComponent>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <FormFieldComponent<DropDownPropModel>
                                name="alertThreshold"
                                component={DropDownComponent}
                                props={
                                    {
                                        id: 'drpdwn_dynamicscanrule_form_code_thresholdtype',
                                        label: 'Alert Threshold',
                                        options: this.props.alertThresholdTypes
                                    }
                                }
                            >
                            </FormFieldComponent>
                        </div>
                    </div>
                </div>
            </>

        );
    }

    //#endregion private methods
}
