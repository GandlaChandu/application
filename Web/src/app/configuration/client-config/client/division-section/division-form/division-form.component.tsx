//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { FormFieldComponent, TextboxComponent, ValidatorType, SwitchComponent, ComponentBase } from '../../../../../shared';

import './division.form.scss';
import { DivisionFormConstant } from './division-form.constant';
import { DivisionFormPropModel } from './models/division-form-prop.model';

//#endregion application imports

export class DivisionFormComponent extends ComponentBase<DivisionFormPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="row space-row">
                    <div className="col-sm-12 col-md-12">
                        <div className="form-group">
                            <FormFieldComponent
                                name="name"
                                component={TextboxComponent}
                                props={
                                    {
                                        id: 'txt_division_form_divisionName',
                                        label: 'Division Name',
                                        validations: [
                                            {
                                                validatorType: ValidatorType.Required,
                                                config: true,
                                                errorMessage: DivisionFormConstant.errorMessage.divisionRequired
                                            },
                                            {
                                                validatorType: ValidatorType.MaxLength,
                                                config: 50,
                                                errorMessage: DivisionFormConstant.errorMessage.divisionMaxlen
                                            }
                                        ]
                                    }
                                }
                            >
                            </FormFieldComponent>

                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        {this.renderIsActive()}
                    </div>

                </div>
                {this.renderSaveButtons(this.props.pristine || this.props.submitting || this.props.invalid, 'btn_save_division', undefined, true)}

            </form>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders isActive control 
     */
    private renderIsActive() {
        let isDisabled = this.props.divisions.items.filter(x => x.isActive).length <= 1 && this.props.initialValues?.isActive === true;
        return (
            <div className="form-group">
                <FormFieldComponent
                    name="isActive"
                    component={SwitchComponent}
                    props={
                        {
                            id: 'swt_division_form_isActive',
                            label: 'Is Active',
                            disabled: isDisabled,
                            helpText: isDisabled ? 'Client should have atleast one active division specified' : null

                        }
                    }
                >
                </FormFieldComponent>
            </div>
        );
    }

    //#endregion private methods
}
