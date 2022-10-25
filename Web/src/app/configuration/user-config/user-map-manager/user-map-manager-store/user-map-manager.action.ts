//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';
import { PagedResult, ErrorFn, SuccessFn, SelectListItemModel, Helper, GridRowModel } from '../../../../shared';
import { Role } from '../../../../utilities';

import { UserMapManagerState } from './user-map-manager.state';
import { UserMapManagerActionType } from './user-map-manager-action-type.enum';
import { UserMapPageRequestModel, UserMapSectionModel, userMapSectionService, EntityUserResponseModel, UserMapRequestModel, UserLocationInfoModel, UserMapSectionActionCreator } from '../../../config-shared';

//#endregion application imports

export class UserMapManagerActionCreator {

    //#region public functions

    /**
     * action to fetch all users and save to store
     * @param pageRequest
     * @param successCallback
     * @param errorCallback
     */
    public static fetchAllUsers(pageRequest: UserMapPageRequestModel, successCallback: SuccessFn, errorCallback: ErrorFn):
        ThunkDispatch<UserMapManagerState, any, IAppActionModel<UserMapManagerState>> {
        return (dispatch: ThunkDispatch<UserMapManagerState, any, IAppActionModel<UserMapManagerState>>) => {
            let users: GridRowModel<UserMapSectionModel>[] = [];
            let assignedUsers: UserMapSectionModel[] = [];
            userMapSectionService.getAllActiveUsers(dispatch, pageRequest).then(
                (response: ApiResponseModel<PagedResult<UserMapSectionModel>>) => {
                    if (response && response.isSuccess) {
                        userMapSectionService.getEntityUsers(dispatch, {
                            ...pageRequest.listParameter,
                            entityType: pageRequest.entityType,
                            entityId: pageRequest.entityId
                        }).then(
                            (entityUserResponse: ApiResponseModel<PagedResult<EntityUserResponseModel>>) => {
                                if (entityUserResponse && entityUserResponse.isSuccess) {
                                    assignedUsers = entityUserResponse.data.items.map(x => UserMapSectionActionCreator.toUserMapSectionModel(x, pageRequest));
                                }
                                dispatch({
                                    type: UserMapManagerActionType.FetchEntityUsers,
                                    payload: {
                                        assignedUsers: {
                                            items: assignedUsers,
                                            total: assignedUsers.length
                                        }
                                    }
                                });
                                response.data.items.forEach(x => {
                                    x.userId = x.id;
                                    x.id = 0;
                                });
                                users = this.getMappedUserList(response.data.items.map((x, i) => Helper.toGridRowModel(x, i)), { value: pageRequest.defaultRole, label: Role[pageRequest.defaultRole] }, assignedUsers);
                                dispatch({
                                    type: UserMapManagerActionType.FetchAllUsers,
                                    payload: {
                                        formlist: users,
                                        total: response.data.total
                                    }
                                });
                            });
                        successCallback(response);
                    }
                    else {
                        dispatch({
                            type: UserMapManagerActionType.FetchAllUsers,
                            payload: {
                                formlist: users,
                                total: response.data.total

                            }
                        });
                    }
                },
                errorCallback
            );

        };
    }

    /**
     * refreshes all users info to state
     * @param row
     * @param allUsers
     * @param assignedUsers
     */
    public static refreshAllUsers(row: GridRowModel<UserMapSectionModel>, allUsers: GridRowModel<UserMapSectionModel>[], assignedUsers: UserMapSectionModel[]) {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            //1. refresh assigned users
            let assignedUsersCopy = [...assignedUsers];

            if (row.rowData.entityType) {
                //Add map
                row.rowData.roleName = Role[row.rowData.roleId];
                assignedUsersCopy.push({ ...row.rowData });
            }
            else {
                //remove map
                let index = assignedUsersCopy.findIndex(x => x.id === row.rowData.id);
                assignedUsersCopy.splice(index, 1);
            }

            dispatch({
                type: UserMapManagerActionType.FetchEntityUsers,
                payload: {
                    assignedUsers: {
                        items: assignedUsersCopy,
                        total: assignedUsersCopy.length
                    }
                }
            });

            // 2. refresh all users

            let users: GridRowModel<UserMapSectionModel>[] = this.getMappedUserList(allUsers, null, assignedUsersCopy);

            //set selected row record
            let rowIndex = users.findIndex(x => x.rowData.userId === row.rowData.userId);
            users[rowIndex] = { ...row };
            dispatch({
                type: UserMapManagerActionType.FetchAllUsers,
                payload: {
                    formlist: users
                }
            });
        };
    }

    /**
     * action to call save user map api
     * @param request
     * @param successCallback
     * @param errorCallback
     */
    public static saveUserMap(request: UserMapRequestModel, successCallback: SuccessFn, errorCallback: ErrorFn):
        ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            userMapSectionService.saveEntityUser(dispatch, request).then(successCallback, errorCallback);
        };
    }

    /**
     * action to call remove user map api
     * @param id
     * @param successCallback
     * @param errorCallback
     */
    public static removeUserMap(id: number, successCallback: SuccessFn, errorCallback: ErrorFn):
        ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            userMapSectionService.removeEntityUser(dispatch, id).then(successCallback, errorCallback);
        };
    }

    /**
     * action to set location info to store
     * @param locationInfo
     */
    public static setLocationInfo(locationInfo: UserLocationInfoModel):
        ThunkDispatch<UserMapManagerState, any, IAppActionModel<UserMapManagerState>> {
        return (dispatch: ThunkDispatch<UserMapManagerState, any, IAppActionModel<UserMapManagerState>>) => {
            dispatch({
                type: UserMapManagerActionType.SetLocationInfo,
                payload: {
                    locationInfo: locationInfo
                }
            });
        };
    }

    /**
     * action to set popup display info to store
     * @param locationInfo
     */
    public static setShowPopup(show: boolean):
        ThunkDispatch<UserMapManagerState, any, IAppActionModel<UserMapManagerState>> {
        return (dispatch: ThunkDispatch<UserMapManagerState, any, IAppActionModel<UserMapManagerState>>) => {
            dispatch({
                type: UserMapManagerActionType.ShowPermissionPopup,
                payload: {
                    showPermissionPopup: show
                }
            });
        };
    }

    //#endregion public functions

    //#region private functions

    /**
     * sets assignment info for users list
     * @param users
     * @param defaultRole
     * @param assignedUsers
     */
    private static getMappedUserList(users: GridRowModel<UserMapSectionModel>[], defaultRole: SelectListItemModel, assignedUsers: UserMapSectionModel[]) {
        let newUserList: GridRowModel<UserMapSectionModel>[] = [];
        let newUser: GridRowModel<UserMapSectionModel> = null;
        users.forEach(x => {
            newUser = {
                ...x,
            };

            let assignedUser = assignedUsers?.find(user => newUser.rowData.userId === user.userId);
            if (assignedUser) {
                newUser.rowData.id = assignedUser.id;
                newUser.rowData.entityId = assignedUser.entityId;
                newUser.rowData.entityType = assignedUser.entityType;
                newUser.rowData.roleId = assignedUser.roleId;
                newUser.rowData.roleName = Role[assignedUser.roleId];
                newUser.rowData.userRoles = assignedUser.userRoles;
            }

            if (defaultRole && defaultRole.value) {
                newUser.rowData.roleName = defaultRole.label;
                newUser.rowData.roleId = defaultRole.value;
            }

            newUserList.push(newUser);
        });
        return newUserList;
    }

    //#endregion private functions
}