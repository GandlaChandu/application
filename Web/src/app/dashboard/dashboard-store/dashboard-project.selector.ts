//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application 

import { Constant } from '../../utilities';

import { DashboardState } from '../dashboard-store';

//#endregion application imports


class DashboardProjectSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets recent scans
     * @param state
     */
    public getRecentScans(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dashboardProjectReducer] ?
                (state[Constant.reducerKey.dashboardProjectReducer] as DashboardState).recentScans : [],
            (recentScans) => recentScans
        );
        return selector(state);
    }

    /**
     * gets scan summary
     * @param state
     */
    public getScanSummary(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dashboardProjectReducer] ?
                (state[Constant.reducerKey.dashboardProjectReducer] as DashboardState).scanSummary : {},
            (scanSummary) => scanSummary
        );
        return selector(state);
    }

    /**
     * gets vulnerablity by severity
     * @param state
     */
    public getVulnerabilitiesBySeverity(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dashboardProjectReducer] ?
                (state[Constant.reducerKey.dashboardProjectReducer] as DashboardState).vulnerabilitiesBySeverity : [],
            (vulnerabilitiesBySeverity) => vulnerabilitiesBySeverity
        );
        return selector(state);
    }

    /**
     * gets last scanned date
     * @param state
     */
    public getLastScannedOn(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dashboardProjectReducer] ?
                (state[Constant.reducerKey.dashboardProjectReducer] as DashboardState).lastScannedOn : null,
            (lastScannedOn) => lastScannedOn
        );
        return selector(state);
    }

    /**
     * gets top 10 vulnerability types
     * @param state
     */
    public getTopVulnerabilityTypes(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dashboardProjectReducer] ?
                (state[Constant.reducerKey.dashboardProjectReducer] as DashboardState).topVulnerabilityTypes : [],
            (topVulnerabilityTypes) => topVulnerabilityTypes
        );
        return selector(state);
    }

    /**
     * gets vulnerability trend
     * @param state
     */
    public getVulnerabilityTrend(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dashboardProjectReducer] ?
                (state[Constant.reducerKey.dashboardProjectReducer] as DashboardState).vulnerabilityTrend : [],
            (vulnerabilityTrend) => vulnerabilityTrend
        );
        return selector(state);
    }

    /**
     * set's flters form data
     * @param state
     */
    public getFiltersInfo(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dashboardProjectReducer] ?
                (state[Constant.reducerKey.dashboardProjectReducer] as DashboardState).filtersInfo : {},
            (filtersInfo) => filtersInfo
        );
        return selector(state);
    }

    /**
     * gets Trend Period
     * @param state
     */
    public getTrendPeriod(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dashboardProjectReducer] ?
                (state[Constant.reducerKey.dashboardProjectReducer] as DashboardState).trendPeriod : [],
            (trendPeriod) => trendPeriod
        );
        return selector(state);
    }

    /**
     * gets initial form values
     * @param state
     */
    public getInitialValues(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dashboardProjectReducer] ?
                {
                    vulnerabilityTrendPeriod: (state[Constant.reducerKey.dashboardProjectReducer] as DashboardState).vulnerabilityTrend ?
                        (state[Constant.reducerKey.dashboardProjectReducer] as DashboardState).vulnerabilityTrend[4] : 30
                } :
                {},
            (trendPeriod) => trendPeriod
        );
        return selector(state);
    }

    /**
     * set's flters display state
     * @param state
     */
    public getFilterState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dashboardProjectReducer] ?
                (state[Constant.reducerKey.dashboardProjectReducer] as DashboardState).isFilterOpen : false,
            (isFilterOpen) => isFilterOpen
        );
        return selector(state);
    }

    /**
     * gets scan types
     * @param state
     */
    public getScanTypes(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dashboardProjectReducer] ?
                (state[Constant.reducerKey.dashboardProjectReducer] as DashboardState).scanTypes : [],
            (isFilterOpen) => isFilterOpen
        );
        return selector(state);
    }

    //#endregion public functions

}

export const dashboardProjectSelector = new DashboardProjectSelector();

