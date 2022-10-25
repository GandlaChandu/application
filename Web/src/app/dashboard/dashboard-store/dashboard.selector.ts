//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application 

import { Constant } from '../../utilities';

import { DashboardState } from '../dashboard-store';
import { PagedResult } from '../../shared';
import { ProjectListSectionModel } from '../project-list-section/models';
import { RecentScanModel } from '../recent-scans/models';

//#endregion application imports


class DashboardSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets recent scans
     * @param state
     * @param ownprops
     */
    public getRecentScans(state: any, ownprops: any) {
        let selector = createSelector(
            (state: any) => state[ownprops.namespace] ?
                (state[ownprops.namespace] as DashboardState).recentScans : [],
            (recentScans) => recentScans
        );
        return selector(state);
    }

    /**
     * gets recent scans for grid
     * @param state
     * @param ownprops
     */
    public getRecentScansGrid(state: any, ownprops: any) {
        let selector = createSelector(
            (state: any) => state[ownprops.namespace] && (state[ownprops.namespace] as DashboardState).recentScans ?
                {
                    items: (state[ownprops.namespace] as DashboardState).recentScans,
                    total: (state[ownprops.namespace] as DashboardState).recentScans.length
                } : new PagedResult<RecentScanModel>(),
            (recentScans) => recentScans
        );
        return selector(state);
    }

    /**
     * gets scan summary
     * @param state
     * @param ownprops
     */
    public getScanSummary(state: any, ownprops: any) {
        let selector = createSelector(
            (state: any) => state[ownprops.namespace] ?
                (state[ownprops.namespace] as DashboardState).scanSummary : {},
            (scanSummary) => scanSummary
        );
        return selector(state);
    }

    /**
     * gets vulnerablity by severity
     * @param state
     * @param ownprops
     */
    public getVulnerabilitiesBySeverity(state: any, ownprops: any) {
        let selector = createSelector(
            (state: any) => state[ownprops.namespace] ?
                (state[ownprops.namespace] as DashboardState).vulnerabilitiesBySeverity : [],
            (vulnerabilitiesBySeverity) => vulnerabilitiesBySeverity
        );
        return selector(state);
    }

    /**
     * gets last scanned date
     * @param state
     * @param ownprops
     */
    public getLastScannedOn(state: any, ownprops: any) {
        let selector = createSelector(
            (state: any) => state[ownprops.namespace] ?
                (state[ownprops.namespace] as DashboardState).lastScannedOn : null,
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
            (state: any) => state[Constant.reducerKey.dashboardReducer] ?
                (state[Constant.reducerKey.dashboardReducer] as DashboardState).topVulnerabilityTypes : [],
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
            (state: any) => state[Constant.reducerKey.dashboardReducer] ?
                (state[Constant.reducerKey.dashboardReducer] as DashboardState).vulnerabilityTrend : [],
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
            (state: any) => state[Constant.reducerKey.dashboardReducer] ?
                (state[Constant.reducerKey.dashboardReducer] as DashboardState).filtersInfo : {},
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
            (state: any) => state[Constant.reducerKey.dashboardReducer] ?
                (state[Constant.reducerKey.dashboardReducer] as DashboardState).trendPeriod : [],
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
            (state: any) => state[Constant.reducerKey.dashboardReducer] ?
                {
                    vulnerabilityTrendPeriod: (state[Constant.reducerKey.dashboardReducer] as DashboardState).vulnerabilityTrend ?
                        (state[Constant.reducerKey.dashboardReducer] as DashboardState).vulnerabilityTrend[4] : 30
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
            (state: any) => state[Constant.reducerKey.dashboardReducer] ?
                (state[Constant.reducerKey.dashboardReducer] as DashboardState).isFilterOpen : false,
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
            (state: any) => state[Constant.reducerKey.dashboardReducer] ?
                (state[Constant.reducerKey.dashboardReducer] as DashboardState).scanTypes : [],
            (isFilterOpen) => isFilterOpen
        );
        return selector(state);
    }

    /**
     * gets projects
     * @param state
     */
    public getProjects(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dashboardReducer] ?
                (state[Constant.reducerKey.dashboardReducer] as DashboardState).projectList : new PagedResult<ProjectListSectionModel>(),
            (projectList) => projectList
        );
        return selector(state);
    }

    //#endregion public functions

}

export const dashboardSelector = new DashboardSelector();

