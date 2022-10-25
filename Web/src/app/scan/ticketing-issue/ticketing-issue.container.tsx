//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { GlobalState, containerHelper, ErrorFn } from '../../shared';
import { IAppActionModel } from '../../core';

import { TicketingIssueComponent } from './ticketing-issue.component';
import { TicketingIssueOwnPropModel, TicketingIssueDispatchPropModel } from './models';
import { TicketingIssueActionCreator, ticketingIssueSelector } from './ticketing-issue-store';
import { TicketingIssueConstant } from './ticketing-issue.constant';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state, ownprops): Selector<any, TicketingIssueOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            issueInfo: (state) => ticketingIssueSelector.GetIssueInfo(state, ownprops),
            assignees: (state) => ticketingIssueSelector.getAssignees(state, ownprops),
            labels: (state) => ticketingIssueSelector.getLabels(state, ownprops),
            milestones: (state) => ticketingIssueSelector.getMilestones(state, ownprops),
            initialValues: (state) => ticketingIssueSelector.GetIssueInfo(state, ownprops),
            ticketingType: (state) => ticketingIssueSelector.getTicketType(state, ownprops)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): TicketingIssueDispatchPropModel {
    return {

        ...containerHelper().mapDispatchToPropsBase(dispatch),

        dispatchGetIssuesInfo: (issueId: number, projectId: number, ticketType: number, errorCallback: ErrorFn) =>
            dispatch(TicketingIssueActionCreator.fetchIssueInfo(issueId, projectId, ticketType, errorCallback)),

    };
}

const TicketingIssueReduxform = reduxForm({
    form: TicketingIssueConstant.form,
    enableReinitialize: true
})(TicketingIssueComponent)

export const TicketingIssueContainer = connect(mapStateToProps, mapDispatchToProps)(TicketingIssueReduxform);
