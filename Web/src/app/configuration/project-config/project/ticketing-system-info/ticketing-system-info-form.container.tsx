//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { GlobalState, containerHelper } from '../../../../shared';
import { IAppActionModel } from '../../../../core';
import { TicketSystemType } from '../../../../utilities';

import { TicketingSystemInfoFormComponent } from './ticketing-system-info-form.component';
import { TicketingSystemInfoFormDispatchPropModel } from './models/ticketing-system-info-form-dispatch-prop.model';
import { ticketingSystemInfoSelector, TicketingSystemInfoActionCreator } from './ticketing-system-info-store';
import { TicketingSystemInfoFormOwnPropModel } from './models/ticketing-system-info-own-prop.model';
import { projectSelector } from '../project-store';
import { TicketingSystemInfoFormConstant } from './ticketing-system-info-form.constant';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, TicketingSystemInfoFormOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            showTicketForm: (state) => ticketingSystemInfoSelector.getTicketFormState(state),
            ticketingSystemTypes: (state) => projectSelector.getTicketSystemTypes(state),
            selectedTicketingSystemType: (state) => ticketingSystemInfoSelector.getCurrentTicketSystemType(state),
            initialValues: (state) => projectSelector.getTicketSystemConfigInfo(state),
            ticketSystemConfigInfo: (state) => projectSelector.getTicketSystemConfigInfo(state),
            isTokenBased: (state) => ticketingSystemInfoSelector.getTokenBasedState(state),
            isEnterpriseAccount: (state) => ticketingSystemInfoSelector.getEnterpriseAccountState(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): TicketingSystemInfoFormDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchShowTicketForm: (showTicketForm: boolean) => dispatch(TicketingSystemInfoActionCreator.setTicketFormState(showTicketForm)),
        dispatchCurrentTicketSystemType: (ticketType: TicketSystemType) => dispatch(TicketingSystemInfoActionCreator.setCurrentTicketSystemType(ticketType)),
        dispatchTokenBasedState: (enabled: boolean) => dispatch(TicketingSystemInfoActionCreator.setTokenState(enabled)),
        dispatchEnterpriseAccountState: (enabled: boolean) => dispatch(TicketingSystemInfoActionCreator.setEnterpriseAccount(enabled)),
        dispatchRemoveTicketMapping: (ticketId: number, successCallback: (response) => void, errorCallback: (error?: any) => void) =>
            dispatch(TicketingSystemInfoActionCreator.removeTicketMapping(ticketId, successCallback, errorCallback)),
    };
}

const TicketingSystemInfoReduxform = reduxForm<any, any>({
    form: TicketingSystemInfoFormConstant.form,
    enableReinitialize: true
})(TicketingSystemInfoFormComponent);

export const TicketingSystemInfoForm = connect(mapStateToProps, mapDispatchToProps)(TicketingSystemInfoReduxform)