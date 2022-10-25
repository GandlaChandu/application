//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';
import { PagedResult, PageRequestModel, PageState, SuccessFn, ErrorFn } from '../../../../shared';
import { ReportType } from '../../../../utilities';

import { DynamicScanDetailModel } from '../models';

import { DynamicScanReportState } from './dynamic-scan-report.state';
import { dynamicScanReportService } from '../dynamic-scan-report.service';
import { DynamicScanReportActionType } from './dynamic-scan-report-action-type.enum';
import { ticketingIssueService } from '../../../ticketing-issue/ticketing-issue.service';

//#endregion application imports

export class DynamicScanReportActionCreator {

    //#region public functions

    /**
     * action to fetch dynamic scan report and save to store
     * @param dynamicScanId
     * @param pageRequest
     * @param errorCallback
     */
    public static fetchDynamicScanResults(dynamicScanId: number, pageRequest: PageRequestModel, errorCallback: ErrorFn): ThunkDispatch<DynamicScanReportState, any, IAppActionModel<DynamicScanReportState>> {
        return (dispatch: ThunkDispatch<DynamicScanReportState, any, IAppActionModel<DynamicScanReportState>>) => {
            dynamicScanReportService.getDynamicScanResults(dispatch, dynamicScanId, pageRequest).then(
                (response: ApiResponseModel<PagedResult<DynamicScanDetailModel>>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: DynamicScanReportActionType.FetchDynamicScanResults,
                            payload: {
                                dynamicScanResults: response.data,
                                dynamicScanReportFileName: ''
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
     * action to fetch dynamic scan report file as pdf
     * @param dynamicScanId 
     * @param successCallback 
     * @param errorCallback 
     * @param fileName 
     */
    public static getPdfReport(dynamicScanId: number, successCallback: SuccessFn, errorCallback: ErrorFn, fileName: string): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<DynamicScanReportState, any, IAppActionModel<DynamicScanReportState>>) => {
            dynamicScanReportService.getReportByFormat(dispatch, dynamicScanId, ReportType.Pdf, fileName).then(successCallback, errorCallback);
        };
    }

    /**
     * action to fetch dynamic scan report file as excel
     * @param dynamicScanId
     * @param successCallback
     * @param errorCallback
     * @param fileName
     */
    public static getExcelReport(dynamicScanId: number, successCallback: SuccessFn, errorCallback: ErrorFn, fileName: string): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<DynamicScanReportState, any, IAppActionModel<DynamicScanReportState>>) => {
            dynamicScanReportService.getReportByFormat(dispatch, dynamicScanId, ReportType.Excel, fileName).then(successCallback, errorCallback);
        };
    }

    /**
     * action to set popup state info to store
     * @param show
     * @param ticketInfo
     */
    public static setPopupState(show: boolean, ticketInfo: DynamicScanDetailModel): ThunkDispatch<DynamicScanReportState, any, IAppActionModel<DynamicScanReportState>> {
        return (dispatch: ThunkDispatch<DynamicScanReportState, any, IAppActionModel<any>>) => {
            dispatch({
                type: DynamicScanReportActionType.ShowPopup,
                payload: { showPopup: show, ticketInfo: ticketInfo }
            });
        };
    }

    /**
     * action to save/update issue info to store
     * @param issueInfo
     * @param errorCallback
     */
    public static saveIssueInfo(issueInfo: DynamicScanDetailModel, successCallback: SuccessFn, errorCallback: ErrorFn): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<PageState, any, IAppActionModel<PageState>>) => {
            ticketingIssueService.SaveIssueInfo(issueInfo, dispatch).then(successCallback, errorCallback);
        };
    }

    //#endregion public functions
}