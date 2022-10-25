//#region react imports

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { GlobalState, PageActionCreator, PageState, pageSelector, containerHelper } from '../../shared';
import { IAppActionModel, CoreActionCreator } from '../../core';

import { appHeaderSelector } from '../app-header/app-header.selector';
import { AppHeaderComponent } from './app-header.component';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state: GlobalState) {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            showMenu: (state: GlobalState) => pageSelector.getMenuDisplayState(state),
            showUserIconDropdown: (state: GlobalState) => pageSelector.getDropdownDisplayState(state),
            loggedInUserInfo: (state: GlobalState) => appHeaderSelector.getLoggedInUserInfo(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<PageState, IAppActionModel<PageState>, any>) {
    return {
        toggleMenu: (show: boolean) => dispatch(PageActionCreator.toggleMenuAction(show)),
        toggleIconDropdown: (showUserIconDropdown: boolean) => dispatch(PageActionCreator.toggleIconDropdownAction(showUserIconDropdown)),
        dispatchClearError: () => dispatch(CoreActionCreator.clearErrorAction()),

    };
}

export const AppHeaderContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AppHeaderComponent));