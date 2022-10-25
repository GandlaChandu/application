//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel, PageRequestModel, ErrorFn, SuccessFn } from '../../../../shared';

import { StaticScanReportModel } from '../models';

//#endregion application imports

export interface StaticScanReportDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchFetchStaticScanReport: (staticScanId: number, pageRequest: PageRequestModel, errorCallback: ErrorFn) => void;
    dispatchDownloadScanReport: (dynamicScanId: number, successCallback: SuccessFn, errorCallback: ErrorFn, fileName: string) => void;
    dispatchFetchIssueMetaData: (projectId: number, errorCallback: ErrorFn) => void;
    dispatchSaveIssue: (issueInfo: StaticScanReportModel, successCallback: SuccessFn, errorCallback: ErrorFn) => void;
    dispatchShowPopup?: (show: boolean, staticIssueInfo: StaticScanReportModel) => void;
    dispatchExcelDownloadScanReport: (dynamicScanId: number, successCallback: SuccessFn, errorCallback: ErrorFn, fileName: string) => void;

}