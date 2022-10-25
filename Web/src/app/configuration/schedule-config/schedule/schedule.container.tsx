//#region react imports

import { connect } from 'react-redux';
import { Selector, createStructuredSelector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { containerHelper, GlobalState, injectReducer } from '../../../shared';
import { IAppActionModel } from '../../../core';
import { Constant } from '../../../utilities';

import { ScheduleState, scheduleSelector, ScheduleActionCreator, scheduleReducer } from './schedule-store';
import { ScheduleOwnPropModel, ScheduleDispatchModel } from './models';
import { ScheduleComponent } from './schedule.component';
import { ScheduleModel, ScheduleRequestModel } from '../models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state, ownprops): Selector<ScheduleState, ScheduleOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            scheduleInfo: (state) => scheduleSelector.getSchedule(state),
            initialScheduleInfo: (state) => scheduleSelector.getInitialSchedule(state),
            cronValue: (state) => scheduleSelector.getCronValue(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): ScheduleDispatchModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),

        dispatchSetSchedule: (schedule: ScheduleModel, initialSchedule: ScheduleModel) =>
            dispatch(ScheduleActionCreator.setSchedule(schedule, initialSchedule)),

        dispatchFetchAndSetSchedule: (id: number, errorCallback: (response) => void) =>
            dispatch(ScheduleActionCreator.fetchAndSetSchedule(id, errorCallback)),

        dispatchSaveSchedule: (schedule: ScheduleRequestModel, successCallback: (response) => void, errorCallback: (response) => void) =>
            dispatch(ScheduleActionCreator.saveSchedule(schedule, successCallback, errorCallback)),

    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(ScheduleComponent);
export const ScheduleContainer = injectReducer(Constant.reducerKey.scheduleReducer, scheduleReducer)(withConnect);