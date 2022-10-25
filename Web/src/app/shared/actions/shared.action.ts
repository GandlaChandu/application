//#region react imports

import { ThunkDispatch } from 'redux-thunk';
import { change, untouch, FormAction, blur } from 'redux-form';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel, CoreActionType, CoreState } from '../../core';
import { ScanTypeEnum } from '../../utilities';

import { sharedService } from '../services';
import { SharedActionType } from '../action-types';
import { ClientModel, DivisionModel, ProjectModel, KeyNamePairModel, UserProfileModel } from '../models';
import { Helper } from '../helpers';
import { SuccessFn, ErrorFn } from '../types/common-types';

//#endregion application imports

export class SharedActionCreator {

    //#region public functions

    /**
     * action to fetch clients and save to store
     * @param errorCallback
     */
    public static fetchClients(errorCallback: (error?: any) => void): ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            sharedService.getClients(dispatch).then(
                (result: ApiResponseModel<ClientModel[]>) => {
                    if (result && result.isSuccess) {
                        dispatch({
                            type: SharedActionType.FetchClients,
                            payload: {
                                clients: result.data.map(x => {
                                    return {
                                        value: x.id,
                                        label: x.name
                                    }
                                })
                            }
                        });
                    }
                    else {
                        errorCallback(result)
                    }
                },
                errorCallback
            );
        };
    }

    /**
     * action to fetch divisions for client and save to store
     * @param clientId
     * @param errorCallback
     */
    public static fetchDivisions(clientId: number, errorCallback: (error?: any) => void): ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            if (clientId > 0) {
                sharedService.getDivisionsForClient(clientId, dispatch).then(
                    (result: ApiResponseModel<DivisionModel[]>) => {
                        if (result && result.isSuccess) {
                            dispatch({
                                type: SharedActionType.FetchDivisions,
                                payload: {
                                    divisions: result.data.map(x => {
                                        return {
                                            value: x.id,
                                            label: x.name
                                        }
                                    })
                                }
                            });
                        }
                        else {
                            errorCallback(result)
                        }
                    },
                    errorCallback
                );
            }
            else {
                dispatch({
                    type: SharedActionType.FetchDivisions,
                    payload: {
                        divisions: []
                    }
                });

            }
        };
    }

    /**
     * action to fetch projects for divisions and save to store
     * @param divisionId
     * @param errorCallback
     * @param scanType
     */
    public static fetchProjects(divisionId: number, errorCallback: (error?: any) => void, scanType?: ScanTypeEnum): ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            if (divisionId > 0) {
                sharedService.getProjectsForDivision(dispatch, divisionId, scanType).then(
                    (result: ApiResponseModel<ProjectModel[]>) => {

                        if (result && result.isSuccess) {
                            dispatch({
                                type: SharedActionType.FetchProjects,
                                payload: {
                                    projects: result.data.map(x => {
                                        return {
                                            value: x.id,
                                            label: x.name
                                        }
                                    })
                                }
                            });
                        }
                        else {
                            errorCallback(result)
                        }
                    },
                    errorCallback
                );
            }
            else {
                dispatch({
                    type: SharedActionType.FetchProjects,
                    payload: {
                        projects: []
                    }
                });
            }
        };
    }

    /**
     * action to fetch projects for divisions and save to store
     * @param errorCallback
     */
    public static fetchScanTypes(errorCallback: (error?: any) => void): ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            sharedService.getAnalysisTypes(dispatch).then(
                (result: ApiResponseModel<KeyNamePairModel[]>) => {
                    if (result && result.isSuccess) {
                        dispatch({
                            type: SharedActionType.FetchScanTypes,
                            payload: {
                                scanTypes: result.data.map(x => Helper.toSelectListItem(x))
                            }
                        });
                    }
                    else {
                        errorCallback(result)
                    }
                },
                errorCallback
            );
        };
    }

    /**
     * action to reset redux form control
     * @param formModel
     * @param form
     * @param fieldKey
     */
    public static resetControl(formModel: any, form: string, fieldKey: string): ThunkDispatch<any, any, FormAction> {
        return (dispatch: ThunkDispatch<any, any, FormAction>) => {

            //reset the field's value
            dispatch(change(form, fieldKey, formModel[fieldKey]));

            //reset the field's error
            dispatch(untouch(form, fieldKey));

            //blur the field
            dispatch(blur(form, fieldKey, formModel[fieldKey]));

        };

    }

    /**
     * action to set redirection state to store
     * @param successCallback
     * @param errorCallback
     */
    public static fetchLoggedInUserInfo(successCallback?: SuccessFn, errorCallback?: ErrorFn): ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<CoreState>>) => {
            sharedService.getLoggedInUserInfo(dispatch).then(
                (resp) => {
                    let userProfile: UserProfileModel = new UserProfileModel();
                    userProfile.firstName = resp.data.firstName;
                    userProfile.lastName = resp.data.lastName;
                    userProfile.role = resp.data.role;
                    userProfile.emailId = resp.data.email;
                    userProfile.userRoles = resp.data.userRoles;
                    userProfile.id = resp.data.id;
                    if (resp && resp.isSuccess) {
                        dispatch({
                            type: CoreActionType.FetchUserInfo,
                            payload: { userProfile: userProfile }
                        });
                    }
                    else {
                        dispatch({
                            type: CoreActionType.SetError,
                            payload: {
                                errorInfo: {
                                    errorCode: resp.status,
                                    errorMessage: resp.errorMessage,
                                    isGlobalError: true
                                }
                            }
                        });
                    }
                    if (successCallback) {
                        successCallback(resp);
                    }
                },
                (error) => {
                    dispatch({
                        type: CoreActionType.SetError,
                        payload: {
                            errorInfo: {
                                isGlobalError: true,
                                errorCode: error.status,
                                errorMessage: error.errorMessage
                            }
                        }
                    });
                    if (errorCallback) {
                        errorCallback(error);
                    }
                }
            );
        };
    }

    //#endregion public functions
}