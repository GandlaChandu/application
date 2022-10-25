//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { containerHelper, GlobalState } from '../../../../shared';
import { IAppActionModel } from '../../../../core';
import { Constant } from '../../../../utilities';

import { dynamicScanPolicySelector, DynamicScanPolicyActionCreator } from '../dynamic-scan-policy-store';

import { DynamicPolicyCategoryDispatchPropModel } from './models';
import { DynamicPolicyCategoryManagerComponent } from './dynamic-policy-category-manager.component';
import { dynamicPolicyConfigSelector } from '../../dynamic-scan-policy-config-store';
import { DynamicPolicyCategoryOwnPropModel } from '../../dynamic-policy-category/models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, DynamicPolicyCategoryOwnPropModel | any> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            gridResultData: (state) => dynamicScanPolicySelector.getDynamicScanPoliciesInfo(state),
            attackStrengthTypes: (state) => dynamicPolicyConfigSelector.getAttackStrengthTypes(state, { namespace: Constant.reducerKey.dynamicScanPolicyReducer }),
            alertThresholTypes: (state) => dynamicPolicyConfigSelector.getAlertThresholTypes(state, { namespace: Constant.reducerKey.dynamicScanPolicyReducer }),
            dynamicScanPolicyInfo: (state) => dynamicScanPolicySelector.getDynamicScanRuleInfo(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): DynamicPolicyCategoryDispatchPropModel {

    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchDynamicScanPolicies: (scanPolicyCode: string, errorCallback: (error?: any) => void) => dispatch(DynamicScanPolicyActionCreator.fetchPolicyCategoriesInfo(scanPolicyCode, errorCallback)),
    };
}

export const DynamicPolicyCategoryManagerContainer = connect(mapStateToProps, mapDispatchToProps)(DynamicPolicyCategoryManagerComponent);
