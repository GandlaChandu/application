//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../core';
import { Helper, ControlConstant, ErrorFn } from '../../shared';
import { SeverityType } from '../../utilities';

import { DashboardState, DashboardActionType } from '../dashboard-store';
import { dashboardService } from '../dashboard.service';
import { DashboardRequestModel } from '../models';

//#endregion application imports

export class DashboardActionCreator {

    //#region public functions 

    /**
     * Action to fetch vulnerabilieties by severity
     * @param requestInfo 
     * @param errorCallback 
     */
    public static fetchVulnerabilitiesBySeverity(requestInfo: DashboardRequestModel, errorCallback: (error?: any) => void): ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>> {
        return (dispatch: ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>>) => {
            dashboardService.fetchVulnerabilitiesBySeverity(requestInfo, dispatch).then(
                (response: ApiResponseModel<any>) => {
                    let vulnerabilitiesBySeverity = response && response.isSuccess && response.data.length > 0 ? response.data : null;
                    if (response && response.isSuccess) {
                        dispatch({
                            type: DashboardActionType.FetchulnerabilitiesBySeverity,
                            payload: {
                                vulnerabilitiesBySeverity: Helper.setNullToEmptyData(ControlConstant.severity, vulnerabilitiesBySeverity)
                            }
                        });
                    }
                    else {
                        errorCallback(response);
                    }
                },
                errorCallback);
        };
    }

    /**
     * action to recent scans to store
     * @param recentScanRequest
     * @param errorCallback
     */
    public static fetchRecentScans(recentScanRequest: DashboardRequestModel, errorCallback: (error) => void): ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>> {
        return (dispatch: ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>>) => {
            dashboardService.fetchRecentScans(recentScanRequest, dispatch).then(
                (response: ApiResponseModel<any>) => {
                    if (response && response.isSuccess) {
                        Object.keys(response.data).forEach(function (i) {
                            Helper.setNullToEmptyData(ControlConstant.severity, response.data[i].vulnerabilities);
                        });
                        dispatch({
                            type: DashboardActionType.FetchRecentScans,
                            payload: { recentScans: response.data }
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
     * action to scan summary to store
     * @param request
     * @param errorCallback
     */
    public static fetchScanSummary(request: DashboardRequestModel, errorCallback: (error) => void): ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>> {
        return (dispatch: ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>>) => {
            dashboardService.fetchScanSummary(request, dispatch).then(
                (response: ApiResponseModel<any>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: DashboardActionType.FetchScanSummary,
                            payload: { scanSummary: response.data }
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
     * action to fetch last scanned date
     * @param requestInfo
     * @param errorCallback
     */
    public static fetchLastScannedOn(requestInfo: DashboardRequestModel, errorCallback: (error) => void): ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>> {
        return (dispatch: ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>>) => {
            dashboardService.fetchLastScannedOn(requestInfo, dispatch).then(
                (response: ApiResponseModel<any>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: DashboardActionType.FetchLastScannedOn,
                            payload: { lastScannedOn: response.data }
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
     * action to fetch top 10 vulnerability types
     * @param requestInfo
     * @param errorCallback
     */
    public static fetchTopVulnerabilityTypes(requestInfo: DashboardRequestModel, errorCallback: (error) => void): ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>> {
        return (dispatch: ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>>) => {
            dashboardService.fetchTopVlnerabilityTypes(requestInfo, dispatch).then(
                (response: ApiResponseModel<any>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: DashboardActionType.FetchTopVulnerabilityTypes,
                            payload: { topVulnerabilityTypes: response.data }
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
     * action to fetch vulnerability trend
     * @param requestInfo
     * @param errorCallback
     */
    public static fetchVulnerabilityTrend(requestInfo: DashboardRequestModel, errorCallback: (error) => void): ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>> {
        return (dispatch: ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>>) => {
            dashboardService.fetchVlnerabilityTrend(requestInfo, dispatch).then(
                (response: ApiResponseModel<any>) => {
                    if (response && response.isSuccess) {
                        const high = [];
                        const low = [];
                        const medium = [];
                        const scanDates = [];
                        const vulnerabilityTrend = [];
                        response.data.sort((a, b) => Helper.sortingWithDate(a.scanDate, b.scanDate))
                            .map(x => {
                                scanDates.push(Helper.dateFormat(x.scanDate));
                                switch (x.severity) {
                                    case SeverityType.Low:
                                        return low.push(x.value);
                                    case SeverityType.High:
                                        return high.push(x.value);
                                    case SeverityType.Medium:
                                        return medium.push(x.value);
                                    default:
                                        return medium.push(x.value);
                                }
                            });
                        vulnerabilityTrend.push(scanDates, high, medium, low, requestInfo.vulnerabilityTrendPeriod);
                        dispatch({
                            type: DashboardActionType.FetchVulnerabilityTrend,
                            payload: {
                                vulnerabilityTrend: vulnerabilityTrend
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
     * action to set filters info
     * @param info
     */
    public static setFiltersInfo(info: DashboardRequestModel): ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>> {
        return (dispatch: ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>>) => {
            dispatch({
                type: DashboardActionType.SetFiltersInfo,
                payload: { filtersInfo: info }
            });
        };
    }

    /**
     * action to fetch Trend Period
     */
    public static fetchTrendPeriod() {
        return (dispatch: ThunkDispatch<DashboardState, IAppActionModel<DashboardState>, any>) => {
            dashboardService.getTrendPeriod().then((resp) => {
                dispatch({
                    type: DashboardActionType.FetchTrendPeriod,
                    payload: resp
                });
            });
        };
    }

    /**
     * action to set filter display state
     * @param info
     */
    public static setFilterState(show: boolean): ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>> {
        return (dispatch: ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>>) => {
            dispatch({
                type: DashboardActionType.SetFilterState,
                payload: { isFilterOpen: show }
            });
        };
    }


    /**
     * action to fetch projects list
     * @param requestInfo
     * @param errorCallback
     */
    public static fetchProjects(requestInfo: DashboardRequestModel, errorCallback: ErrorFn): ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>> {
        return (dispatch: ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>>) => {
            dashboardService.fetchProjects(requestInfo, dispatch).then(
                (response: ApiResponseModel<any>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: DashboardActionType.FetchProjects,
                            payload: {
                                projectList: response.data
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


    //#endregion public functions
}