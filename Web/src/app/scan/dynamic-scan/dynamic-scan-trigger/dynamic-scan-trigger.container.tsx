//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { containerHelper, GlobalState, injectReducer } from '../../../shared';
import { IAppActionModel } from '../../../core';
import { Constant } from '../../../utilities';

import { ScanState, scanReducer } from '../../scan-store';

import { DynamicScanTriggerDispatchPropModel } from './models';
import { DynamicScanTriggerActionCreator } from './dynamic-scan-trigger-store';
import { DynamicScanTriggerComponent } from './dynamic-scan-trigger.component';

//#endregion application imports


/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state: any) {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<ScanState>>): DynamicScanTriggerDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchInitiateScan: (projectId: number, successCallback: (response: any) => void, errorCallback: (error: any) => void) =>
            dispatch(DynamicScanTriggerActionCreator.initiateScan(projectId, successCallback, errorCallback))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(DynamicScanTriggerComponent);
export const DynamicScanTriggerContainer = injectReducer(Constant.reducerKey.dynamicScanTriggerReducer, scanReducer)(withConnect);
