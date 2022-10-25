//#region react imports

import { connect } from 'react-redux';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../core';
import { containerHelper, GlobalState } from '../../shared';

import { ScanSummaryOwnPropModel, ScanSummaryDispatchPropModel } from './models';
import { ScanSummaryComponent } from './scan-summary.component';
import { DashboardState, DashboardActionCreator, dashboardSelector } from '../dashboard-store';
import { DashboardRequestModel } from '../models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state, ownprops: ScanSummaryOwnPropModel): Selector<any, ScanSummaryOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            scanSummary: (state) => dashboardSelector.getScanSummary(state, ownprops),
            lastScannedOn: (state) => dashboardSelector.getLastScannedOn(state, ownprops),
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<DashboardState>>): ScanSummaryDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchScanSummary: (requestInfo: DashboardRequestModel, errorCallback: (error) => void) =>
            dispatch(DashboardActionCreator.fetchScanSummary(requestInfo, errorCallback)),
        dispatchFetchLastScannedOn: (requestInfo: DashboardRequestModel, errorCallback: (error) => void) =>
            dispatch(DashboardActionCreator.fetchLastScannedOn(requestInfo, errorCallback)),
    };
}

export const ScanSummaryContainer = connect(mapStateToProps, mapDispatchToProps)(ScanSummaryComponent);
