//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { Url, EntityType } from '../../../utilities';
import { apiHandler, IAppActionModel } from '../../../core';
import { Helper } from '../../../shared';

import { DynamicPolicyModel } from './models';

//#endregion application imports

class DynamicPolicySectionService {

    //#region public functions

    /**
     * gets Scan Policies
     * @param dispatch 
     */
    public getScanPolicies(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getDynamicScanUrl(Url.apiUrl.dynamicFetchScanPolicyNamesApi), dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * gets the Dynamic Scan Policy for entity
     * @param entityType
     * @param entityId
     * @param dispatch
     */
    public getDynamicScanPolicyByEntityId(entityType: EntityType, entityId: number, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        let url = Url.getDynamicScanUrl(`${Url.apiUrl.dynamicFetchScanPolicisByEntity}/${entityType}/${entityId}`);
        return apiHandler.get(url, dispatch, Helper.setHeaderAuthToken());
    }


    /**
     * saves dynamic scan policies
     * @param data 
     * @param dispatch 
     */
    public saveDynamicScanPolicies(data: DynamicPolicyModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getDynamicScanUrl(Url.apiUrl.dynamicSaveScanPolicyMappingApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * updates dynamic scan policies
     * @param data 
     * @param dispatch 
     */
    public updateDynamicScanPolicies(data: DynamicPolicyModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.put(Url.getDynamicScanUrl(Url.apiUrl.dynamicUpdateScanPolicyMappingApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    //#nedregion public functions

}

export const dynamicPolicySectionService = new DynamicPolicySectionService();