//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../../core';

import { staticScanSummaryService } from '../static-scan-summary.service';
import { StaticScanSummaryActionType } from './static-scan-summary-action-type.enum';
import { StaticScanSummaryModel } from '../models';
import { StaticScanReportState } from '../../static-scan-report-store';

//#endregion application imports

export class StaticScanSummaryActionCreator {

    //#region public functions

    /**
     * action to fetch static scan resummaryport and save to store
     * @param staticScanId
     * @param errorCallback
     */
    public static getStaticScanSummary(staticScanId: number, errorCallback: (error?: any) => void): ThunkDispatch<StaticScanReportState, any, IAppActionModel<StaticScanReportState>> {
        return (dispatch: ThunkDispatch<StaticScanReportState, any, IAppActionModel<StaticScanReportState>>) => {
            staticScanSummaryService.getStaticScanSummary(dispatch, staticScanId).then(
                (response: ApiResponseModel<StaticScanSummaryModel>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: StaticScanSummaryActionType.FetchStaticScanSummary,
                            payload: {
                                summary: response.data
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