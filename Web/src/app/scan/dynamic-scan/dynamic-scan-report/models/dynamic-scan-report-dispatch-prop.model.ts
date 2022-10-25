//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel, PageRequestModel, SuccessFn, ErrorFn } from '../../../../shared';

import { DynamicScanDetailModel } from '../models';

//#endregion application imports

export interface DynamicScanReportDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchFetchDynamicScanReport: (dynamicScanId: number, pageRequest: PageRequestModel, errorCallback: ErrorFn) => void;
    dispatchPdfDownload: (dynamicScanId: number, successCallback: SuccessFn, errorCallback: ErrorFn, fileName: string) => void;
    dispatchShowPopup?: (show: boolean, ticketInfo: DynamicScanDetailModel) => void;
    dispatchFetchIssueMetaData: (projectId: number, errorCallback: ErrorFn) => void;
    dispatchSaveIssue: (issueInfo: DynamicScanDetailModel, successCallback: SuccessFn, errorCallback: ErrorFn) => void;
    dispatchExcelDownload: (dynamicScanId: number, successCallback: SuccessFn, errorCallback: ErrorFn, fileName: string) => void;
}