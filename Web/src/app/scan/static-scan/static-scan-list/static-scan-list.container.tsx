//#region react imports

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../core';
import { containerHelper, GlobalState, injectReducer, PageRequestModel, SuccessFn, ErrorFn } from '../../../shared';
import { Constant } from '../../../utilities';

import { StaticScanListComponent } from './static-scan-list.component';
import { staticScanListSelector, StaticScanListState, StaticScanListActionCreator, staticScanListReducer } from './static-scan-list-store';
import { StaticScanListDispatchPropModel } from './models';
import { StaticScanTriggerActionCreator } from '../static-scan-trigger/static-scan-trigger-store';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state) {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            gridResultData: (state) => staticScanListSelector.getStaticScanResults(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<StaticScanListState>>): StaticScanListDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchStaticResults: (pageRequest: PageRequestModel, errorCallback: ErrorFn) =>
            dispatch(StaticScanListActionCreator.fetchStaticScanResults(pageRequest, errorCallback)),
        dispatchInitiateScan: (projectId: number, successCallback: SuccessFn, errorCallback: ErrorFn) =>
            dispatch(StaticScanTriggerActionCreator.initiateScan(projectId, successCallback, errorCallback))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(StaticScanListComponent);
export const StaticScanListContainer = injectReducer(Constant.reducerKey.staticScanListReducer, staticScanListReducer)(withConnect);
