//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { containerHelper, GlobalState, injectReducer } from '../../../shared';
import { IAppActionModel } from '../../../core';
import { Constant } from '../../../utilities';

import { DynamicScanPolicyState, dynamicScanPolicySelector, dynamicScanPolicyReducer, DynamicScanPolicyActionCreator } from './dynamic-scan-policy-store';
import { DynamicScanPolicyDispatchPropModel } from './models';
import { DynamicScanPolicyComponent } from './dynamic-scan-policy.component';
import { DynamicScanPolicyModel } from '../models';
import { DynamicScanPolicyConfigActionCreator } from '../dynamic-scan-policy-config-store';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, DynamicScanPolicyState> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            dynamicScanPolicyInfo: (state) => dynamicScanPolicySelector.getDynamicScanRuleInfo(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): DynamicScanPolicyDispatchPropModel {

    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchSetPolicyInfo: (scanPolicy: DynamicScanPolicyModel) => dispatch(DynamicScanPolicyActionCreator.setSelectedPolicyInfo(scanPolicy)),

        dispatchFetchPolicyInfo: (scanPolicyId: number, successCallback: (response) => void, errorCallback: (error?: any) => void) =>
            dispatch(DynamicScanPolicyActionCreator.fetchSelectedPolicyInfo(scanPolicyId, successCallback, errorCallback)),

        dispatchFetchAttackStrengthTypes: (errorCallback: (error?: any) => void) =>
            dispatch(DynamicScanPolicyConfigActionCreator.fetchAttackStrengthTypes(errorCallback)),

        dispatchFetchAlertShresholdTypes: (errorCallback: (error?: any) => void) =>
            dispatch(DynamicScanPolicyConfigActionCreator.fetchAlertThresholdTypes(errorCallback)),

        dispatchSaveDynamicScanRules: (dynamicScanRulesRequest: DynamicScanPolicyModel, successCallback: (response) => void, errorCallback: (error) => void) =>
            dispatch(DynamicScanPolicyActionCreator.saveDynamicScanPolicyInfo(dynamicScanRulesRequest, successCallback, errorCallback))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(DynamicScanPolicyComponent);
export const DynamicScanPolicyContainer = injectReducer(Constant.reducerKey.dynamicScanPolicyReducer, dynamicScanPolicyReducer)(withConnect);
