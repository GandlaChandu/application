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
    CardComponent,
    SwitchComponent,
    ComponentBase,
} from '../../../../shared';

import './project-form.scss';
import { ProjectFormConstant } from './project-form.constant';
import { ProjectFormPropModel } from './models';

//#endregion application imports

export class ProjectFormComponent extends ComponentBase<ProjectFormPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    /**
     * renders html for component 
     */
    render() {
        return (
            <form onSubmit={this.props.handleSubmit} onReset={this.onReset.bind(this)}>
                <CardComponent
                    content={
                        <>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <FormFieldComponent<DropDownPropModel>
                                            name="clientId"
                                            component={DropDownComponent}
                                            props={
                                                {
                                                    id: 'txt_project_form_client',
                                                    label: 'Client',
                                                    validations: [
                                                        {
                                                            validatorType: ValidatorType.Required,
                                                            config: true,
                                                            errorMessage: ProjectFormConstant.errorMessage.clientRequired
                                                        },
                                                    ],
                                                    options: this.props.clients
                                                }
                                            }
                                            onChange={this.onClientChange.bind(this)}
                                        />
                                    </div>
                                </div>
                                {this.renderDivisionDropdown()}
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <FormFieldComponent
                                                name="projectName"
                                                component={TextboxComponent}
                                                props={
                                                    {
                                                        id: 'txt_project_form_projectName',
                                                        label: 'Project Name',
                                                        validations: [
                                                            {
                                                                validatorType: ValidatorType.Required,
                                                                config: true,
                                                                errorMessage: ProjectFormConstant.errorMessage.projectRequired
                                                            },
                                                            {
                                                                validatorType: ValidatorType.MaxLength,
                                                                config: 50,
                                                                errorMessage: ProjectFormConstant.errorMessage.projectMaxlen
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
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <FormFieldComponent
                                            name="isActive"
                                            component={SwitchComponent}
                                            props={
                                                {
                                                    id: 'swt_project_form_isActive',
                                                    label: 'Is Active'
                                                }
                                            }
                                        >
                                        </FormFieldComponent>
                                    </div>
                                </div>
                            </div>
                            {this.renderSaveButtons(this.props.pristine || this.props.submitting || this.props.invalid, 'btn_save_client')}
                        </>
                    }
                />
            </form>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on value selection change
     * @param event
     */
    public onClientChange(value) {
        let clientId = value;
        if (clientId > 0) {
            this.props.dispatchFetchDivisions(clientId, this.handleApiFetchError.bind(this));
            this.props.dispatchShowDivision(true);
        }
        else {
            this.props.dispatchShowDivision(false);
        }
    }

    /**
     * on reset click 
     */
    public onReset() {
        this.props.reset();
        this.props.dispatchShowDivision(this.props.initialValues && this.props.initialValues.clientId > 0);
        this.props.dispatchFetchDivisions(this.props.initialValues.clientId, this.handleApiFetchError.bind(this));
    }

    //#endregion event callbacks/public methods

    //#region private methods
    /**
     * renders division dropdown html 
     */
    private renderDivisionDropdown() {
        if (this.props.showDivisionControl) {
            return (
                <div className="col-sm-12 col-md-6">
                    <div className="form-group">
                        <FormFieldComponent<DropDownPropModel>
                            name="divisionId"
                            component={DropDownComponent}
                            props={
                                {
                                    id: 'txt_project_form_division',
                                    label: 'Division',
                                    validations: [
                                        {
                                            validatorType: ValidatorType.Required,
                                            config: true,
                                            errorMessage: ProjectFormConstant.errorMessage.divisionRequired
                                        },
                                    ],
                                    options: this.props.divisions
                                }
                            }
                        />
                    </div>
                </div>
            );
        }
        return (null);
    }

    //#endregion private methods
}
