//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { FunctionalCode } from '../../../utilities';
import {
    CardComponent,
    ComponentBase} from '../../../shared';

import { SchedulePropModel } from './models';
import './schedule.scss';
import { ScheduleForm } from './schedule-form';
import { ScheduleModel, ScheduleRequestModel } from '../models';
import { ScheduleActionCreator } from './schedule-store';
import { ScheduleFormConstant } from './schedule-form/schedule-form.constant';
import { ScanCascadeFormConstant } from '../../../shared/scan-cascade-form/scan-cascade-form.constant';

//#endregion application imports

export class ScheduleComponent extends ComponentBase<SchedulePropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(
            this.hasLocationInfo && this.locationInfo.isEdit ?
                FunctionalCode.EditSchedule :
                FunctionalCode.AddSchedule);
    }

    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        super.componentDidMount();
        if (this.hasLocationInfo &&
            this.locationInfo.isEdit) {
            this.setEditStateDefaults();
        }
        else {
            this.props.dispatchSetEditMode(false);
            this.props.dispatchSetSchedule(new ScheduleModel(), new ScheduleModel());
        }
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                {this.renderPrevButton()}
                {this.renderScheduleForm()}
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * sets edit state default values
     */
    public setEditStateDefaults() {
        this.props.dispatchFetchAndSetSchedule(this.locationInfo.schedule.id, this.handleApiFetchError.bind(this));
        super.setEditStateDefaults(FunctionalCode.EditSchedule);
    }

    /**
     * on save btn click callback
     * @param formData
     */
    public onFormSubmit(formData: ScheduleModel) {
        let schedule: ScheduleRequestModel = {
            ...formData,
            id: this.props.scheduleInfo.id,
            schedule: {
                ...formData.schedule,
                cronSchedule: this.props.cronValue
            },
            scanTypes: formData.scanTypeId.map(x => { return { scanType: x } })
        };
        this.props.dispatchSaveSchedule(
            schedule,
            (response) => {
                if (this.isApiResponseSuccess(response)) {
                    schedule.id = response.data;
                    let scheduleInfo = ScheduleActionCreator.getScheduleModel(schedule);
                    this.props.dispatchSetSchedule(scheduleInfo, { ...scheduleInfo });
                }
                this.onFormSubmitSuccess(response, { schedule: schedule, isEdit: true });

            },
            this.handleApiSaveError.bind(this)
        );
    }

    /**
     * on form reset click 
     */
    public onFormReset() {
        //close alerts if any opened
        this.props.dispatchHideAlert();
        this.props.dispatchResetControl(this.props.scheduleInfo, ScheduleFormConstant.form, ScanCascadeFormConstant.formField.scanType);
        this.props.dispatchResetControl(this.props.scheduleInfo, ScheduleFormConstant.form, ScanCascadeFormConstant.formField.project);

        this.props.dispatchResetControl(this.props.scheduleInfo, ScheduleFormConstant.form, ScanCascadeFormConstant.formField.division);
        this.props.dispatchResetControl(this.props.scheduleInfo, ScheduleFormConstant.form, ScanCascadeFormConstant.formField.client);
        this.props.dispatchSetSchedule(ScheduleActionCreator.getScheduleModel({
            ...this.props.initialScheduleInfo,
            scanTypes: this.props.scheduleInfo.scanTypeId.map(x => { return { scanType: x } })

        }), { ...this.props.initialScheduleInfo });

    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders client form html 
     */
    private renderScheduleForm() {
        if (this.props.scheduleInfo) {
            return (
                <div className="row">
                    <div className="col-12">
                        <CardComponent content=
                            {
                                <>
                                    <ScheduleForm onSubmit={this.onFormSubmit.bind(this)} onReset={this.onFormReset.bind(this)} />
                                </>
                            }
                        >
                        </CardComponent>
                    </div>
                </div>
            );
        }
        return (<></>);
    }

    //#endregion private methods
}