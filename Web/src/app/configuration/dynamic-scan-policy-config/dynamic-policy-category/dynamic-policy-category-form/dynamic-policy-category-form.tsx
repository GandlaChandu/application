//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { GlobalState, containerHelper } from '../../../../shared';
import { IAppActionModel } from '../../../../core';
import { Constant } from '../../../../utilities';

import { DynamicScanPolicyModel } from '../../models';
import { dynamicPolicyCategorySelector, DynamicPolicyCategoryActionCreator } from '../dynamic-policy-category-store';
import { DynamicPolicyCategoryFormConstant } from './dynamic-policy-category-form.constant';
import { DynamicPolicyCategoryFormComponent } from './dynamic-policy-category-form.component';
import { dynamicPolicyConfigSelector } from '../../dynamic-scan-policy-config-store';
import { DynamicPolicyCategoryFormOwnPropModel, DynamicPolicyCategoryFormDispatchPropModel } from './models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, DynamicPolicyCategoryFormOwnPropModel> {
    return createStructuredSelector(
        {
            alertThresholdTypes: (state) => dynamicPolicyConfigSelector.getAlertThresholTypes(state, { namespace: Constant.reducerKey.dynamicPolicyCategoryReducer}),
            attackStrengthTypes: (state) => dynamicPolicyConfigSelector.getAttackStrengthTypes(state, { namespace: Constant.reducerKey.dynamicPolicyCategoryReducer}),
            initialValues: (state) => dynamicPolicyCategorySelector.getPolicyCategoryInfo(state),
            dynamicCategoryInfo: (state) => dynamicPolicyCategorySelector.getPolicyCategoryInfo(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): DynamicPolicyCategoryFormDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchUpdatePolicyStrengthThreshold: (updatePolicyInfo: DynamicScanPolicyModel, successCallback: (response) => void, errorCallback: (response) => void) =>
            dispatch(DynamicPolicyCategoryActionCreator.updatePloicyStrengthThreshold(updatePolicyInfo, successCallback, errorCallback))
    };
}

const DynamicScanPolicyReduxform = reduxForm<any, any>({
    form: DynamicPolicyCategoryFormConstant.form,
    enableReinitialize: true,
})(DynamicPolicyCategoryFormComponent)

export const DynamicPolicyCategoryForm = connect(mapStateToProps, mapDispatchToProps)(DynamicScanPolicyReduxform)