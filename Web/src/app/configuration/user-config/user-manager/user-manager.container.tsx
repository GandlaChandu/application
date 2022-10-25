//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../utilities';
import { IAppActionModel } from '../../../core';
import { containerHelper, injectReducer, PageRequestModel } from '../../../shared';

import { UserManagerComponent } from './user-manager.component';
import { UserManagerState, userManagerSelector, UserManagerActionCreator, userManagerReducer } from './user-manager-store';
import { UserManagerDispatchModel } from './models/user-manager-dispatch.model';
import { UserManagerPropModel } from './models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, UserManagerPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            gridResultData: (state) => userManagerSelector.getUsers(state),
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<UserManagerState, any, IAppActionModel<UserManagerState>>): UserManagerDispatchModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchUsers: (pageRequest: PageRequestModel, errorCallback: (error) => void) =>
            dispatch(UserManagerActionCreator.fetchUsers(pageRequest, errorCallback))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(UserManagerComponent);
export const UserManagerContainer = injectReducer(Constant.reducerKey.userManagerReducer, userManagerReducer)(withConnect);