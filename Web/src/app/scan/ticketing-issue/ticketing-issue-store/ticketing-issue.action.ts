//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../core';
import { Helper } from '../../../shared';

import { TicketingIssueState, TicketingIssueActionType } from '../ticketing-issue-store';
import { ticketingIssueService } from '../../ticketing-issue/ticketing-issue.service';
import { TicketinIssueRequestModel } from '../models';

//#endregion application imports

export class TicketingIssueActionCreator {

    //#region public functions

    /**
     * action to fetch assignees and save info to store
     * @param projectId
     * @param errorCallback
     */
    public static fetchIssueMetaData(projectId: number, errorCallback: (error?: any) => void): ThunkDispatch<TicketingIssueState, any, IAppActionModel<TicketingIssueState>> {
        return (dispatch: ThunkDispatch<TicketingIssueState, any, IAppActionModel<TicketingIssueState>>) => {
            if (projectId) {
                ticketingIssueService.getIssueMetaData(projectId, dispatch).then(
                    (response: ApiResponseModel<any>) => {
                        if (response && response.isSuccess && response.data && response.data.length === 2) {
                            let metadataResponse = response.data[0];
                            let typesResponse = response.data[1];
                            let i = typesResponse.findIndex((f) => f.id === metadataResponse.type)
                            if (i >= 0) {
                                dispatch({
                                    type: TicketingIssueActionType.FetchMetaData,
                                    payload: {
                                        //TODO: to change key-value pair format after changes in all API's
                                        assignees: metadataResponse.assignees ? metadataResponse.assignees.map(x => Helper.toSelectTextValueItem(x)) : [],
                                        labels: metadataResponse.labels ? metadataResponse.labels.map(x => Helper.toSelectTextValueItem(x)) : [],
                                        milestone: metadataResponse.milestone ? metadataResponse.milestone.map(x => Helper.toSelectTextValueItem(x)) : [],
                                        ticketingType: typesResponse[i].name,
                                        ticketTypeId: typesResponse[i].id
                                    }
                                });
                            }
                        }
                    },
                    () => { }
                );
            }
        }
    }

    /**
     * action to fetch and set issue info
     * @param issueId
     * @param projectId
     * @param ticketType
     * @param errorCallback
     */
    public static fetchIssueInfo(issueId: number, projectId: number, ticketType: number, errorCallback: (error?: any) => void): ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            if (issueId) {
                ticketingIssueService.fetchIssueInfo(issueId, projectId, dispatch).then(
                    (response: ApiResponseModel<TicketinIssueRequestModel>) => {
                        if (response && response.isSuccess) {
                            dispatch({
                                type: TicketingIssueActionType.FetchIssueInfo,
                                payload: {
                                    issueInfo: response.data.issueInformation
                                }
                            });
                        }
                        else {
                            errorCallback(response);
                        }
                    },
                    errorCallback
                );
            }
             else{
                 dispatch({
                     type: TicketingIssueActionType.FetchIssueInfo,
                     payload: {
                         issueInfo: { type: ticketType}
                     }
                 });
             }
        }
    }

    /**
     * action to set popup state info to store
     * @param show
     */
    public static setPopupState(show: boolean): ThunkDispatch<TicketingIssueState, any, IAppActionModel<TicketingIssueState>> {
        return (dispatch: ThunkDispatch<TicketingIssueState, any, IAppActionModel<TicketingIssueState>>) => {
            dispatch({
                type: TicketingIssueActionType.ShowPopup,
                payload: { showPopup: show }
            });
        };
    }

    //#endregion public functions
}