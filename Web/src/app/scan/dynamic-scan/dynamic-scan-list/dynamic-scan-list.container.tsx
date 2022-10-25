//#region react imports

import { connect } from 'react-redux';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../core';
import { containerHelper, GlobalState, injectReducer, PageRequestModel, SuccessFn, ErrorFn } from '../../../shared';
import { Constant } from '../../../utilities';

import { DynamicScanListComponent } from './dynamic-scan-list.component';
import { dynamicScanListSelector, DynamicScanListState, DynamicScanListActionCreator, dynamicScanListReducer } from './dynamic-scan-list-store';
import { DynamicScanListDispatchPropModel, DynamicScanListOwnPropModel } from './models';
import { DynamicScanTriggerActionCreator } from '../dynamic-scan-trigger/dynamic-scan-trigger-store';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<DynamicScanListState, DynamicScanListOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            gridResultData: (state) => dynamicScanListSelector.getDynamicScanResults(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<DynamicScanListState>>): DynamicScanListDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchDynamicResults: (pageRequest: PageRequestModel, errorCallback: ErrorFn) =>
            dispatch(DynamicScanListActionCreator.fetchDynamicScanResults(pageRequest, errorCallback)),
        dispatchInitiateScan: (projectId: number, successCallback: SuccessFn, errorCallback: ErrorFn) =>
            dispatch(DynamicScanTriggerActionCreator.initiateScan(projectId, successCallback, errorCallback))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(DynamicScanListComponent);
export const DynamicScanListContainer = injectReducer(Constant.reducerKey.dynamicScanListReducer, dynamicScanListReducer)(withConnect);
