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
    RegexTypeConstant,
    CardComponent,
    ComponentBase,
    ButtonComponent,
    CheckboxComponent
} from '../../../../shared';
import { TicketSystemType } from '../../../../utilities';

import { TicketingSystemInfoFormConstant } from './ticketing-system-info-form.constant';
import { TicketingSystemInfoFormPropModel } from './models/ticketing-system-info-form-prop.model';

//#endregion application imports

export class TicketingSystemInfoFormComponent extends ComponentBase<TicketingSystemInfoFormPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        super.componentDidMount();
        if (this.props?.ticketSystemConfigInfo) {
            this.props.dispatchShowTicketForm(true);
        }
        else {
            this.props.dispatchShowTicketForm(false);
        }
    }

    /**
     * renders html for component 
     */
    render() {
        if (this.props.showTicketForm) {
            return (
                <>
                    {this.renderTicketSystemDiv()}
                </>
            )
        }
        else {
            return (
                <CardComponent
                    content={
                        <div className="row">
                            <div className="col-sm-12 col-md-12 align-self-center mt-3 mt-sm-0 mb-3">
                                <ButtonComponent
                                    className="float-right"
                                    displayText="Add"
                                    id="btn_add_ticket_system_mapping"
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
     * on ticket type options change callback function
     * @param value
     */
    public onTicketTypeChange(value) {
        this.props.dispatchCurrentTicketSystemType(value);
    }

    /**
     * on token based change callback function
     * @param value
     */
    public onTokenBasedChange(value) {
        this.props.dispatchTokenBasedState(value);
    }

    /**
     * on enterprise account change callback function
     * @param value
     */
    public onEnterpriseAccountChange(value) {
        this.props.dispatchEnterpriseAccountState(value);
    }

    //#endregion public methods

    //#region private methods

    /**
     * renders ticket system div 
     */
    private renderTicketSystemDiv() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <CardComponent
                    content={
                        <>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group form-row">
                                        <div className="col-md-6 col-sm-12">
                                            <FormFieldComponent<DropDownPropModel>
                                                name="type"
                                                component={DropDownComponent}
                                                props={
                                                    {
                                                        id: 'txt_project_form_ticketSys_type',
                                                        label: 'Ticketing System Type',
                                                        validations: [
                                                            {
                                                                validatorType: ValidatorType.Required,
                                                                config: true,
                                                                errorMessage: TicketingSystemInfoFormConstant.errorMessage.ticketingSystemTypeRequired
                                                            },
                                                        ],

                                                        options: this.props.ticketingSystemTypes
                                                    }
                                                }
                                                onChange={this.onTicketTypeChange.bind(this)}

                                            >
                                            </FormFieldComponent>
                                        </div>
                                    </div>
                                    <div>
                                        {this.renderTicketSystemConfiguration()}
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
                />
            </form>
        );
    }

    /**
     * renders ticket system configuration options 
     */
    private renderTicketSystemConfiguration() {
        switch (this.props.selectedTicketingSystemType) {
            case TicketSystemType.GitHub:
                return (this.renderGitHubTicketSystem());
            default:
                return (null);
        }
    }

    /**
     * renders github ticket configurations 
     */
    private renderGitHubTicketSystem() {
        return (
            <>
                <div className="form-group form-row">
                    <div className="col-md-6 col-sm-12">
                        <FormFieldComponent
                            name="isTokenBased"
                            component={CheckboxComponent}
                            props={
                                {
                                    id: 'swt_project_form_ticketSys_isTokenBased',
                                    label: 'Is Token Based account'
                                }
                            }
                            onChange={this.onTokenBasedChange.bind(this)}
                        >
                        </FormFieldComponent>
                    </div>
                </div>
                <div className="form-group form-row">
                    {this.renderGitHubAuthControls()}
                </div>
                <div className="form-group form-row">
                    <div className="col-md-6 col-sm-12">
                        <FormFieldComponent
                            name="owner"
                            component={TextboxComponent}
                            props={
                                {
                                    id: 'txt_project_form_ticketSys_owner',
                                    label: 'Owner',
                                    validations: [
                                        {
                                            validatorType: ValidatorType.Required,
                                            config: true,
                                            errorMessage: TicketingSystemInfoFormConstant.errorMessage.ticketingSystemUsernameRequired
                                        }
                                    ]
                                }
                            }
                        ></FormFieldComponent>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <FormFieldComponent
                            name="repositoryName"
                            component={TextboxComponent}
                            props={
                                {
                                    id: 'txt_project_form_ticketSys_name',
                                    label: 'Repository name',
                                    validations: [
                                        {
                                            validatorType: ValidatorType.Required,
                                            config: true,
                                            errorMessage: TicketingSystemInfoFormConstant.errorMessage.ticketingSystemRepositoryNameRequired
                                        }
                                    ]
                                }
                            }
                        ></FormFieldComponent>
                    </div>
                </div>
                <div className="form-group form-row">
                    <div className="col-md-6 col-sm-12">
                        <FormFieldComponent
                            name="isEnterpriseAccount"
                            component={CheckboxComponent}
                            props={
                                {
                                    id: 'swt_project_form_ticketSys_isEnterpriseAccount',
                                    label: 'Is Enterprise account'
                                }
                            }
                            onChange={this.onEnterpriseAccountChange.bind(this)}
                        >
                        </FormFieldComponent>
                    </div>
                </div>
                <div className="form-group form-row">
                    {this.renderEnterpriseUrlControl()}
                </div>
            </>
        )
    }

    /**
     * renders github authentication info controls 
     */
    private renderGitHubAuthControls() {
        if (this.props.isTokenBased) {
            return (
                <>
                    <div className="col-md-6 col-sm-12">
                        <FormFieldComponent
                            name="username"
                            component={TextboxComponent}
                            props={
                                {
                                    id: 'txt_project_form_ticketSys_username',
                                    label: 'Token',
                                    validations: [
                                        {
                                            validatorType: ValidatorType.Required,
                                            config: true,
                                            errorMessage: TicketingSystemInfoFormConstant.errorMessage.ticketingSystemTokenRequired
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
                    <div className="col-md-6 col-sm-12">
                        <FormFieldComponent
                            name="username"
                            component={TextboxComponent}
                            props={
                                {
                                    id: 'txt_project_form_ticketSys_username',
                                    label: 'Username',
                                    validations: [
                                        {
                                            validatorType: ValidatorType.Required,
                                            config: true,
                                            errorMessage: TicketingSystemInfoFormConstant.errorMessage.ticketingSystemUsernameRequired
                                        }
                                    ]
                                }
                            }
                        ></FormFieldComponent>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <FormFieldComponent
                            name="password"
                            component={TextboxComponent}
                            props={
                                {
                                    type: 'password',
                                    id: 'txt_project_form_ticketSys_password',
                                    label: 'Password',
                                    validations: [
                                        {
                                            validatorType: ValidatorType.Required,
                                            config: true,
                                            errorMessage: TicketingSystemInfoFormConstant.errorMessage.ticketingSystemPasswordRequired
                                        }
                                    ]
                                }
                            }
                        ></FormFieldComponent>
                    </div>
                </>
            );
        }
    }

    /**
     * renders enterprise url control 
     */
    private renderEnterpriseUrlControl() {
        if (this.props.isEnterpriseAccount) {
            return (
                <div className="col-md-6 col-sm-12">
                    <FormFieldComponent
                        name="enterpriseUrl"
                        component={TextboxComponent}
                        props={
                            {
                                id: 'txt_project_form_ticketSys_enterpriseUrl',
                                label: 'Enterprise Url',
                                validations: [
                                    {
                                        validatorType: ValidatorType.Required,
                                        config: true,
                                        errorMessage: TicketingSystemInfoFormConstant.errorMessage.ticketingSystemEnterpriseUrlRequired
                                    },
                                    {
                                        validatorType: ValidatorType.Pattern,
                                        config: RegexTypeConstant.urlOnly,
                                        errorMessage: TicketingSystemInfoFormConstant.errorMessage.ticketingSystemEnterpriseUrlInValid
                                    }
                                ]
                            }
                        }
                    ></FormFieldComponent>
                </div>
            );
        }
        return (null);
    }

    /**
     * remove form button
     */
    private renderRemoveBtn() {
        if (this.props?.ticketSystemConfigInfo) {
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
        if (!this.props?.ticketSystemConfigInfo) {
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
        this.props.dispatchRemoveTicketMapping(this.props.ticketSystemConfigInfo.id,
            (response) => {
                this.handleApiSaveSuccess(response);
                this.props.dispatchShowTicketForm(false);
            },
            this.handleApiSaveError.bind(this)
        );
    }

    /**
     * adds form fields on add button click
     */
    private onAddBtnClick() {
        this.props.dispatchShowTicketForm(true);
    }

    /**
     * clears form fields on cancel button click
     */
    private onCancelBtnClick() {
        this.props.dispatchShowTicketForm(false);
    }

    //#endregion private methods
}
