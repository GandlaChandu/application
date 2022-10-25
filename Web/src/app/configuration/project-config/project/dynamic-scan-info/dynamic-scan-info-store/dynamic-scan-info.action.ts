//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../../core';
import { PageState } from '../../../../../shared';

import { DynamicScanInfoState } from './dynamic-scan-info.state';
import { DynamicScanInfoActionType } from './dynamic-scan-info-action-type.enum';
import { dynamicScanInfoService } from '../dynamic-scan-info.service';
import { DynamicScanInfoFormModel } from '../models';

//#endregion application imports

export class DynamicScanInfoActionCreator {

    //#region public functions

    /**
     * action to set dynamic form state info to store
     * @param showDynamicForm
     */
    public static setDynamicFormState(showDynamicForm: boolean): ThunkDispatch<DynamicScanInfoState, any, IAppActionModel<DynamicScanInfoState>> {
        return (dispatch: ThunkDispatch<DynamicScanInfoState, any, IAppActionModel<any>>) => {
            dispatch({
                type: DynamicScanInfoActionType.ShowDynamicForm,
                payload: { showDynamicForm: showDynamicForm }
            });
        };
    }

    /**
     * action to remove dynamic scan mapping from project to store
     * @param dynamicScanDetails
     * @param successCallback
     * @param errorCallback
     */
    public static removeAppMapping(dynamicScanDetails: DynamicScanInfoFormModel, successCallback: (response) => void, errorCallback: (response) => void): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<DynamicScanInfoState, any, IAppActionModel<DynamicScanInfoState>>) => {
            dynamicScanInfoService.removeScanPolicyMapping(dynamicScanDetails, dispatch);
            dynamicScanInfoService.removeAppMapping(dynamicScanDetails, dispatch).then(
                (response: ApiResponseModel<any>) => {
                    if (response && response.isSuccess) {
                        successCallback(response)
                    }
                    else {
                        errorCallback(response);
                    }
                },
                errorCallback
            );
        }
    }

    /**
     * action to set token account display state info to store
     * @param enabled
     */
    public static setTokenState(enabled: boolean): ThunkDispatch<DynamicScanInfoState, any, IAppActionModel<DynamicScanInfoState>> {
        return (dispatch: ThunkDispatch<DynamicScanInfoState, any, IAppActionModel<DynamicScanInfoState>>) => {
            dispatch({
                type: DynamicScanInfoActionType.TokenBasedAccountState,
                payload: { dynamicIsTokenBased: enabled }
            });
        };
    }

    //#endregion public functions

    //#region private functions
    //#endregion private functions
}