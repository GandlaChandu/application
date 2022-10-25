//#region react imports

import { connect } from 'react-redux';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../core';
import { containerHelper, GlobalState } from '../../shared';

import { RecentScanComponent } from './recent-scan.component';
import { DashboardActionCreator, dashboardSelector } from '../dashboard-store';
import { RecentScanDispatchPropModel, RecentScanOwnPropModel } from './models';
import { DashboardRequestModel } from '../models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state: any, ownprops: RecentScanOwnPropModel): Selector<any, RecentScanOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            recentScans: (state) => dashboardSelector.getRecentScans(state, ownprops),
            gridResultData: (state) => dashboardSelector.getRecentScansGrid(state, ownprops)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<any>>): RecentScanDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchRecentScans: (recentScanRequest: DashboardRequestModel, errorCallback: (error) => void) =>
            dispatch(DashboardActionCreator.fetchRecentScans(recentScanRequest, errorCallback))
    };
}

export const RecentScanContainer = connect(mapStateToProps, mapDispatchToProps)(RecentScanComponent);
