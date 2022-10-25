//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';
import { PagedResult, PageRequestModel, PageState, StaticScanDetailModel, SuccessFn, ErrorFn } from '../../../../shared';

import { StaticScanReportState } from './static-scan-report.state';
import { staticScanReportService } from '../static-scan-report.service';
import { StaticScanReportActionType } from './static-scan-report-action-type.enum';
import { StaticScanReportModel } from '../models';
import { ticketingIssueService } from '../../../ticketing-issue/ticketing-issue.service';

//#endregion application imports

export class StaticScanReportActionCreator {

    //#region public functions

    /**
     * action to fetch static scan report and save to store
     * @param staticScanId
     * @param pageRequest
     * @param errorCallback
     */
    public static fetchStaticScanResults(staticScanId: number, pageRequest: PageRequestModel, errorCallback: ErrorFn): ThunkDispatch<StaticScanReportState, any, IAppActionModel<StaticScanReportState>> {
        return (dispatch: ThunkDispatch<StaticScanReportState, any, IAppActionModel<StaticScanReportState>>) => {
            staticScanReportService.getStaticScanResults(dispatch, staticScanId, pageRequest).then(
                (response: ApiResponseModel<PagedResult<StaticScanDetailModel>>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: StaticScanReportActionType.FetchStaticScanResults,
                            payload: {
                                staticScanResults: response.data
                            }
                        });
                    }
                    else {
                        errorCallback(response);
                    }
                },
                errorCallback
            );
        };
    }

    /**
     * action to get report file as excel
     * @param staticScanId
     * @param successCallback
     * @param errorCallback
     * @param fileName
     */
    public static getExcelFile(staticScanId: number, successCallback: SuccessFn, errorCallback: ErrorFn, fileName: string): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<StaticScanReportState, any, IAppActionModel<StaticScanReportState>>) => {
            staticScanReportService.getExcelReport(dispatch, staticScanId, fileName).then(successCallback, errorCallback);
        };
    }

    /**
     * action to get report file as excel
     * @param staticScanId
     * @param successCallback
     * @param errorCallback
     * @param fileName
     */
    public static getPdfFile(staticScanId: number, successCallback: SuccessFn, errorCallback: ErrorFn, fileName: string): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<StaticScanReportState, any, IAppActionModel<StaticScanReportState>>) => {
            staticScanReportService.getPdfReport(dispatch, staticScanId, fileName).then(successCallback, errorCallback);
        };
    }

    /**
     * action to set popup state info to store
     * @param show
     * @param staticIssueInfo
     */
    public static setPopupState(show: boolean, staticIssueInfo: StaticScanReportModel): ThunkDispatch<StaticScanReportState, any, IAppActionModel<StaticScanReportState>> {
        return (dispatch: ThunkDispatch<StaticScanReportState, any, IAppActionModel<StaticScanReportState>>) => {
            dispatch({
                type: StaticScanReportActionType.ShowPopup,
                payload: { showPopup: show, ticketInfo: staticIssueInfo }
            });
        };
    }

    /**
     * action to save/update issue info to store
     * @param issueInfo
     * @param errorCallback
     */
    public static saveIssueInfo(issueInfo: StaticScanReportModel, successCallback: SuccessFn, errorCallback: ErrorFn): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<PageState, any, IAppActionModel<PageState>>) => {
            ticketingIssueService.SaveIssueInfo(issueInfo, dispatch).then(successCallback, errorCallback);
        };
    }

    //#endregion public functions
}