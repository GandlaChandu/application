//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { TicketingIssueState } from './ticketing-issue.state';
import { TicketingIssueOwnPropModel } from '../models'

//#endregion application imports


class TicketingIssueSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets assignees based on project
     * @param state
     */
    public getAssignees(state: any, ownProps: TicketingIssueOwnPropModel) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as TicketingIssueState).assignees : [],
            (assignees) => assignees
        );
        return selector(state);
    }

    /**
     * gets labels based on project
     * @param state
     */
    public getLabels(state: any, ownProps: TicketingIssueOwnPropModel) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as TicketingIssueState).labels : [],
            (labels) => labels
        );
        return selector(state);
    }

    /**
     * gets labels based on project
     * @param state
     */
    public getMilestones(state: any, ownProps: TicketingIssueOwnPropModel) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as TicketingIssueState).milestone : [],
            (milestone) => milestone
        );
        return selector(state);
    }

    /**
     * gets ticket issue info
     * @param state
     */
    public GetIssueInfo(state: any, ownProps: TicketingIssueOwnPropModel) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as TicketingIssueState).issueInfo : undefined,
            (issueInfo) => issueInfo
        );
        return selector(state);
    }

    /**
     * gets project info
     * @param state
     */
    public getTicketType(state: any, ownProps: TicketingIssueOwnPropModel) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as TicketingIssueState).ticketingType : null,
            (ticketingType) => ticketingType
        );
        return selector(state);
    }

    //#endregion public functions

}

export const ticketingIssueSelector = new TicketingIssueSelector();

