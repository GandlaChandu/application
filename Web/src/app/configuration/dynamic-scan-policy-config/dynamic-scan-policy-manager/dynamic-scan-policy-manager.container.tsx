//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../core';
import { containerHelper, injectReducer, PageRequestModel } from '../../../shared';
import { Constant } from '../../../utilities';

import { DynamicScanPolicyManagerState, DynamicScanPolicyManagerActionCreator } from './dynamic-scan-policy-manager-store';
import { DynamicScanPolicyManagerDispatchPropModel } from './models';
import { dynamicPolicyManagerSelector, dynamicPolicyManagerReducer } from './dynamic-scan-policy-manager-store';
import { DynamicScanPolicyManagerComponent } from './dynamic-scan-policy-manager.component';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, DynamicScanPolicyManagerState> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            gridResultData: (state) => dynamicPolicyManagerSelector.getDynamicScanRules(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<DynamicScanPolicyManagerState, any, IAppActionModel<DynamicScanPolicyManagerState>>): DynamicScanPolicyManagerDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchDynamicScanRules: (pageRequest: PageRequestModel, errorCallback: (error?: any) => void) =>
            dispatch(DynamicScanPolicyManagerActionCreator.fetchDynamicScanRules(pageRequest, errorCallback))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(DynamicScanPolicyManagerComponent);
export const DynamicScanPolicyManagerContainer = injectReducer(Constant.reducerKey.dynamicScanRuleManagerReducer, dynamicPolicyManagerReducer)(withConnect);