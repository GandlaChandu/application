//#region react imports

import React, { } from 'react';

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

import { QualityProfileFormPropModel } from './models';
import './quality-profile-form.scss';
import { QualityProfileFormConstant } from './quality-profile-form.constant';

//#endregion application imports

export class QualityProfileFormComponent extends ComponentBase<QualityProfileFormPropModel> {

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
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        {this.renderLanguageControl()}
                    </div>
                    <div className="col-sm-12 col-md-6">
                        {this.renderProfileNameControl()}
                    </div>
                </div>
                {this.renderSaveButtons(this.props.pristine || this.props.submitting || this.props.invalid, 'btn_save_qualityProfile')}

            </form >
        );

    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods 
    //#endregion event callbacks/public methods  

    //#region private methods

    /**
     * renders language html control
     */
    private renderLanguageControl() {
        return (
            <div className="form-group">
                <FormFieldComponent<DropDownPropModel>
                    name="languageId"
                    component={DropDownComponent}
                    props={
                        {
                            id: 'ddl_project_form_language',
                            label: 'Language',
                            validations: [
                                {
                                    validatorType: ValidatorType.Required,
                                    config: true,
                                    errorMessage: QualityProfileFormConstant.errorMessage.languageRequired
                                },
                            ],
                            options: this.props.languageTypes,
                            disabled: this.props.profileLanguage ? true : false
                        }
                    }
                />
            </div>
        )
    }

    /**
     * renders profile name control 
     */
    private renderProfileNameControl() {
        return (
            <div className="form-group">
                <div className="form-group">
                    <FormFieldComponent
                        name="name"
                        component={TextboxComponent}
                        props={
                            {
                                id: 'txt_project_form_qualityProfileName',
                                label: 'Profile Name',
                                validations: [
                                    {
                                        validatorType: ValidatorType.Required,
                                        config: true,
                                        errorMessage: QualityProfileFormConstant.errorMessage.nameRequired
                                    },
                                    {
                                        validatorType: ValidatorType.MaxLength,
                                        config: 50,
                                        errorMessage: QualityProfileFormConstant.errorMessage.profileMaxlen
                                    }
                                ]
                            }
                        }
                    >
                    </FormFieldComponent>
                </div>
            </div>
        );
    }

    //#endregion private methods
}
