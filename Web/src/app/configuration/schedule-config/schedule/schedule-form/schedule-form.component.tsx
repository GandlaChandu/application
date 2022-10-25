//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import {
    FormFieldComponent,
    TextboxComponent,
    ValidatorType,
    ComponentBase,
    ScanCascadeExcludeForm,
    CronConfigComponent,
    PopupComponent,
    ButtonComponent,
    SwitchComponent,
    DatepickerComponent,
    Helper
} from '../../../../shared';
import { Constant } from '../../../../utilities';

import './schedule-form.scss';
import { SchedulePropModel } from '../models';
import { ScheduleFormConstant } from './schedule-form.constant';

//#endregion application imports

export class ScheduleFormComponent extends ComponentBase<SchedulePropModel> {

    //#region model properties

    private readonly idPrefix: string = 'schedule_form_';

    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                <form onSubmit={this.props.handleSubmit} onReset={this.props.onReset}>
                    <div className="row space-row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            {this.renderNameControl()}
                        </div>
                        <div className="col-sm-8 col-md-6 col-lg-6">
                            {this.renderCronControl()}
                        </div>
                    </div>
                    <div className="row space-row">
                        <div className="col-sm-6">
                            {this.renderStartDateControl()}
                        </div>
                        <div className="col-sm-6">
                            {this.renderEndDateControl()}
                        </div>
                    </div>
                    <div className="no-card">
                        {this.renderCascadeControl()}
                    </div>
                    <div className="row space-row">
                        <div className="col-sm-12">
                            {this.renderIsActiveControl()}
                        </div>
                    </div>
                    {this.renderConfigurationPopup()}
                    {this.renderSaveButtons(this.props.pristine || this.props.submitting || this.props.invalid, `btn_${this.idPrefix}_save_schedule`)}
                </form>
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on set configuration link click
     */
    public onSetConfigClick() {
        this.props.dispacthConfigPopupState(true);
    }

    /**
     * on config popup close
     * @param divisionInfo
     */
    public onConfigPopupClose() {
        this.props.dispacthConfigPopupState(false);
    }

    /**
     * on cron change value
     * @param value
     */
    public onCronChange(value) {
        this.props.dispatchSetCronValue(value);
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders name control 
     */
    private renderNameControl() {
        return (
            <div className="form-group">
                <FormFieldComponent
                    name="name"
                    component={TextboxComponent}
                    props={
                        {
                            id: `txt_${this.idPrefix}_name`,
                            label: 'Name',
                            validations: [
                                {
                                    validatorType: ValidatorType.Required,
                                    config: true,
                                    errorMessage: ScheduleFormConstant.errorMessage.nameRequired
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
     * renders end date control 
     */
    private renderEndDateControl() {
        return (
            <div className="form-group">
                <FormFieldComponent
                    name="schedule.endDate"
                    component={DatepickerComponent}
                    props={
                        {
                            id: `txt_${this.idPrefix}_end_date`,
                            label: 'End Date',
                            validations: [
                                {
                                    validatorType: ValidatorType.Required,
                                    config: true,
                                    errorMessage: ScheduleFormConstant.errorMessage.endDateRequired
                                }
                            ],
                            selectsEnd: true,
                            minDate: Helper.toDate(this.props.scheduleInfo?.schedule?.startDate),
                            startDate: Helper.toDate(this.props.scheduleInfo?.schedule?.startDate),
                            endDate: Helper.toDate(this.props.scheduleInfo?.schedule?.endDate),
                            maxDate: new Date(9999, 11, 31)
                        }
                    }
                >
                </FormFieldComponent>

            </div>
        );
    }

    /**
     * renders start date control 
     */
    private renderStartDateControl() {
        return (
            <div className="form-group">
                <FormFieldComponent
                    name="schedule.startDate"
                    component={DatepickerComponent}
                    props={
                        {
                            id: `txt_${this.idPrefix}_start_date`,
                            label: 'Start Date',
                            validations: [
                                {
                                    validatorType: ValidatorType.Required,
                                    config: true,
                                    errorMessage: ScheduleFormConstant.errorMessage.startDateRequired
                                }
                            ],
                            selectsStart: true,
                            startDate: Helper.toDate(this.props.scheduleInfo?.schedule?.startDate),
                            endDate: Helper.toDate(this.props.scheduleInfo?.schedule?.endDate),
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
    private renderCascadeControl() {
        return (
            <ScanCascadeExcludeForm
                form={ScheduleFormConstant.form}
                namespace={Constant.reducerKey.scheduleReducer}
                showScanTypeOptions
                excludeForm
                isScanTypeMulti
                initialFormData={this.props.scheduleInfo}
            />
        );
    }

    /**
     * renders config link html 
     */
    private renderCronControl() {
        return (
            <div className="form-group">
                <div className="row">
                    <div className="col-sm-8 mr-0 pr-0">
                        <TextboxComponent
                            disabled
                            id={`txt_${this.idPrefix}_name`}
                            label="Cron"
                            input={
                                {
                                    name: 'cron',
                                    value: this.props.cronValue
                                }
                            }
                            meta={{}}
                        />
                    </div>
                    <div className="col-sm-4 mt-4 pt-3 ml-0 pl-0 mr-0 pr-0">
                        {this.renderConfigurationLink()}
                    </div>
                </div>
            </div>
        );
    }

    /**
     * renders is active control 
     */
    private renderIsActiveControl() {
        return (
            <div className="form-group">
                <FormFieldComponent
                    name="isEnabled"
                    component={SwitchComponent}
                    props={
                        {
                            id: 'swt_schedule_form_isEnabled',
                            label: 'Is Active',

                        }
                    }
                >
                </FormFieldComponent>
            </div>

        );
    }

    /**
     * renders config link html 
     */
    private renderConfigurationLink() {
        return (
            <ButtonComponent
                type="button"
                displayText="Edit"
                displayType="link"
                id="btn_add_edit_add_schedule"
                fontIconPrefix="fa fa-pencil"
                className="pl-0"
                clickHandler={this.onSetConfigClick.bind(this)}
            >
            </ButtonComponent>
        );
    }

    /**
     * renders configuration popup 
     */
    private renderConfigurationPopup() {
        return (
            <PopupComponent open={this.props.showConfig}
                closeHandler={this.onConfigPopupClose.bind(this)}
                popupContent={this.getPopupContent()}
                showCloseIcon
                scrollable
                size="lg"
                dialogClassName="cron-dialog"
            >
            </PopupComponent >
        );
    }

    /**
     * gets popup content
     */
    private getPopupContent() {
        return (
            <CronConfigComponent config={this.props.cronValue} onChange={this.onCronChange.bind(this)} />
        );
    }

    //#endregion private methods
}
