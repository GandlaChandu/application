//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { apiHandler, IAppActionModel } from '../../../core';
import { Url, ReportType, Constant } from '../../../utilities';
import { PageRequestModel, Helper } from '../../../shared';

//#endregion application imports

class DynamicScanReportService {

    //#region public functions

    /**
     * gets dynamic scan results for given id
     * @param dispatch
     * @param dynamicScanId
     * @param pageRequest
     */
    public getDynamicScanResults(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, dynamicScanId: number, pageRequest: PageRequestModel) {
        let url = Url.getDynamicScanUrl(`${Url.apiUrl.dynamicScanResultsFetchApi}${dynamicScanId}`);
        return apiHandler.post(url, pageRequest, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * gets static scan report by format
     * @param dispatch
     * @param staticScanId
     * @param reportType
     * @param fileName
     */
    public getReportByFormat(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, staticScanId: number, reportType: ReportType, fileName:string) {
        let url = Url.getDynamicScanUrl(`${Url.apiUrl.dynamicScanReportByFormatApi}/${staticScanId}/${reportType}`);
        return apiHandler.post(url, null, dispatch, {
            ...Helper.setHeaderAuthToken(),
            [Constant.header.accept]: Constant.file.excelMime,
            [Constant.header.contentDisposition]: `${Constant.file.contentDisposition}${fileName}`,
            [Constant.header.contentType]: Constant.file.excelMime
        }, 'blob');
    }

    //#endregion public functions

}

export const dynamicScanReportService = new DynamicScanReportService();