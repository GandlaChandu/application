//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { FormFieldComponent, TextboxComponent, ValidatorType, SwitchComponent, ComponentBase } from '../../../../shared';
import { Constant } from '../../../../utilities';

import './client-form.scss';
import { ClientFormConstant } from './client-form.constant';
import { ClientPropModel } from '../models';
import { DynamicPolicySectionContainer } from '../../../config-shared';

//#endregion application imports

export class ClientFormComponent extends ComponentBase<ClientPropModel> {

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
                <div className="row space-row">
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <FormFieldComponent
                                name="name"
                                component={TextboxComponent}
                                props={
                                    {
                                        id: 'txt_client_form_clientName',
                                        label: 'Client Name',
                                        validations: [
                                            {
                                                validatorType: ValidatorType.Required,
                                                config: true,
                                                errorMessage: ClientFormConstant.errorMessage.clientRequired
                                            },
                                            {
                                                validatorType: ValidatorType.MaxLength,
                                                config: 50,
                                                errorMessage: ClientFormConstant.errorMessage.clientMaxlen
                                            }
                                        ]
                                    }
                                }
                            >
                            </FormFieldComponent>

                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <DynamicPolicySectionContainer
                                form={ClientFormConstant.form}
                                initialValues={this.props.client}
                                namespace={Constant.reducerKey.clientReducer}
                                name="dynamicScanPolicyId"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 align-self-center">
                        <div className="form-group">
                            <FormFieldComponent
                                name="isActive"
                                component={SwitchComponent}
                                props={
                                    {
                                        id: 'swt_client_form_isActive',
                                        label: 'Is Active'
                                    }
                                }
                            >
                            </FormFieldComponent>
                        </div>
                    </div>
                </div>
                {this.renderSaveButtons(this.props.pristine || this.props.submitting || this.props.invalid, 'btn_save_client')}
            </form>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion events callbacks/public methods

    //#region private methods
    //#endregion private methods
}
