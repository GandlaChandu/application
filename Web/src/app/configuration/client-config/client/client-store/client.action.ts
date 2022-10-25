//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';
import { ClientModel, PageState, KeyNamePairModel } from '../../../../shared';
import { EntityType } from '../../../../utilities';

import { clientService } from '../client.service';
import { ClientState } from './client.state';
import { ClientActionType } from './client-action-type.enum';
import { DynamicPolicyModel, DynamicPolicySectionActionCreator, dynamicPolicySectionService } from '../../../config-shared';

//#endregion application imports

export class ClientActionCreator {

    //#region public functions

    /**
     * Action to set client state info to store
     * @param client 
     */
    public static setClient(client: ClientModel): ThunkDispatch<ClientState, any, IAppActionModel<ClientState>> {
        return (dispatch: ThunkDispatch<ClientState, any, IAppActionModel<ClientState>>) => {
            dispatch({
                type: ClientActionType.SetClient,
                payload: {
                    client: client
                }
            });
        };
    }

    /**
     * Action to fetch dynamic policy info for client and save to store
     * @param client 
     * @param errorCallback 
     */
    public static fetchClientDynamicPolicy(client: ClientModel, errorCallback: (error?: any) => void): ThunkDispatch<ClientState, any, IAppActionModel<ClientState>> {
        return (dispatch: ThunkDispatch<ClientState, any, IAppActionModel<ClientState>>) => {
            if (client.id > 0) {
                dynamicPolicySectionService.getDynamicScanPolicyByEntityId(EntityType.Client, client.id, dispatch).then(
                    (scanPolicyResponse: ApiResponseModel<KeyNamePairModel[]>) => {
                        if (scanPolicyResponse && scanPolicyResponse.isSuccess) {
                            if (scanPolicyResponse.data.length > 0) {
                                client.dynamicScanPolicyId = scanPolicyResponse.data[0].id;
                            }
                            dispatch({
                                type: ClientActionType.SetClient,
                                payload: {
                                    client: client
                                }
                            });
                        }
                        else {
                            errorCallback(scanPolicyResponse);
                        }
                    },
                    errorCallback
                );
            }
        };
    }

    /**
     * action to set division tab state info to store
     * @param show
     */
    public static setShowDivisionTab(show: boolean = false): ThunkDispatch<ClientState, any, IAppActionModel<ClientState>> {
        return (dispatch: ThunkDispatch<ClientState, any, IAppActionModel<ClientState>>) => {
            dispatch({
                type: ClientActionType.ShowDivisionTab,
                payload: { showDivisionTab: show, showQualityProfileTab: !show, showUserTab: !show }
            });
        };
    }

    /**
     * action to set quality profile tab state info to store
     * @param show
     */
    public static setShowQualityProfileTab(show: boolean = false): ThunkDispatch<ClientState, any, IAppActionModel<ClientState>> {
        return (dispatch: ThunkDispatch<ClientState, any, IAppActionModel<ClientState>>) => {
            dispatch({
                type: ClientActionType.ShowQualityProfileTab,
                payload: { showDivisionTab: !show, showQualityProfileTab: show, showUserTab: !show }
            });
        };
    }

    /**
     * action to set user map tab state info to store
     * @param show
     */
    public static setShowUserMapTab(show: boolean = false): ThunkDispatch<ClientState, any, IAppActionModel<ClientState>> {
        return (dispatch: ThunkDispatch<ClientState, any, IAppActionModel<ClientState>>) => {
            dispatch({
                type: ClientActionType.ShowUserMapTab,
                payload: { showDivisionTab: !show, showQualityProfileTab: !show, showUserTab: show }
            });
        };
    }

    /**
     * action to call save client api
     * @param client
     * @param successCallback
     * @param errorCallback
     */
    public static saveClient(client: ClientModel, successCallback: (response) => void, errorCallback: (error) => void): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<PageState, any, IAppActionModel<PageState>>) => {
            clientService.saveClient(dispatch, client).then(
                (response: ApiResponseModel<any>) => {
                    if (response && response.isSuccess) {
                        if (client.dynamicScanPolicyId && client.dynamicScanPolicyId > 0) {
                            let dynamicScanPolicyModel: DynamicPolicyModel = new DynamicPolicyModel();
                            //TODO: repplace the below logic
                            if (typeof response.data === "boolean") {
                                dynamicScanPolicyModel.entityId = client.id;
                            }
                            else {
                                dynamicScanPolicyModel.entityId = response.data;
                            }
                            dynamicScanPolicyModel.entityTypeId = EntityType.Client;
                            dynamicScanPolicyModel.scanPolicyId = client.dynamicScanPolicyId;
                            dispatch(DynamicPolicySectionActionCreator.saveDynamicScanPolicies(dynamicScanPolicyModel,
                                client.id > 0,
                                successCallback,
                                errorCallback));
                        }

                    }
                    successCallback(response);
                }
                ,
                errorCallback);
        };
    }

    //#endregion public functions
}