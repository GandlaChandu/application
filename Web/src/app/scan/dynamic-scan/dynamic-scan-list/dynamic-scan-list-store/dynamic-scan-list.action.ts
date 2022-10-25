//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';
import { PagedResult, PageRequestModel } from '../../../../shared';

import { DynamicScanListModel } from '../models';

import { DynamicScanListState } from './dynamic-scan-list.state';
import { dynamicScanListService } from '../dynamic-scan-list.service';
import { DynamicScanListActionType } from './dynamic-scan-list-action-type.enum';

//#endregion application imports

export class DynamicScanListActionCreator {

    //#region public functions

    /**
     * action to fetch dynamic scan results and save to store
     * @param pageRequest
     * @param errorCallback
     */
    public static fetchDynamicScanResults(pageRequest: PageRequestModel, errorCallback: (error?: any) => void): ThunkDispatch<DynamicScanListState, any, IAppActionModel<DynamicScanListState>> {
        return (dispatch: ThunkDispatch<DynamicScanListState, any, IAppActionModel<DynamicScanListState>>) => {
            dynamicScanListService.getDynamicScans(dispatch, pageRequest).then(
                (response: ApiResponseModel<PagedResult<DynamicScanListModel>>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: DynamicScanListActionType.FetchDynamicResults,
                            payload: {
                                dynamicScans: response.data
                            }
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