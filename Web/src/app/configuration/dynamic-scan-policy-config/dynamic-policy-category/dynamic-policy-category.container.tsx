//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../core';
import { containerHelper, GlobalState, injectReducer } from '../../../shared';
import { Constant } from '../../../utilities';

import { DynamicScanPolicyModel } from '../models';
import { DynamicPolicyCategoryActionCreator, DynamicPolicyCategoryReducer, dynamicPolicyCategorySelector } from './dynamic-policy-category-store';
import { DynamicPolicyCategoryDispatchPropModel, DynamicPolicyCategoryOwnPropModel } from './models';
import { DynamicPolicyCategoryComponent } from './dynamic-policy-category.component';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, DynamicPolicyCategoryOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            dynamicCategoryInfo: (state) => dynamicPolicyCategorySelector.getPolicyCategoryInfo(state)
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
        dispatchSetCategoryInfo: (categoryData: DynamicScanPolicyModel) => dispatch(DynamicPolicyCategoryActionCreator.setPolicyCategoryInfo(categoryData)),
        dispatchFetchAttackStrengthTypes: (errorCallback: (error?: any) => void) => dispatch(DynamicPolicyCategoryActionCreator.fetchAttackStrengthTypes(errorCallback)),
        dispatchFetchAlertShresholdTypes: (errorCallback: (error?: any) => void) => dispatch(DynamicPolicyCategoryActionCreator.fetchAlertThresholdTypes(errorCallback)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(DynamicPolicyCategoryComponent);
export const DynamicPolicyCategoryContainer = injectReducer(Constant.reducerKey.dynamicPolicyCategoryReducer, DynamicPolicyCategoryReducer)(withConnect);