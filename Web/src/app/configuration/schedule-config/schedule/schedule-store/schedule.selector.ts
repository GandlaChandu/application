//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

import { ScheduleState } from './schedule.state';
import { ScheduleModel } from '../../models';
import { ScheduleFormConstant } from '../schedule-form/schedule-form.constant';

//#endregion application imports


class ScheduleSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets schedule info
     * @param state
     */
    public getSchedule(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.scheduleReducer] ?
                (state[Constant.reducerKey.scheduleReducer] as ScheduleState).scheduleInfo : new ScheduleModel(),
            (schedule) => schedule
        );
        return selector(state);
    }

    /**
     * gets form data from state
     * @param state
     */
    public getScheduleFormData(state: any) {
        let selector = createSelector(
            (state: any) => state.form && state.form[ScheduleFormConstant.form] && state.form[ScheduleFormConstant.form].values ?
                state.form[ScheduleFormConstant.form].values
                :
                {}
            ,
            (formData) => formData
        );
        return selector(state);
    }
    /**
     * gets schedule info
     * @param state
     */
    public getInitialSchedule(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.scheduleReducer] ?
                (state[Constant.reducerKey.scheduleReducer] as ScheduleState).initialScheduleInfo : new ScheduleModel(),
            (schedule) => schedule
        );
        return selector(state);
    }

    /**
     * gets popup state info
     * @param state
     */
    public getPopupState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.scheduleReducer] ?
                (state[Constant.reducerKey.scheduleReducer] as ScheduleState).showConfig : false,
            (showConfig) => showConfig
        );
        return selector(state);
    }

    /**
     * gets cron value state info
     * @param state
     */
    public getCronValue(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.scheduleReducer] ?
                (state[Constant.reducerKey.scheduleReducer] as ScheduleState).cronValue || Constant.defaultCron : Constant.defaultCron,
            (cronValue) => cronValue
        );
        return selector(state);
    }

    //#endregion public functions

}

export const scheduleSelector = new ScheduleSelector();

