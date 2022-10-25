//#region react imports

import React from 'react';

//#endregion react imports
//#region application imports


import './scan-cascade-form.scss';
import { ScanCascadeFormConstant } from './scan-cascade-form.constant';
import { ScanCascadeFormPropModel } from './models';
import { ComponentBase } from '../base';
import { SharedActionType } from '../action-types';
import {
    MultiSelectDropDownComponent,
    MultiSelectDropDownPropModel,
    DropDownComponent,
    DatepickerPropModel,
    ValidatorType,
    DropDownPropModel,
    FormFieldComponent,
    DatepickerComponent
} from '../forms';
import { CardComponent, ButtonComponent } from '../controls';
import { Helper } from '../helpers';

//#endregion application imports

export class ScanCascadeFormComponent extends ComponentBase<ScanCascadeFormPropModel> {

    //#region model properties

    private get showDivisionDdl(): boolean {
        if (!this.props.excludeClientCascade &&
            this.props.clients &&
            this.props.formData.clientId > 0) {
            return true;
        }
        return false;
    }

    private get showProjectDdl(): boolean {
        if (!this.props.excludeClientCascade &&
            this.showDivisionDdl &&
            this.props.divisions &&
            this.props.formData.divisionId > 0) {
            return true;
        }
        return false;
    }

    private get showScanTypeDdl(): boolean {
        if (this.props.excludeClientCascade ||
            (
                this.showProjectDdl &&
                this.props.showScanTypeOptions &&
                this.props.formData.projectId > 0
            )
        ) {
            return true;
        }
        return false;
    }

    private get config(): boolean {
        if (this.props?.removeValidation) {
            return false;
        }
        return true;
    }

    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook 
     */
    componentDidMount() {
        if (!this.props.excludeClientCascade) {
            this.props.dispatchFetchClients(this.handleApiFetchError.bind(this));
        }
        if (this.props.formData.clientId > 0) {
            this.props.dispatchFetchDivisions(this.props.formData.clientId, this.handleApiFetchError.bind(this));
        }
        if (this.props.formData.divisionId > 0) {
            this.props.dispatchFetchProjects(this.props.formData.divisionId, this.handleApiFetchError.bind(this));
        }
        this.props.dispatchFetchScanTypes(this.handleApiFetchError.bind(this));

    }

    /**
     * component did update life cycle hook
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps: ScanCascadeFormPropModel, prevState, snapshot) {
        if (this.props.formData.clientId !== prevProps.formData.clientId ||
            this.props.formData.divisionId !== prevProps.formData.divisionId) {
            this.props.dispatchFetchDivisions(this.props.formData.clientId, this.handleApiFetchError.bind(this));
        }
        if (this.props.formData.divisionId !== prevProps.formData.divisionId) {
            this.props.dispatchFetchProjects(this.props.formData.divisionId, this.handleApiFetchError.bind(this));
        }
        if (this.props.formData.projectId !== prevProps.formData.projectId &&
            (!this.props.scanTypes ||
                this.props.scanTypes.length <= 0)) {
            this.props.dispatchFetchScanTypes(this.handleApiFetchError.bind(this));
        }
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <CardComponent
                content={
                    this.renderComponentControls()
                }
            >
            </CardComponent>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on client click call back, loads divisions based on selected client.
     * @param value
     */
    public onClientChange(value) {
        if (this.props.formData.clientId !== value) {
            this.props.dispatchSetClientId(value);
            this.props.dispatchSetDivisionId(null);
            this.props.dispatchSetProjectId(null);
            this.props.dispatchSetScanTypeId(null);

            this.props.dispatchResetControl(this.props.formData, this.props.form, ScanCascadeFormConstant.formField.division);
            this.props.dispatchFetchDivisions(value, this.handleApiFetchError.bind(this));

        }
    }

    /**
     * on division click call back, loads projects based on selected division.
     * @param value
     */
    public onDivisionChange(value) {

        if (this.props.formData.divisionId !== value) {
            this.props.dispatchSetProjectId(null);
            this.props.dispatchSetDivisionId(value);
            this.props.dispatchSetScanTypeId(null);

            this.props.dispatchResetControl(this.props.formData, this.props.form, ScanCascadeFormConstant.formField.scanType);
            this.props.dispatchResetControl(this.props.formData, this.props.form, ScanCascadeFormConstant.formField.project);
            this.props.dispatchFetchProjects(value, this.handleApiFetchError.bind(this), this.props.scanType);

        }
    }

    /**
     * sets projectId into state for initiate scan
     * @param value
     */
    public onProjectChange(value) {
        if (this.props.formData.projectId !== value) {
            this.props.dispatchSetScanTypeId(null);
            this.props.dispatchSetProjectId(value);
            this.props.dispatchResetControl(this.props.formData, this.props.form, ScanCascadeFormConstant.formField.scanType);

            if (this.props.showScanTypeOptions) {
                this.props.dispatchFetchScanTypes(this.handleApiFetchError.bind(this));
            }
        }
    }

    /**
     * on form reset 
     */
    public onFormReset() {
        this.props.dispatchSetScanTypeId(null);
        this.props.dispatchSetProjectId(null);
        this.props.dispatchSetDivisionId(null);
        this.props.dispatchSetClientId(null);

        this.props.dispatchFetchClients(this.handleApiFetchError.bind(this));
        this.props.dispatch({ type: SharedActionType.FetchDivisions, payload: [] });
        this.props.dispatch({ type: SharedActionType.FetchProjects, payload: [] });
        this.props.dispatch({ type: SharedActionType.FetchScanTypes, payload: [] });

    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders start date control html 
     */
    private renderStartDateControl() {
        if (this.props.includeDateRange) {
            return (
                <div className="form-group">
                    <FormFieldComponent<DatepickerPropModel>
                        name={ScanCascadeFormConstant.formField.startDate}
                        component={DatepickerComponent}
                        props={
                            {
                                id: 'ddl_scan_cascade_form_start_date',
                                label: 'Start Date',
                                validations: [
                                    {
                                        validatorType: ValidatorType.Required,
                                        config: this.config,
                                        errorMessage: ScanCascadeFormConstant.errorMessage.startDateRequired
                                    },
                                ],
                                selectsStart: true,
                                startDate: Helper.toDate(this.props.scanFormData.startDate),
                                endDate: Helper.toDate(this.props.scanFormData.endDate, new Date()),
                            }
                        }
                    />

                </div>
            );
        }
        return (null);
    }

    /**
     * renders end date control html 
     */
    private renderEndDateControl() {
        if (this.props.includeDateRange) {
            return (
                <div className="form-group">
                    <FormFieldComponent<DatepickerPropModel>
                        name={ScanCascadeFormConstant.formField.endDate}
                        component={DatepickerComponent}
                        props={
                            {
                                id: 'ddl_scan_cascade_form_end_date',
                                label: 'End Date',
                                validations: [
                                    {
                                        validatorType: ValidatorType.Required,
                                        config: this.config,
                                        errorMessage: ScanCascadeFormConstant.errorMessage.endDateRequired
                                    },
                                ],
                                selectsEnd: true,
                                minDate: Helper.toDate(this.props.scanFormData.startDate),
                                startDate: Helper.toDate(this.props.scanFormData.startDate),
                                endDate: Helper.toDate(this.props.scanFormData.endDate),
                                maxDate: new Date()
                            }
                        }
                    />

                </div>
            );
        }
        return (null);
    }

    /**
     * renders division control html 
     */
    private renderClientControl() {
        return (
            <div className="form-group">
                <FormFieldComponent<DropDownPropModel>
                    name="clientId"
                    component={DropDownComponent}
                    props={
                        {
                            id: 'ddl_scan_cascade_form_client',
                            label: 'Client',
                            validations: [
                                {
                                    validatorType: ValidatorType.Required,
                                    config: this.config,
                                    errorMessage: ScanCascadeFormConstant.errorMessage.clientRequired
                                },
                            ],
                            options: this.props.clients
                        }
                    }
                    onChange={this.onClientChange.bind(this)}
                />

            </div>
        );
    }

    /**
     * renders division control html 
     */
    private renderDivisionControl() {
        if (this.showDivisionDdl) {
            return (
                <div className="form-group">
                    <FormFieldComponent<DropDownPropModel>
                        name="divisionId"
                        component={DropDownComponent}
                        props={
                            {
                                id: 'ddl_scan_cascade_form_division',
                                label: 'Division',
                                validations: [
                                    {
                                        validatorType: ValidatorType.Required,
                                        config: this.config,
                                        errorMessage: ScanCascadeFormConstant.errorMessage.divisionRequired
                                    },
                                ],
                                options: this.props.divisions
                            }
                        }
                        onChange={this.onDivisionChange.bind(this)}
                    />

                </div>
            );
        }
        return (null);
    }

    /**
     * renders project control html 
     */
    private renderProjectControl() {
        if (this.showProjectDdl) {
            return (
                <div className="form-group">
                    <FormFieldComponent<DropDownPropModel>
                        name="projectId"
                        component={DropDownComponent}
                        props={
                            {
                                id: 'ddl_scan_cascade_form_project',
                                label: 'Project',
                                validations: [
                                    {
                                        validatorType: ValidatorType.Required,
                                        config: this.config,
                                        errorMessage: ScanCascadeFormConstant.errorMessage.projectRequired
                                    },
                                ],
                                options: this.props.projects
                            }
                        }
                        onChange={this.onProjectChange.bind(this)}
                    />

                </div>
            );
        }
        return (null);
    }

    /**
     * renders scan type control html 
     */
    private renderScanTypeControl() {
        if (this.showScanTypeDdl) {
            if (this.props.isScanTypeMulti) {
                return (
                    <div className="form-group">
                        <FormFieldComponent<MultiSelectDropDownPropModel>
                            name={ScanCascadeFormConstant.formField.scanType}
                            component={MultiSelectDropDownComponent}
                            props={
                                {
                                    id: 'ddl_scan_cascade_form_scan_type',
                                    label: 'Scan Type',
                                    validations: [
                                        {
                                            validatorType: ValidatorType.Required,
                                            config: this.config,
                                            errorMessage: ScanCascadeFormConstant.errorMessage.scanTypeRequired
                                        },
                                    ],
                                    options: this.props.scanTypes
                                }
                            }
                        />

                    </div>
                );
            }
            return (
                <div className="form-group">
                    <FormFieldComponent<DropDownPropModel>
                        name={ScanCascadeFormConstant.formField.scanType}
                        component={DropDownComponent}
                        props={
                            {
                                id: 'ddl_scan_cascade_form_scan_type',
                                label: 'Scan Type',
                                validations: [
                                    {
                                        validatorType: ValidatorType.Required,
                                        config: this.config,
                                        errorMessage: ScanCascadeFormConstant.errorMessage.scanTypeRequired
                                    },
                                ],
                                options: this.props.scanTypes
                            }
                        }
                    />

                </div>
            );
        }
        return (null);
    }

    /**
     * renders html for the component 
     */
    private renderComponentControls() {
        if (!this.props.excludeForm) {
            return (
                <form onSubmit={this.props.handleSubmit} onReset={this.onFormReset.bind(this)}>
                    {this.renderFormContent()}
                    {this.renderButtonSection()}
                </form>
            );
        }
        return this.renderFormContent();
    }

    /**
     * renders form content body 
     */
    private renderFormContent() {
        return (
            <div className="row space-row scan_controls_row">
                {this.props.includeDateRange ?
                    <>
                        <div className="col-sm-12 col-md-4 col-lg-3 scan_controls_column">
                            {this.renderStartDateControl()}
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-3 scan_controls_column">
                            {this.renderEndDateControl()}
                        </div>
                    </> :
                    null
                }
                {this.props.excludeClientCascade ? null :
                    <>
                        <div className="col-sm-12 col-md-4 col-lg-3 scan_controls_column">
                            {this.renderClientControl()}
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-3 scan_controls_column">
                            {this.renderDivisionControl()}
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-3 scan_controls_column">
                            {this.renderProjectControl()}
                        </div>
                    </>
                }
                <div className="col-sm-12 col-md-4 col-lg-3 scan_controls_column">
                    {this.renderScanTypeControl()}
                </div>
            </div>

        );
    }

    /**
     * renders buttons section 
     */
    private renderButtonSection() {
        if (!this.props.excludeForm) {
            return (
                <div className="row space-row scan_buttons_row">
                    <div className="col-sm-12 col-md-12 col-lg-6">
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 scan_buttons_column">
                        <div className="float-right scan_buttons">
                            <ButtonComponent
                                type="submit"
                                disabled={this.props.pristine || this.props.submitting}
                                displayText={this.props.submitBtnText}
                                id="btn_cascade_form_submit"
                                className="mr-sm-4"
                                fontIconPrefix={this.props.submitBtnIcon}>
                            </ButtonComponent>
                            {this.renderResetButton()}
                        </div>
                    </div>

                </div>
            );
        }
        return (null);
    }

    //#endregion private methods
}