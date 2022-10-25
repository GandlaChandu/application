//#region react imports

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { GlobalState, containerHelper, ErrorFn, SuccessFn, PermissionActionCreator, UserRoleRequestModel, PermissionRoleModel } from '../../../shared';
import { IAppActionModel } from '../../../core';

import { UserMapSectionComponent } from './user-map-section.component';
import { UserMapSectionOwnPropModel, UserMapSectionDispatchPropModel, UserMapRequestModel, UserMapPageRequestModel } from './models';
import { userMapSelector, UserMapSectionActionCreator } from './user-map-section-store';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state, ownprops: UserMapSectionOwnPropModel) {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            assignedUsers: (state, ownprops: UserMapSectionOwnPropModel) => userMapSelector.getAssignedUsers(state, ownprops),
            gridResultData: (state, ownprops: UserMapSectionOwnPropModel) => userMapSelector.getAssignedUsers(state, ownprops),
            showUserTab: (state, ownprops: UserMapSectionOwnPropModel) => userMapSelector.getUserTabState(state, ownprops),
            showPermissionPopup: (state) => userMapSelector.getPopupState(state, ownprops)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): UserMapSectionDispatchPropModel {
    return {

        ...containerHelper().mapDispatchToPropsBase(dispatch),

        dispatchFetchEntityUsers: (pageRequest: UserMapPageRequestModel, errorCallback: ErrorFn) =>
            dispatch(UserMapSectionActionCreator.fetchEntityUsers(pageRequest, errorCallback)),

        dispatchSaveUser: (request: UserMapRequestModel, successCallback: SuccessFn, errorCallback: ErrorFn) =>
            dispatch(UserMapSectionActionCreator.saveUserMap(request, successCallback, errorCallback)),

        dispatchRemoveUser: (id: number, successCallback: SuccessFn, errorCallback: ErrorFn) =>
            dispatch(UserMapSectionActionCreator.removeUserMap(id, successCallback, errorCallback)),

        dispatchShowPopup: (show: boolean) =>
            dispatch(UserMapSectionActionCreator.setShowPopup(show)),

        dispatchFetchPermissions: () =>
            dispatch(PermissionActionCreator.fetchPermissionNodes()),

        dispatchSelectedRoles: (userRoleInfo: PermissionRoleModel) =>
            dispatch(PermissionActionCreator.setInitialRoles(userRoleInfo)),

        dispatchSaveUserRoles: (roles: UserRoleRequestModel[], successCallback: SuccessFn, errorCallback: ErrorFn) =>
            dispatch(UserMapSectionActionCreator.saveRoleMap(roles, successCallback, errorCallback))


    };
}

export const UserMapSectionContainer = connect(mapStateToProps, mapDispatchToProps)(UserMapSectionComponent);