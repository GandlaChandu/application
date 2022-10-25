//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { containerHelper, GlobalState } from '../../../../shared';
import { IAppActionModel } from '../../../../core';

import { ScheduleDispatchModel, ScheduleOwnPropModel } from '../models';
import { ScheduleFormComponent } from './schedule-form.component';
import { ScheduleFormConstant } from './schedule-form.constant';
import { scheduleSelector, ScheduleActionCreator } from '../schedule-store';
import { ScheduleModel } from '../../models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, ScheduleOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            scheduleInfo: (state) => scheduleSelector.getScheduleFormData(state),
            initialValues: (state) => scheduleSelector.getSchedule(state),
            showConfig: (state) => scheduleSelector.getPopupState(state),
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
        dispacthConfigPopupState: (show: boolean) => dispatch(ScheduleActionCreator.setConfigState(show)),
        dispatchSetCronValue: (cron: string) => dispatch(ScheduleActionCreator.setCronValue(cron))
    };
}

const ScheduleReduxform = reduxForm<ScheduleModel, any, any>({
    form: ScheduleFormConstant.form,
    enableReinitialize: true
})(ScheduleFormComponent)

export const ScheduleForm = connect(mapStateToProps, mapDispatchToProps)(ScheduleReduxform)