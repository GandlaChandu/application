//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { FormFieldComponent, TextboxComponent, ValidatorType, ComponentBase, SwitchComponent } from '../../../../shared';

import './user-form.scss';
import { UserPropModel } from '../models';
import { UserFormConstant } from './user-form.constant';

//#endregion application imports

export class UserFormComponent extends ComponentBase<UserPropModel> {

    //#region model properties

    private readonly idPrefix: string = 'user_form_';

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
                        {this.renderFirstNameControl()}
                    </div>
                    <div className="col-sm-12 col-md-6">
                        {this.renderLastNameControl()}
                    </div>
                    <div className="col-sm-6 col-md-6">
                        {this.renderEmailControl()}
                    </div>
                    <div className="col-sm-12">
                        {this.renderIsActiveControl()}
                    </div>
                </div>
                {this.renderSaveButtons(this.props.pristine || this.props.submitting || this.props.invalid, `btn_${this.idPrefix}_save_user`)}
            </form>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders first name control 
     */
    private renderFirstNameControl() {
        return (
            <div className="form-group">
                <FormFieldComponent
                    name="firstName"
                    component={TextboxComponent}
                    props={
                        {
                            id: `txt_${this.idPrefix}_firstName`,
                            label: 'First Name',
                            validations: [
                                {
                                    validatorType: ValidatorType.Required,
                                    config: true,
                                    errorMessage: UserFormConstant.errorMessage.firstNameRequired
                                },
                                {
                                    validatorType: ValidatorType.MaxLength,
                                    config: 50,
                                    errorMessage: UserFormConstant.errorMessage.firstNameMaxlen
                                }
                            ]
                        }
                    }
                >
                </FormFieldComponent>

            </div>
        );
    }

    /**
     * renders last name control 
     */
    private renderLastNameControl() {
        return (
            <div className="form-group">
                <FormFieldComponent
                    name="lastName"
                    component={TextboxComponent}
                    props={
                        {
                            id: `txt_${this.idPrefix}_lastName`,
                            label: 'Last Name',
                            validations: [
                                {
                                    validatorType: ValidatorType.Required,
                                    config: true,
                                    errorMessage: UserFormConstant.errorMessage.lastNameRequired
                                },
                                {
                                    validatorType: ValidatorType.MaxLength,
                                    config: 50,
                                    errorMessage: UserFormConstant.errorMessage.lastNameMaxlen
                                }
                            ]
                        }
                    }
                >
                </FormFieldComponent>

            </div>
        );
    }

    /**
     * renders email control 
     */
    private renderEmailControl() {
        return (
            <div className="form-group">
                <FormFieldComponent
                    name="email"
                    component={TextboxComponent}
                    props={
                        {
                            id: `txt_${this.idPrefix}_email`,
                            label: 'Email',
                            validations: [
                                {
                                    validatorType: ValidatorType.Required,
                                    config: true,
                                    errorMessage: UserFormConstant.errorMessage.emailRequired
                                }
                            ]
                        }
                    }
                >
                </FormFieldComponent>

            </div>
        );
    }

    /**
     * renders isactive control 
     */
    private renderIsActiveControl() {
        return (
            <div className="form-group">
                <FormFieldComponent
                    name="isActive"
                    component={SwitchComponent}
                    props={
                        {
                            id: `swt_${this.idPrefix}_isActive`,
                            label: 'Is Active'
                        }
                    }
                >
                </FormFieldComponent>
            </div>
        );
    }

    //#endregion private methods
}
