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

import { dynamicScanPolicySelector } from '../dynamic-scan-policy-store';
import { DynamicScanPolicyFormConstant } from './dynamic-scan-policy-form.constant';
import { DynamicScanPolicyFormComponent } from './dynamic-scan-policy-form.component';
import { DynamicScanPolicyFormOwnPropModel } from './models/dynamic-scan-policy-form-own-prop.model';
import { DynamicScanPolicyFormDispatchPropModel } from './models/dynamic-scan-policy-form-dispatch-prop.model';
import { dynamicPolicyConfigSelector } from '../../dynamic-scan-policy-config-store';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, DynamicScanPolicyFormOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            alertThresholdTypes: (state) => dynamicPolicyConfigSelector.getAlertThresholTypes(state, { namespace: Constant.reducerKey.dynamicScanPolicyReducer }),
            attackStrengthTypes: (state) => dynamicPolicyConfigSelector.getAttackStrengthTypes(state, { namespace: Constant.reducerKey.dynamicScanPolicyReducer }),
            initialValues: (state) => dynamicScanPolicySelector.getDynamicScanRuleInfo(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): DynamicScanPolicyFormDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
    };
}

const DynamicScanPolicyReduxform = reduxForm<any, any>({
    form: DynamicScanPolicyFormConstant.form,
    enableReinitialize: true,
})(DynamicScanPolicyFormComponent)

export const DynamicScanPolicyForm = connect(mapStateToProps, mapDispatchToProps)(DynamicScanPolicyReduxform)