//#region react imports

import { connect } from 'react-redux';
import { Selector, createStructuredSelector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { containerHelper, GlobalState, injectReducer } from '../../../shared';
import { IAppActionModel } from '../../../core';
import { Constant } from '../../../utilities';

import { UserState, userSelector, UserActionCreator, userReducer } from './user-store';
import { UserOwnPropModel, UserDispatchModel } from './models';
import { UserComponent } from './user.component';
import { UserModel } from '../models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state, ownprops): Selector<UserState, UserOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            user: (state) => userSelector.getUser(state),
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): UserDispatchModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),

        dispatchSetUser: (user: UserModel) => dispatch(UserActionCreator.setUser(user)),

        dispatchFetchAndSetUser: (id: number, errorCallback: (response) => void) =>
            dispatch(UserActionCreator.fetchAndSetUser(id, errorCallback)),

        dispatchSaveUser: (user: UserModel, successCallback: (response) => void, errorCallback: (response) => void) =>
            dispatch(UserActionCreator.saveUser(user, successCallback, errorCallback)),

    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(UserComponent);
export const UserContainer = injectReducer(Constant.reducerKey.userReducer, userReducer)(withConnect);