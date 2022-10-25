//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../core';
import { containerHelper } from '../../../shared';

import { DynamicPolicySectionComponent } from './dynamic-policy-section.component';
import { DynamicPolicySectionState, dynamicPolicySectionSelector, DynamicPolicySectionActionCreator } from './dynamic-policy-section-store';
import { DynamicPolicySectionDispatchModel, DynamicPolicySectionOwnPropModel } from './models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state, ownProps): Selector<any, DynamicPolicySectionOwnPropModel> {
    return createStructuredSelector(
        {
            scanPolicies: (state) => dynamicPolicySectionSelector.getScanPolicies(state, ownProps),
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<DynamicPolicySectionState, any, IAppActionModel<DynamicPolicySectionState>>): DynamicPolicySectionDispatchModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchScanPolicies: (errorCallback: (error?: any) => void) => dispatch(DynamicPolicySectionActionCreator.fetchScanPolicies(errorCallback)),
    };
}

export const DynamicPolicySectionContainer = connect(mapStateToProps, mapDispatchToProps)(DynamicPolicySectionComponent);