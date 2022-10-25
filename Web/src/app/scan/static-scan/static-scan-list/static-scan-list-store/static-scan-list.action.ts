//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';
import { PagedResult, PageRequestModel } from '../../../../shared';

import { StaticScanListModel } from '../models';

import { StaticScanListState } from './static-scan-list.state';
import { staticScanListService } from '../static-scan-list.service';
import { StaticScanListActionType } from './static-scan-list-action-type.enum';

//#endregion application imports

export class StaticScanListActionCreator {

    //#region public functions

    /**
     * action to fetch dynamic scan results and save to store
     * @param pageRequest
     * @param errorCallback
     */
    public static fetchStaticScanResults(pageRequest: PageRequestModel, errorCallback: (error?: any) => void): ThunkDispatch<StaticScanListState, any, IAppActionModel<StaticScanListState>> {
        return (dispatch: ThunkDispatch<StaticScanListState, any, IAppActionModel<StaticScanListState>>) => {
            staticScanListService.getStaticScans(dispatch, pageRequest).then(
                (response: ApiResponseModel<PagedResult<StaticScanListModel>>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: StaticScanListActionType.FetchStaticResults,
                            payload: {
                                gridResultData: response.data
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