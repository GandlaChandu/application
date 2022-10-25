//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { IAppActionModel, CoreActionCreator, ErrorInfoModel } from '../../core';

import { containerHelper, GlobalState, PageState } from '../../shared';
import { PrivateRouteComponent } from './private-route.component';
import { PrivateRouteOwnPropModel } from './models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state: GlobalState): Selector<GlobalState, PrivateRouteOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            userProfile: (state) => state.coreState?.userProfile
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<PageState, IAppActionModel<PageState>, any>) {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchSetErrorStatusCode: (error: ErrorInfoModel) => dispatch(CoreActionCreator.setErrorAction(error))
    }
}

export const PrivateRouteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRouteComponent);