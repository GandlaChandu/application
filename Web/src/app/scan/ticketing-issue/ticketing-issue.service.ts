//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { Url, Constant } from '../../utilities';
import { IAppActionModel, apiHandler, ApiRequestModel, HttpType } from '../../core';
import { Helper } from '../../shared';

import { TicketinIssueRequestModel } from './models';

//#endregion application imports

class TicketingIssueService {

    //#region public functions
    //#endregion public functions

    //#region public functions  

    /**
     * get all assignees
     * @param projectId
     * @param dispatch
     */
    public getIssueMetaData(projectId: number, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        let requests: ApiRequestModel[] = [
            {
                url: Url.getTicketSystemUrl(Url.apiUrl.fetchIssueMetaDataApi),
                headers: { [Constant.header.id]: projectId, ...Helper.setHeaderAuthToken() },
                httpType: HttpType.Get
            },
            {
                url: Url.getApplicationAnalyzerUrl(Url.apiUrl.getTicketSystemTypesApi),
                headers: Helper.setHeaderAuthToken(),
                httpType: HttpType.Get
            }

        ];

        return apiHandler.multiRequestCall(requests, dispatch);
    }

    /**
     * get issue data from DB
     * @param issueId
     * @param projectId
     */
    public fetchIssueInfo(issueId: number, projectId: number, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(`${Url.getTicketSystemUrl(Url.apiUrl.fetchIssueByIdApi)}${issueId}`, dispatch, { [Constant.header.id]: projectId, ...Helper.setHeaderAuthToken() });
    }

    /**
     * saves issue request to DB
     * @param dispatch
     * @param issueInfo
     */
    public SaveIssueInfo(issueInfo: TicketinIssueRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        if (issueInfo.id) {
            return apiHandler.put(Url.getTicketSystemUrl(Url.apiUrl.updateIssueApi), issueInfo, dispatch, { [Constant.header.id]: issueInfo.projectId, ...Helper.setHeaderAuthToken() });
        }
        return apiHandler.post(Url.getTicketSystemUrl(Url.apiUrl.saveIssueApi), issueInfo, dispatch, { [Constant.header.id]: issueInfo.projectId, ...Helper.setHeaderAuthToken() });
    }

    //#endregion public functions

}

export const ticketingIssueService = new TicketingIssueService();