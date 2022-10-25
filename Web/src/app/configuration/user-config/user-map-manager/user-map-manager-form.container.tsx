//#region react imports

import { connect } from 'react-redux';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';
import { reduxForm } from 'redux-form';

//#endregion react imports

//#region application imports

import {
    GlobalState,
    ErrorFn,
    SuccessFn,
    injectReducer,
    formlistContainerHelper,
    GridRowModel,
    PermissionActionCreator,
    PermissionRoleModel,
    UserRoleRequestModel
} from '../../../shared';
import { IAppActionModel } from '../../../core';
import { Constant } from '../../../utilities';

import { UserMapManagerComponent } from './user-map-manager.component';
import { UserMapManagerDispatchPropModel } from './models/user-map-manager-dispatch-prop.model';
import { UserMapManagerOwnPropModel } from './models/user-map-manager-own-prop.model';
import { userMapManagerReducer, userMapManagerSelector, UserMapManagerActionCreator } from './user-map-manager-store';
import {
    userMapSelector,
    UserMapPageRequestModel,
    UserLocationInfoModel,
    UserMapSectionActionCreator,
    UserMapRequestModel,
    UserMapSectionModel,
    UserMapSectionConstant
} from '../../config-shared';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, UserMapManagerOwnPropModel> {
    return createStructuredSelector(
        {
            ...formlistContainerHelper().mapStateToPropsBase(state, Constant.reducerKey.userMapManagerReducer, UserMapSectionConstant.form),
            assignedUsers: (state) => userMapSelector.getAssignedUsers(state, { namespace: Constant.reducerKey.userMapManagerReducer }),
            locationInfo: (state) => userMapManagerSelector.getlocationInfoState(state, { namespace: Constant.reducerKey.userMapManagerReducer }),
            formlist: (state) => userMapSelector.getAllUsers(state, { namespace: Constant.reducerKey.userMapManagerReducer }),
            showPermissionPopup: (state) => userMapManagerSelector.getPopupState(state, { namespace: Constant.reducerKey.userMapManagerReducer }),
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): UserMapManagerDispatchPropModel {
    return {

        ...formlistContainerHelper().mapDispatchToPropsBase(dispatch),

        dispatchSaveUser: (request: UserMapRequestModel, successCallback: SuccessFn, errorCallback: ErrorFn) =>
            dispatch(UserMapSectionActionCreator.saveUserMap(request, successCallback, errorCallback)),

        dispatchRemoveUser: (id: number, successCallback: SuccessFn, errorCallback: ErrorFn) =>
            dispatch(UserMapSectionActionCreator.removeUserMap(id, successCallback, errorCallback)),

        dispacthFetchAllUsers: (pageRequest: UserMapPageRequestModel, successCallback: SuccessFn, errorCallback: ErrorFn) =>
            dispatch(UserMapManagerActionCreator.fetchAllUsers(pageRequest, successCallback, errorCallback)),

        dispatchSetLocationInfo: (locationInfo: UserLocationInfoModel) =>
            dispatch(UserMapManagerActionCreator.setLocationInfo(locationInfo)),

        dispatchRefresh: (rowData: GridRowModel<UserMapSectionModel>, allUsers: GridRowModel<UserMapSectionModel>[], assignedUsers: UserMapSectionModel[]) =>
            dispatch(UserMapManagerActionCreator.refreshAllUsers(rowData, allUsers, assignedUsers)),

        dispatchShowPopup: (show: boolean) =>
            dispatch(UserMapManagerActionCreator.setShowPopup(show)),

        dispatchFetchPermissions: () =>
            dispatch(PermissionActionCreator.fetchPermissionNodes()),

        dispatchSelectedRoles: (userRoleInfo: PermissionRoleModel) =>
            dispatch(PermissionActionCreator.setInitialRoles(userRoleInfo)),

        dispatchSaveUserRoles: (roles: UserRoleRequestModel[], successCallback: SuccessFn, errorCallback: ErrorFn) =>
            dispatch(UserMapSectionActionCreator.saveRoleMap(roles, successCallback, errorCallback))

    };
}

const UserMapReduxForm = reduxForm<any, any>({
    form: UserMapSectionConstant.form,
    enableReinitialize: true
})(UserMapManagerComponent);


const withConnect = connect(mapStateToProps, mapDispatchToProps)(UserMapReduxForm);
export const UserMapManagerForm = injectReducer(Constant.reducerKey.userMapManagerReducer, userMapManagerReducer)(withConnect);
