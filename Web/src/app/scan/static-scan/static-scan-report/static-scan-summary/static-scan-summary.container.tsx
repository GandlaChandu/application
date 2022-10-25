//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { IAppActionModel, CoreActionCreator } from '../../../../core';
import { GlobalState, containerHelper } from '../../../../shared';

import { StaticScanSummaryDispatchPropModel } from './models';
import { StaticScanSummaryActionCreator, staticScanSummarySelector } from './static-scan-summary-store';
import { StaticScanSummaryComponent } from './static-scan-summary.component';
import { StaticScanReportState } from '../static-scan-report-store';

//#endregion application imports


/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state) {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            summary: (state) => staticScanSummarySelector.getStaticScanSummary(state),
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<StaticScanReportState>>): StaticScanSummaryDispatchPropModel {
    return {
        dispatchFetchStaticScanSummary: (scanId: number, errorCallback: (error?: any) => void) =>
            dispatch(StaticScanSummaryActionCreator.getStaticScanSummary(scanId, errorCallback)),
        dispatchError: () => dispatch(CoreActionCreator.setErrorAction({ isGlobalError: true }))
    };
}

export const StaticScanSummaryContainer = connect(mapStateToProps, mapDispatchToProps)(StaticScanSummaryComponent);
