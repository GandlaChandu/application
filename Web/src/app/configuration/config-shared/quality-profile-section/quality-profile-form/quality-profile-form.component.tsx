//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import {
    FormFieldComponent,
    ValidatorType,
    DropDownComponent,
    DropDownPropModel,
    ComponentBase
} from '../../../../shared';

import { QualityProfileFormConstant } from './quality-profile-form.constant';
import { QualityProfileFormPropModel } from './models/quality-profile-form-prop.model';
import { QualityProfileFormModel } from '../quality-profile-form';

//#endregion application imports

export class QualityProfileFormComponent extends ComponentBase<QualityProfileFormPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        this.props.dispatchFetchLanguages(this.handleApiFetchError.bind(this));
        if (this.props.isEdit) {
            this.props.dispatchFetchLanguageProfiles(this.props.selectedProfile.languageId, this.handleApiFetchError.bind(this));
        }
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="row space-row">
                    {this.renderLanguageDiv()}
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <FormFieldComponent<DropDownPropModel>
                                name="qualityProfileId"
                                component={DropDownComponent}
                                props={
                                    {
                                        id: 'txt_project_static_scan_form_code_language_profile',
                                        label: 'Quality Profile',
                                        validations: [
                                            {
                                                validatorType: ValidatorType.Required,
                                                config: true,
                                                errorMessage: QualityProfileFormConstant.errorMessage.profileRequired
                                            },
                                        ],
                                        options: this.props.languageProfiles
                                    }
                                }
                            >
                            </FormFieldComponent>
                        </div>
                    </div>
                </div>
                {this.renderSaveButtons(this.props.pristine || this.props.submitting || this.props.invalid, 'btn_save_client', undefined, true)}
            </form>);
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on language dropown selection event
     * @param value
     */
    public onLanguageSelection(value) {
        let data: QualityProfileFormModel = new QualityProfileFormModel();
        data.clientId = this.props.clientId;
        data.languageId = value;
        data.isDisable = false;
        this.props.dispatchFetchLanguageProfiles(value, this.handleApiFetchError.bind(this));
        this.props.dispatchSetSelectedInfo(data);
    }

    //#endregion events callbacks/public methods


    //#region private methods

    /**
     * renders code analysis div controls 
     */
    private renderLanguageDiv() {
        return (
            <>
                <div className="col-sm-12 col-md-6">
                    <div className="form-group">
                        <FormFieldComponent<DropDownPropModel>
                            name="languageId"
                            component={DropDownComponent}
                            props={
                                {
                                    id: 'txt_project_static_scan_form_code_language',
                                    label: 'Language',
                                    validations: [
                                        {
                                            validatorType: ValidatorType.Required,
                                            config: true,
                                            errorMessage: QualityProfileFormConstant.errorMessage.languageRequired
                                        },
                                    ],
                                    options: this.props.languages,
                                    disabled: this.props.isEdit
                                }
                            }
                            onChange={this.onLanguageSelection.bind(this)}
                        >
                        </FormFieldComponent>
                    </div>
                </div>
            </>
        );
    }

    //#endregion private methods
}
