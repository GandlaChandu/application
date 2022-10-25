//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import {
    FormFieldComponent,
    TextboxComponent,
    DropDownComponent,
    DropDownPropModel,
    ComponentBase
} from '../../../../shared';

import './dynamic-policy-category-form.scss';
import { DynamicPolicyCategoryFormPropModel } from './models/dynamic-policy-category-form-prop.model';

//#endregion application imports

export class DynamicPolicyCategoryFormComponent extends ComponentBase<DynamicPolicyCategoryFormPropModel> {

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
                {this.renderCategoryForm()}
            </form >
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on analysis type options change callback function
     * @param value
     */
    public onAttackStrengthChange(value) {
        if (value) {
            this.props.dispatchUpdatePolicyStrengthThreshold(
                {
                    scanPolicyCode: this.props.dynamicCategoryInfo.scanPolicyCode,
                    id: this.props.dynamicCategoryInfo.id,
                    attackStrength: value
                },
                this.handleApiSaveSuccess.bind(this),
                this.handleApiSaveError.bind(this)
            );
        }
    }

    /**
     * on analysis type options change callback function
     * @param value
     */
    public onAttackThresholdChange(value) {
        if (value) {
            this.props.dispatchUpdatePolicyStrengthThreshold(
                {
                    scanPolicyCode: this.props.dynamicCategoryInfo.scanPolicyCode,
                    id: this.props.dynamicCategoryInfo.id,
                    alertThreshold: value
                },
                this.handleApiSaveSuccess.bind(this),
                this.handleApiSaveError.bind(this)
            );
        }
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders category form controls 
     */
    private renderCategoryForm() {
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
                                            id: 'txt_dynamicscanrule_form_category_name',
                                            label: 'Category Name',
                                            disabled: true
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
                                        id: 'drpdwn_dynamicscanner_attackstrengthtypes',
                                        label: 'Attack Strength',
                                        options: this.props.attackStrengthTypes
                                    }
                                }
                                onChange={this.onAttackStrengthChange.bind(this)}
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
                                        id: 'drpdwn_dynamicscanner_thresholdtypes',
                                        label: 'Alert Threshold',
                                        options: this.props.alertThresholdTypes
                                    }
                                }
                                onChange={this.onAttackThresholdChange.bind(this)}
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