//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';
import { PagedResult, ErrorFn, SuccessFn, UserRoleRequestModel } from '../../../../shared';
import { Role } from '../../../../utilities';

import { UserMapSectionState } from './user-map-section.state';
import { userMapSectionService } from '../user-map-section.service';
import { UserMapSectionModel, UserMapPageRequestModel, EntityUserResponseModel, UserMapRequestModel } from '../models';
import { UserMapSectionActionType } from './user-map-section-action-type.enum';

//#endregion application imports

export class UserMapSectionActionCreator {

    //#region public functions

    /**
     * action to fetch entity users and save to store
     * @param pageRequest
     * @param errorCallback
     */
    public static fetchEntityUsers(pageRequest: UserMapPageRequestModel, errorCallback: ErrorFn):
        ThunkDispatch<UserMapSectionState, any, IAppActionModel<UserMapSectionState>> {
        return (dispatch: ThunkDispatch<UserMapSectionState, any, IAppActionModel<UserMapSectionState>>) => {
            let users = new PagedResult<UserMapSectionModel>();

            if (pageRequest && pageRequest.entityId > 0) {
                userMapSectionService.getEntityUsers(dispatch, {
                    ...pageRequest.listParameter,
                    entityType: pageRequest.entityType,
                    entityId: pageRequest.entityId
                }).then(
                    (response: ApiResponseModel<PagedResult<EntityUserResponseModel>>) => {
                        if (response && response.isSuccess) {
                            users.items = response.data.items.map(x => this.toUserMapSectionModel(x, pageRequest));
                            users.total = response.data.total;
                        }
                        dispatch({
                            type: UserMapSectionActionType.FetchEntityUsers,
                            payload: {
                                assignedUsers: users
                            }
                        });
                    },
                    errorCallback
                );
            }
            else {
                dispatch({
                    type: UserMapSectionActionType.FetchEntityUsers,
                    payload: {
                        assignedUsers: users
                    }
                });
            }

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
     * action to call save role map api
     * @param roles
     * @param successCallback
     * @param errorCallback
     */
    public static saveRoleMap(roles: UserRoleRequestModel[], successCallback: SuccessFn, errorCallback: ErrorFn):
        ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            userMapSectionService.saveEntityUserRole(dispatch, roles).then(successCallback, errorCallback);
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
     * action to set popup display info to store
     * @param locationInfo
     */
    public static setShowPopup(show: boolean):
        ThunkDispatch<UserMapSectionState, any, IAppActionModel<UserMapSectionState>> {
        return (dispatch: ThunkDispatch<UserMapSectionState, any, IAppActionModel<UserMapSectionState>>) => {
            dispatch({
                type: UserMapSectionActionType.ShowPermissionPopup,
                payload: {
                    showPermissionPopup: show
                }
            });
        };
    }

    /**
     * gets user map section model from entity response
     * @param entityUserResponse
     * @param pageRequest
     */
    public static toUserMapSectionModel(entityUserResponse: EntityUserResponseModel, pageRequest: UserMapPageRequestModel) {
        let userMap: UserMapSectionModel = new UserMapSectionModel();
        if (entityUserResponse.user) {
            userMap.email = entityUserResponse.user.email;
            userMap.firstName = entityUserResponse.user.firstName;
            userMap.lastName = entityUserResponse.user.lastName;
            userMap.userId = entityUserResponse.user.id;
            userMap.isActive = entityUserResponse.user.isActive;
            userMap.isDeleted = entityUserResponse.user.isDeleted;
            userMap.userRoles = entityUserResponse.user.userRoles.map(x => {
                x.userId = entityUserResponse.user.id;
                return x;
            });

        }
        userMap.id = entityUserResponse.id;
        userMap.roleId = entityUserResponse.roleId;
        userMap.roleName = Role[entityUserResponse.roleId];
        userMap.entityId = pageRequest.entityId;
        userMap.entityType = pageRequest.entityType;
        return userMap;
    }


    //#endregion public functions

    //#region private functions
    //#endregion private functions
}