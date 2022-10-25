//#region react imports

import { connect } from 'react-redux';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';
import { reduxForm } from 'redux-form';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../core';
import { containerHelper, GlobalState, injectReducer } from '../../shared';
import { Constant } from '../../utilities';

import { ProjectDashboardComponent } from './project-dashboard.component';
import { DashboardState, dashboardReducer, DashboardActionCreator, dashboardProjectSelector } from '../dashboard-store';
import { DashboardDispatchPropModel, DashboardOwnPropModel, DashboardRequestModel } from '../models';
import { DashboardConstant } from '../dashboard.constant';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<DashboardState, DashboardOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            topVulnerabilityTypes: (state) => dashboardProjectSelector.getTopVulnerabilityTypes(state),
            vulnerabilityTrend: (state) => dashboardProjectSelector.getVulnerabilityTrend(state),
            trendPeriod: (state) => dashboardProjectSelector.getTrendPeriod(state),
            filtersInfo: (state) => dashboardProjectSelector.getFiltersInfo(state),
            initialValues: (state) => dashboardProjectSelector.getInitialValues(state),
            isFilterOpen: (state) => dashboardProjectSelector.getFilterState(state),
            scanTypes: (state) => dashboardProjectSelector.getScanTypes(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<DashboardState>>): DashboardDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchVulnerabilityBySeverity: (requestInfo: DashboardRequestModel, errorCallback: (error) => void) =>
            dispatch(DashboardActionCreator.fetchVulnerabilitiesBySeverity(requestInfo, errorCallback)),
        dispatchFetchScanSummary: (requestInfo: DashboardRequestModel, errorCallback: (error) => void) =>
            dispatch(DashboardActionCreator.fetchScanSummary(requestInfo, errorCallback)),
        dispatchFetchLastScannedOn: (requestInfo: DashboardRequestModel, errorCallback: (error) => void) =>
            dispatch(DashboardActionCreator.fetchLastScannedOn(requestInfo, errorCallback)),
        dispatchFetchRecentScans: (recentScanRequest: DashboardRequestModel, errorCallback: (error) => void) =>
            dispatch(DashboardActionCreator.fetchRecentScans(recentScanRequest, errorCallback)),
        dispatchFetchTopVulnerabilityTypes: (requestInfo: DashboardRequestModel, errorCallback: (error) => void) =>
            dispatch(DashboardActionCreator.fetchTopVulnerabilityTypes(requestInfo, errorCallback)),
        dispatchFetchVulnerabilityTrend: (requestInfo: DashboardRequestModel, errorCallback: (error) => void) =>
            dispatch(DashboardActionCreator.fetchVulnerabilityTrend(requestInfo, errorCallback)),
        dispatchSetFiltersInfo: (info: DashboardRequestModel) =>
            dispatch(DashboardActionCreator.setFiltersInfo(info)),
        dispatchFetchTrendPeriod: () => dispatch(DashboardActionCreator.fetchTrendPeriod()),
        dispatchSetFilterState: (show?: boolean) => dispatch(DashboardActionCreator.setFilterState(show))
    };
}

const DashboardReduxform = reduxForm<any, any>({
    form: DashboardConstant.form,
    enableReinitialize: true,
})(ProjectDashboardComponent)

const withConnect = connect(mapStateToProps, mapDispatchToProps)(DashboardReduxform);
export const ProjectDashboardContainer = injectReducer(Constant.reducerKey.dashboardProjectReducer, dashboardReducer)(withConnect);
