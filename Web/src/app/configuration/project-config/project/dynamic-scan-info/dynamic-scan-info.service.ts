//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { apiHandler, IAppActionModel } from '../../../../core';
import { Url } from '../../../../utilities';
import { Helper } from '../../../../shared';

import { DynamicScanInfoFormModel } from './models';

//#endregion application imports

class DynamicScanInfoService {

    //#region public functions

    /**
     * removes dynamic scan and project mappings from DB
     * @param dynamicScanDetails
     * @param dispatch
     */
    public removeAppMapping(dynamicScanDetails: DynamicScanInfoFormModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.put(Url.getDynamicScanUrl(`${Url.apiUrl.removeAppMappingAPI}/${dynamicScanDetails.id}`), '', dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * removes scan policy and project mappings from DB
     * @param dynamicScanDetails
     * @param dispatch
     */
    public removeScanPolicyMapping(dynamicScanDetails: DynamicScanInfoFormModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.put(Url.getDynamicScanUrl(Url.apiUrl.removeScanPolicyMappingAPI), dynamicScanDetails, dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const dynamicScanInfoService = new DynamicScanInfoService();