//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import {
    FormFieldComponent,
    TextboxComponent,
    ValidatorType,
    TextboxPropModel,
    RegexTypeConstant,
    CardComponent,
    ComponentBase,
    ButtonComponent,

    CheckboxComponent
} from '../../../../shared';
import { Constant } from '../../../../utilities';

import { DynamicScanInfoFormPropModel } from './models/dynamic-scan-info-form-prop.model';
import { DynamicPolicySectionContainer } from '../../../config-shared';
import { DynamicScanInfoFormConstant } from './dynamic-scan-info-form.constant';

//#endregion application imports

export class DynamicScanInfoFormComponent extends ComponentBase<DynamicScanInfoFormPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        super.componentDidMount();
        if (this.props?.appAnalysisInfo) {
            this.props.dispatchShowDynamicForm(true);
        } else
            this.props.dispatchShowDynamicForm(false);
    }

    /**
     * renders html for component 
     */
    render() {
        if (this.props.showDynamicForm) {
            return (
                <form onSubmit={this.props.handleSubmit}>
                    <CardComponent
                        content={
                            <>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <div className="form-group">
                                                <FormFieldComponent
                                                    name="applicationURL"
                                                    component={TextboxComponent}
                                                    props={
                                                        {
                                                            id: 'txt_project_form_app_url',
                                                            label: 'Application Url',
                                                            validations: [
                                                                {
                                                                    validatorType: ValidatorType.Required,
                                                                    config: true,
                                                                    errorMessage: DynamicScanInfoFormConstant.errorMessage.applicationUrlRequired
                                                                },
                                                                {
                                                                    validatorType: ValidatorType.Pattern,
                                                                    config: RegexTypeConstant.urlOnly,
                                                                    errorMessage: DynamicScanInfoFormConstant.errorMessage.applicationUrlInvalid
                                                                }
                                                            ]
                                                        }
                                                    }
                                                >
                                                </FormFieldComponent>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.renderTokenAuthControls()}
                                <div className="row">
                                    <div className="col-sm-12 col-md-12">
                                        <div className="form-group">
                                            <DynamicPolicySectionContainer
                                                form={DynamicScanInfoFormConstant.form}
                                                // initialValues={this.props.projectInfo}
                                                namespace={Constant.reducerKey.projectReducer}
                                                name="scanPolicyId"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 align-self-center mt-3 mt-sm-0 mb-3">
                                        <div className="float-right">
                                            <ButtonComponent
                                                type="submit"
                                                className="ml-1"
                                                disabled={this.props.pristine || this.props.submitting}
                                                displayText="Save"
                                                id="btn_save_dynamic_scan">
                                            </ButtonComponent>
                                            {this.renderRemoveBtn()}
                                            {this.renderCancelBtn()}
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    >
                    </CardComponent>
                </form>
            );
        } else {
            return (
                <CardComponent
                    content={
                        <div className="row">
                            <div className="col-sm-12 col-md-12 align-button">
                                <ButtonComponent
                                    className="float-right"
                                    displayText="Add"
                                    id="btn_add_static_scan_mapping"
                                    fontIconPrefix="fa fa-plus"
                                    clickHandler={this.onAddBtnClick.bind(this)}>
                                </ButtonComponent>
                            </div>
                        </div >
                    }
                />
            )
        }

    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on token based change callback function
     * @param value
     */
    public onTokenBasedChange(value) {
        this.props.dispatchTokenBasedState(value);
    }

    //#endregion events callbacks/public methods

    //#region private methods   

    /**
     * remove form button
     */
    private renderRemoveBtn() {
        if (this.props?.appAnalysisInfo) {
            return (
                <ButtonComponent
                    className="ml-1"
                    displayText="Remove"
                    id="btn_save_remove"
                    fontIconPrefix="fa fa-trash"
                    clickHandler={this.onRemoveBtnClick.bind(this)}>
                </ButtonComponent>
            )
        }
    }

    /**
     * reset form button
     */
    private renderCancelBtn() {
        if (!this.props?.appAnalysisInfo) {
            return (
                <ButtonComponent
                    className="float-right"
                    displayText="Cancel"
                    id="btn_cancel_ticket_system_mapping"
                    fontIconPrefix="fa fa-close"
                    clickHandler={this.onCancelBtnClick.bind(this)}
                >
                </ButtonComponent>
            )
        }
    }

    /**
     * removes form with data on remove button click
     */
    private onRemoveBtnClick() {
        this.props.dispatchRemoveAppMapping(this.props.appAnalysisInfo,
            (response) => {
                this.handleApiSaveSuccess(response);
                this.props.dispatchShowDynamicForm(false);
            },
            this.handleApiSaveError.bind(this)
        );
    }

    /**
     * adds form fields on add button click
     */
    private onAddBtnClick() {
        this.props.dispatchShowDynamicForm(true);
    }

    /**
     * clears form fields on cancel button click
     */
    private onCancelBtnClick() {
        this.props.dispatchShowDynamicForm(false);
    }


    /**
     * renders github authentication info controls 
     */
    private renderAuthControls() {
        if (this.props.dynamicIsTokenBased) {
            return (
                <>
                    <div className="col-sm-12 col-md-6">
                        <FormFieldComponent
                            name="userName"
                            component={TextboxComponent}
                            props={
                                {
                                    id: 'txt_project_form_dynamicform_username',
                                    label: 'Token',
                                    validations: [
                                        {
                                            validatorType: ValidatorType.Required,
                                            config: true,
                                            errorMessage: DynamicScanInfoFormConstant.errorMessage.tokenRequired
                                        }
                                    ]
                                }
                            }
                        ></FormFieldComponent>
                    </div>
                </>
            );
        }
        else {
            return (
                <>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <FormFieldComponent
                                name="userName"
                                component={TextboxComponent}
                                props={
                                    {
                                        id: 'txt_project_form_dynamicform_username',
                                        label: 'Username',
                                        validations: [
                                            {
                                                validatorType: ValidatorType.Required,
                                                config: true,
                                                errorMessage: DynamicScanInfoFormConstant.errorMessage.appAnalysisUserNameRequired
                                            },
                                        ]
                                    }
                                }
                            >
                            </FormFieldComponent>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <FormFieldComponent<TextboxPropModel>
                                name="password"
                                component={TextboxComponent}
                                props={
                                    {
                                        id: 'txt_project_form_dynamicform_password',
                                        label: 'Password',
                                        validations: [
                                            {
                                                validatorType: ValidatorType.Required,
                                                config: true,
                                                errorMessage: DynamicScanInfoFormConstant.errorMessage.appAnalysisPasswordRequired
                                            },
                                        ],
                                        type: 'password'
                                    }
                                }
                            >
                            </FormFieldComponent>
                        </div>
                    </div>
                </>
            );
        }
    }

    /**
     * renders token and auth controls 
     */
    private renderTokenAuthControls() {
        let config = false;
        //TODO: implement if API is ready
        if (config) {
            return (
                <div>
                    <div className="form-group form-row">
                        <div className="col-md-6 col-sm-12">
                            <FormFieldComponent
                                name="isTokenBased"
                                component={CheckboxComponent}
                                props={
                                    {
                                        id: 'swt_project_form_dynamic_scan_form_isTokenBased',
                                        label: 'Is Token Based account'
                                    }
                                }
                                onChange={this.onTokenBasedChange.bind(this)}
                            >
                            </FormFieldComponent>
                        </div>
                    </div>
                    <div className="form-group form-row">
                        {this.renderAuthControls()}
                    </div>
                </div>

            );
        }
        return (
            <div className="form-group form-row">
                {this.renderAuthControls()}
            </div>
        );
    }

    //#endregion private methods
}
