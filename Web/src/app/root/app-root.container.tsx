//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, ParametricSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { IAppActionModel, CoreActionCreator } from '../core';

import { containerHelper, GlobalState, PageState, pageSelector, SharedActionCreator, SuccessFn, ErrorFn } from '../shared';
import { AppRootComponent } from './app-root.component';
import { AppRootOwnPropModel, AppRootDispatchPropModel } from './models';
import { appRootSelector } from './app-root.selector';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state: GlobalState): ParametricSelector<GlobalState, AppRootOwnPropModel, any> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            showMenu: (state: GlobalState) => pageSelector.getMenuDisplayState(state),
            pageTitle: (state: GlobalState) => appRootSelector.getPageTitle(state),
            toasterInfo: (state: GlobalState) => pageSelector.getToasterState(state),
            alertInfo: (state: GlobalState) => pageSelector.getAlertState(state),
            isAutheticated: (state: GlobalState) => appRootSelector.getAuthenticatedUser(state),
            isSSORedirect: (state: GlobalState) => appRootSelector.getSSORedirectState(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<PageState, IAppActionModel<PageState>, any>): AppRootDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchAuthenticatedUser: (isAuthenticated: boolean) =>
            dispatch(CoreActionCreator.setAuthenticatedUser(isAuthenticated)),
        dispatchSSORedirectState: (isSSORedirected: boolean) =>
            dispatch(CoreActionCreator.setSSORedirectState(isSSORedirected)),
        dispatchFetchLoggedInUserInfo: (sucessCallback: SuccessFn, errorCallback: ErrorFn) =>
            dispatch(SharedActionCreator.fetchLoggedInUserInfo(sucessCallback, errorCallback)),
    }
}

export const AppRootContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppRootComponent);