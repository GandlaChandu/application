//#region react imports

import { connect } from 'react-redux';
import { reduxForm, FormAction } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { GlobalState, formlistContainerHelper } from '../../../../shared';
import { IAppActionModel } from '../../../../core';
import { Constant } from '../../../../utilities';

import { DynamicScannerManagerComponent } from './dynamic-scanner-manager.component';
import { DynamicScannerManagerDispatchPropModel, DynamicScannerManagerOwnPropModel } from './models';
import { DynamicScannerManagerConstant } from './dynamic-scanner-manager.constant';
import { dynamicPolicyCategorySelector, DynamicPolicyCategoryActionCreator } from '../dynamic-policy-category-store';
import { DynamicPolicyScannerRequestModel, DynamicScannerModel, DynamicCategoryModel } from '../../models';
import { dynamicPolicyConfigSelector } from '../../dynamic-scan-policy-config-store';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, DynamicScannerManagerOwnPropModel> {
    return createStructuredSelector(
        {
            ...formlistContainerHelper().mapStateToPropsBase(state, Constant.reducerKey.dynamicPolicyCategoryReducer, DynamicScannerManagerConstant.form),
            alertThresholdTypes: (state) => dynamicPolicyConfigSelector.getAlertThresholTypes(state, { namespace: Constant.reducerKey.dynamicPolicyCategoryReducer }),
            attackStrengthTypes: (state) => dynamicPolicyConfigSelector.getAttackStrengthTypes(state, { namespace: Constant.reducerKey.dynamicPolicyCategoryReducer }),
            dynamicCategoryInfo: (state) => dynamicPolicyCategorySelector.getPolicyCategoryInfo(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState> | FormAction>): DynamicScannerManagerDispatchPropModel {
    return {
        ...formlistContainerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchPolicyScannerlist: (pageRequest: DynamicPolicyScannerRequestModel, errorCallback: (error?: any) => void) =>
            dispatch(DynamicPolicyCategoryActionCreator.fetchScannerlList(pageRequest, errorCallback)),
        dispatchUpdateScanner: (category: DynamicCategoryModel, scannerInfo: DynamicScannerModel, successCallback: (response) => void, errorCallback: (response) => void) =>
            dispatch(DynamicPolicyCategoryActionCreator.updateScannerInfo(category, scannerInfo, successCallback, errorCallback)),


    };
}

const DynamicScannerManagerReduxForm = reduxForm<any, any>({
    form: DynamicScannerManagerConstant.form,
    enableReinitialize: true
})(DynamicScannerManagerComponent);

export const DynamicScannerManagerForm = connect(mapStateToProps, mapDispatchToProps)(DynamicScannerManagerReduxForm);