//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../core';
import { containerHelper, injectReducer, PageRequestModel } from '../../../shared';
import { Constant } from '../../../utilities';

import { QualityProfileManagerState, qualityProfileManagerSelector, QualityProfileManagerActionCreator, qualityProfileManagerReducer } from './quality-profile-manager-store';
import { QualityProfileManagerPropModel, QualityProfileManagerDispatchPropModel } from './models';
import { QualityProfileManagerComponent } from './quality-profile-manager.component';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<QualityProfileManagerState, QualityProfileManagerPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            gridResultData: (state) => qualityProfileManagerSelector.getQualityProfiles(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<QualityProfileManagerState, any, IAppActionModel<QualityProfileManagerState>>): QualityProfileManagerDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchStaticScanRules: (pageRequest: PageRequestModel, errorCallback: (error?: any) => void) =>
            dispatch(QualityProfileManagerActionCreator.fetchStaticScanRules(pageRequest, errorCallback))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(QualityProfileManagerComponent);
export const QualityProfileManagerContainer = injectReducer(Constant.reducerKey.staticProfileManagerReducer, qualityProfileManagerReducer)(withConnect);