//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../utilities';
import { IAppActionModel } from '../../../core';
import { containerHelper, injectReducer, PageRequestModel, SuccessFn, ErrorFn } from '../../../shared';

import { ScheduleManagerComponent } from './schedule-manager.component';
import { ScheduleManagerState, scheduleManagerSelector, ScheduleManagerActionCreator, scheduleManagerReducer } from './schedule-manager-store';
import { ScheduleManagerDispatchModel } from './models/schedule-manager-dispatch.model';
import { ScheduleManagerPropModel } from './models';
import { ScheduleModel } from '../models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, ScheduleManagerPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            gridResultData: (state) => scheduleManagerSelector.getSchedules(state),
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<ScheduleManagerState, any, IAppActionModel<ScheduleManagerState>>): ScheduleManagerDispatchModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchSchedules: (pageRequest: PageRequestModel, errorCallback: ErrorFn) =>
            dispatch(ScheduleManagerActionCreator.fetchSchedules(pageRequest, errorCallback)),

        dispatchDeleteSchedule: (schedule: ScheduleModel, successCallback: SuccessFn, errorCallback: ErrorFn) =>
            dispatch(ScheduleManagerActionCreator.deleteSchedule(schedule, successCallback,errorCallback))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(ScheduleManagerComponent);
export const ScheduleManagerContainer = injectReducer(Constant.reducerKey.scheduleManagerReducer, scheduleManagerReducer)(withConnect);