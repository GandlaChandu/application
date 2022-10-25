//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { PagedResult, PageRequestModel } from '../../../../shared';
import { IAppActionModel, ApiResponseModel } from '../../../../core';

import { QualityProfileManagerState } from './quality-profile-manager.state';
import { qualityProfileManagerService } from '../quality-profile-manager.service';
import { QualityProfileManagerActionType } from './quality-profile-manager-action-type.enum';
import { LanguageProfileMapModel } from '../../models';

//#endregion application imports

export class QualityProfileManagerActionCreator {

    //#region public functions

    /**
     * action to set static scan tules state info to store
     * @param request
     * @param errorCallback
     */
    public static fetchStaticScanRules(request: PageRequestModel, errorCallback: (error?: any) => void): ThunkDispatch<QualityProfileManagerState, any, IAppActionModel<QualityProfileManagerState>> {
        return (dispatch: ThunkDispatch<QualityProfileManagerState, any, IAppActionModel<QualityProfileManagerState>>) => {
            qualityProfileManagerService.getStaticScanRules(request, dispatch).then((response: ApiResponseModel<PagedResult<LanguageProfileMapModel>>) => {
                if (response && response.isSuccess) {
                    dispatch({
                        type: QualityProfileManagerActionType.FetchStaticScanRules,
                        payload: { qualityProfiles: response.data }
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