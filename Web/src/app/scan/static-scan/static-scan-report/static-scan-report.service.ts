//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { apiHandler, IAppActionModel } from '../../../core';
import { Url, ReportType, Constant } from '../../../utilities';
import { PageRequestModel, Helper } from '../../../shared';

//#endregion application imports

class StaticScanReportService {

    //#region public functions

    /**
     * gets static scan results for given id
     * @param dispatch
     * @param staticScanId
     * @param pageRequest
     */
    public getStaticScanResults(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, staticScanId: number, pageRequest: PageRequestModel) {
        let url = Url.getStaticScanUrl(`${Url.apiUrl.staticScanResultsFetchApi}/${staticScanId}`);
        return apiHandler.post(url, pageRequest.pagination, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * gets static scan report for excel
     * @param dispatch
     * @param staticScanId
     * @param fileName
     */
    public getExcelReport(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, staticScanId: number, fileName: string) {
        let url = Url.getStaticScanUrl(`${Url.apiUrl.staticScanReportByFormatApi}/${staticScanId}/${ReportType.Excel}`);
        return apiHandler.post(url, null, dispatch, {
            ...Helper.setHeaderAuthToken(),
            [Constant.header.accept]: Constant.file.excelMime,
            [Constant.header.contentDisposition]: `${Constant.file.contentDisposition}${fileName}`,
            [Constant.header.contentType]: Constant.file.excelMime
        }, 'blob');
    }

    /**
     * gets static scan report for pdf
     * @param dispatch
     * @param staticScanId
     * @param fileName
     */
    public getPdfReport(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, staticScanId: number, fileName: string) {
        let url = Url.getStaticScanUrl(`${Url.apiUrl.staticScanReportByFormatApi}/${staticScanId}/${ReportType.Pdf}`);
        return apiHandler.post(url, null, dispatch, {
            ...Helper.setHeaderAuthToken(),
            [Constant.header.accept]: Constant.file.pdfMime,
            //[Constant.header.contentDisposition]: `${Constant.file.excelContentDisposition}${fileName}`,
            [Constant.header.contentType]: Constant.file.pdfMime
        }, 'blob');
    }

    //#endregion public functions

}

export const staticScanReportService = new StaticScanReportService();