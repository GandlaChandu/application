//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { staticScanTriggerService } from '../static-scan-trigger.service';
import { ScanState } from '../../../scan-store';

//#endregion application imports

export class StaticScanTriggerActionCreator {

    //#region public functions

    /**
     * action to initiate scan
     * @param projectId
     * @param successCallback
     * @param errorCallback
     */
    public static initiateScan(projectId: number, successCallback: (response: any) => void, errorCallback: (error: any) => void): ThunkDispatch<any, any, IAppActionModel<ScanState>> {
        return (dispatch: ThunkDispatch<ScanState, any, IAppActionModel<ScanState>>) => {
            staticScanTriggerService.initiateScan(dispatch, projectId).then(successCallback, errorCallback);
        };
    }

    //#endregion public functions
}