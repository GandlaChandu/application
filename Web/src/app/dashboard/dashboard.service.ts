//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { Url } from '../utilities';
import { apiHandler, IAppActionModel } from '../core';
import { Helper, SelectListItemModel } from '../shared';

import { DashboardRequestModel } from './models';

//#endregion application imports

class DashboardService {

    //#region public functions

    /**
    * fetches recent scans info
    * @param data
    * @param dispatch
    */
    public fetchRecentScans(data: DashboardRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        // return apiHandler.get('https://jsonblob.com/api/4476fe56-e93c-11ea-9b88-0f96e4eef3a6', dispatch);
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.getRecentScansApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * fetches recent scans info
     * @param data
     * @param dispatch
     */
    public fetchScanSummary(data: DashboardRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        //return apiHandler.get('https://jsonblob.com/api/f982dbe8-eb5d-11ea-9641-91d777010110', dispatch);
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.getScanSummaryApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * fetches recent scans info
     * @param data
     * @param dispatch
     */
    public fetchVulnerabilitiesBySeverity(data: DashboardRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.getVulnerabilitiesBySeverityApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * fetches last scanned date
     * @param data
     * @param dispatch
     */
    public fetchLastScannedOn(data: DashboardRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.getLastScannedOnApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * fetches top 10 vulnerability types
     * @param data
     * @param dispatch
     */
    public fetchTopVlnerabilityTypes(data: DashboardRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.getTopVulnerabilityTypesApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * fetches vulnerability trend
     * @param data
     * @param dispatch
     */
    public fetchVlnerabilityTrend(data: DashboardRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.getVulnerabilityTrendApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * fetches dashboard projects list
     * @param request
     * @param dispatch
     */
    public fetchProjects(request: DashboardRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.getMyProjectsApi), request, dispatch, Helper.setHeaderAuthToken());
    }

    /**
    * gets nav menu items 
    */
    public getTrendPeriod() {
        let trendPeriodModel: SelectListItemModel[] = [
            {
                label: '7',
                value: 7
            },
            {
                label: '15',
                value: 15
            },
            {
                label: '30',
                value: 30
            },
            {
                label: '60',
                value: 60
            },
            {
                label: '120',
                value: 120
            }
        ]

        let observable = Promise.resolve({ trendPeriod: trendPeriodModel });
        return observable;

    }

    //#endregion public functions

}

export const dashboardService = new DashboardService();