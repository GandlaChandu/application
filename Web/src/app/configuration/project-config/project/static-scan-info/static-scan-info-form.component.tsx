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
    TextboxPropModel,
    MultiSelectDropDownComponent,
    MultiSelectDropDownPropModel,
    RegexTypeConstant,
    AccordionComponent,
    CardComponent,
    ComponentBase,
    ButtonComponent,

    CheckboxComponent
} from '../../../../shared';
import { Constant, EntityType } from '../../../../utilities';

import { StaticScanInfoFormConstant } from './static-scan-info-form.constant';
import { StaticScanInfoFormPropModel } from './models/static-scan-info-form-prop.model';
import { QualityProfileSectionContainer } from '../../../config-shared';

//#endregion application imports

export class StaticScanInfoFormComponent extends ComponentBase<StaticScanInfoFormPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        super.componentDidMount();
        this.props.dispatchFetchScanTypes(this.handleApiFetchError.bind(this));
        this.props.dispatchFetchSourceCodeTypes(this.handleApiFetchError.bind(this));
        this.props.dispatchFetchSourceControlTypes(this.handleApiFetchError.bind(this));
        this.props.dispacthQualityProfileTabState(true);
        if (this.props?.codeAnalysisInfo) {
            this.props.dispatchShowForm(true);
        } else
            this.props.dispatchShowForm(false);
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                {this.renderCodeAnalysisDiv()}
                {this.renderQualityProfileSection()}
            </>
        )
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

    //#endregion event callbacks/public menthods

    //#region private methods

    /**
     * renders code analysis div controls 
     */
    private renderCodeAnalysisDiv() {
        if (this.props.showForm) {
            return (
                <form onSubmit={this.props.handleSubmit}>
                    <CardComponent
                        content={
                            <>
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <div className="form-group">
                                            <div className="form-group">
                                                <FormFieldComponent
                                                    name="codeOrCodeURL"
                                                    component={TextboxComponent}
                                                    props={
                                                        {
                                                            id: 'txt_project_static_scan_form_code_url',
                                                            label: 'Code Url',
                                                            validations: [
                                                                {
                                                                    validatorType: ValidatorType.Required,
                                                                    config: true,
                                                                    errorMessage: StaticScanInfoFormConstant.errorMessage.codeUrlRequired
                                                                },
                                                                {
                                                                    validatorType: ValidatorType.Pattern,
                                                                    config: RegexTypeConstant.gitUrl,
                                                                    errorMessage: StaticScanInfoFormConstant.errorMessage.codeUrlInvalid
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
                                            <FormFieldComponent<MultiSelectDropDownPropModel>
                                                name="staticScanTypes"
                                                component={MultiSelectDropDownComponent}
                                                props={
                                                    {
                                                        id: 'txt_project_static_scan_form_code_scan_type',
                                                        label: 'Code Scan Type',
                                                        validations: [
                                                            {
                                                                validatorType: ValidatorType.Required,
                                                                config: true,
                                                                errorMessage: StaticScanInfoFormConstant.errorMessage.scanTypeRequired
                                                            },
                                                        ],
                                                        options: this.props.codeScanTypes
                                                    }
                                                }
                                            >
                                            </FormFieldComponent>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="form-group">
                                            <FormFieldComponent<DropDownPropModel>
                                                name="sourceCodeTypeId"
                                                component={DropDownComponent}
                                                props={
                                                    {
                                                        id: 'txt_project_static_scan_form_code_sourcecodetype',
                                                        label: 'Source Code Type',
                                                        validations: [
                                                            {
                                                                validatorType: ValidatorType.Required,
                                                                config: true,
                                                                errorMessage: StaticScanInfoFormConstant.errorMessage.sourceCodeTypeRequired
                                                            },
                                                        ],
                                                        options: this.props.sourceCodeTypes
                                                    }
                                                }
                                            >
                                            </FormFieldComponent>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="form-group">
                                            <FormFieldComponent<DropDownPropModel>
                                                name="sourceControlTypeId"
                                                component={DropDownComponent}
                                                props={
                                                    {
                                                        id: 'txt_project_static_scan_form_code_sourcecontroltype',
                                                        label: 'Source Control Type',
                                                        validations: [
                                                            {
                                                                validatorType: ValidatorType.Required,
                                                                config: true,
                                                                errorMessage: StaticScanInfoFormConstant.errorMessage.sourceControlTypeRequired
                                                            },
                                                        ],
                                                        options: this.props.sourceControlTypes
                                                    }
                                                }
                                            >
                                            </FormFieldComponent>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="form-group">
                                            <div className="form-group">
                                                <FormFieldComponent
                                                    name="projectPath"
                                                    component={TextboxComponent}
                                                    props={
                                                        {
                                                            id: 'txt_project_static_scan_form_project_path',
                                                            label: 'Project Path',
                                                            validations: [
                                                                {
                                                                    validatorType: ValidatorType.Pattern,
                                                                    config: RegexTypeConstant.directoryPath,
                                                                    errorMessage: StaticScanInfoFormConstant.errorMessage.directoryPathInvalid
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
                                <div>
                                    <div className="form-group form-row">
                                        <div className="col-md-6 col-sm-12">
                                            <FormFieldComponent
                                                name="isTokenBased"
                                                component={CheckboxComponent}
                                                props={
                                                    {
                                                        id: 'swt_project_form_static_scan_form_isTokenBased',
                                                        label: 'Is Token Based account'
                                                    }
                                                }
                                                onChange={this.onTokenBasedChange.bind(this)}
                                            >
                                            </FormFieldComponent>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {this.renderAuthControls()}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 align-button">
                                        <div className="float-right">
                                            <ButtonComponent
                                                type="submit"
                                                className="ml-1"
                                                disabled={this.props.pristine || this.props.submitting}
                                                displayText="Save"
                                                id="btn_save_static_scan"
                                                fontIconPrefix="fa fa-save">
                                            </ButtonComponent>
                                            {this.renderRemoveBtn()}
                                            {this.renderCancelBtn()}
                                        </div>
                                    </div>
                                </div>
                                <div className="row space-row"></div>
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

    /**
     * renders quality profile section  
     */
    private renderQualityProfileSection() {
        if (this.props?.codeAnalysisInfo) {
            return (
                <AccordionComponent
                    content={
                        <QualityProfileSectionContainer
                            namespace={Constant.reducerKey.projectReducer}
                            entityType={EntityType.Project}
                            entityId={this.props.entityId}
                            clientId={this.props.clientId}
                            history={this.props.history}
                        />
                    }
                    uniqueKey="acc_project_form_static_scan_quality_profile_section"
                    title="Quality Profiles"
                />
            );
        }
        return (null);
    }

    /**
     * remove form button
     */
    private renderRemoveBtn() {
        if (this.props?.codeAnalysisInfo) {
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
        if (!this.props?.codeAnalysisInfo) {
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
        this.props.dispatchRemoveCodeMapping(this.props.codeAnalysisInfo.staticScanId,
            (response) => {
                this.handleApiSaveSuccess(response);
                this.props.dispatchShowForm(false);
            },
            this.handleApiSaveError.bind(this)
        );
    }

    /**
     * adds form fields on add button click
     */
    private onAddBtnClick() {
        this.props.dispatchShowForm(true);
    }

    /**
     * clears form fields on cancel button click
     */
    private onCancelBtnClick() {
        this.props.dispatchShowForm(false);
    }

    /**
     * renders github authentication info controls 
     */
    private renderAuthControls() {
        if (this.props.staticIsTokenBased) {
            return (
                <>
                    <div className="col-md-6 col-sm-12">
                        <FormFieldComponent
                            name="staticScanUserName"
                            component={TextboxComponent}
                            props={
                                {
                                    id: 'txt_project_static_scan_form_code__username',
                                    label: 'Token',
                                    validations: [
                                        {
                                            validatorType: ValidatorType.Required,
                                            config: true,
                                            errorMessage: StaticScanInfoFormConstant.errorMessage.tokenRequired
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
                            name="staticScanUserName"
                            component={TextboxComponent}
                            props={
                                {
                                    id: 'txt_project_static_scan_form_code_username',
                                    label: 'Username',
                                    validations: [
                                        {
                                            validatorType: ValidatorType.Required,
                                            config: true,
                                            errorMessage: StaticScanInfoFormConstant.errorMessage.codeAnalysisUserNameRequired
                                        },
                                    ]
                                }
                            }
                        >
                        </FormFieldComponent>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <FormFieldComponent<TextboxPropModel>
                            name="staticScanPassword"
                            component={TextboxComponent}
                            props={
                                {
                                    id: 'txt_project_static_scan_form_code_password',
                                    label: 'Password',
                                    validations: [
                                        {
                                            validatorType: ValidatorType.Required,
                                            config: true,
                                            errorMessage: StaticScanInfoFormConstant.errorMessage.codeAnalysisPasswordRequired
                                        },
                                    ],
                                    type: 'password'
                                }
                            }
                        >
                        </FormFieldComponent>
                    </div>
                </>
            );
        }
    }


    //#endregion private methods
}
