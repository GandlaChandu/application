//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { PagedResult, PageRequestModel } from '../../../../shared';
import { IAppActionModel, ApiResponseModel } from '../../../../core';

import { DynamicScanPolicyModel } from '../../models';
import { DynamicScanPolicyManagerState } from './dynamic-scan-policy-manager.state';
import { DynamicScanPolicyManagerActionType } from './dynamic-scan-policy-manager-action-type.enum';
import { dynamicPolicyManagerService } from '../dynamic-scan-policy-manager.service';

//#endregion application imports

export class DynamicScanPolicyManagerActionCreator {

    //#region public functions

    /**
     * action to fetch dynamic scan rules state info to store
     * @param request
     * @param errorCallback
     */
    public static fetchDynamicScanRules(request: PageRequestModel, errorCallback: (error?: any) => void): ThunkDispatch<DynamicScanPolicyManagerState, any, IAppActionModel<DynamicScanPolicyManagerState>> {
        return (dispatch: ThunkDispatch<DynamicScanPolicyManagerState, any, IAppActionModel<DynamicScanPolicyManagerState>>) => {
            dynamicPolicyManagerService.getDynamicScanRules(request, dispatch).then((response: ApiResponseModel<PagedResult<DynamicScanPolicyModel>>) => {
                if (response && response.isSuccess) {
                    dispatch({
                        type: DynamicScanPolicyManagerActionType.FetchDynamicScanRules,
                        payload: { gridResultData: response.data }
                    });
                }
                else {
                    errorCallback(response);
                }
            },
                errorCallback
            );
        };
    }

    //#endregion public functions
}