//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../../core';
import { KeyNamePairModel, Helper, PageState } from '../../../../../shared';

import { StaticScanInfoActionType } from './static-scan-info-action-type.enum';
import { staticScanInfoService } from '../static-scan-info.service';
import { StaticScanInfoState } from './static-scan-info.state';

//#endregion application imports

export class StaticScanInfoActionCreator {

    //#region public functions

    /**
     * action to set code scan types and save info to store
     * @param errorCallback
     */
    public static fetchCodeScanTypes(errorCallback: (error?: any) => void): ThunkDispatch<StaticScanInfoState, any, IAppActionModel<StaticScanInfoState>> {
        return (dispatch: ThunkDispatch<StaticScanInfoState, any, IAppActionModel<StaticScanInfoState>>) => {
            staticScanInfoService.getCodeScanTypes(dispatch).then((response: ApiResponseModel<KeyNamePairModel[]>) => {
                if (response && response.isSuccess) {
                    dispatch({
                        type: StaticScanInfoActionType.FetchScanTypes,
                        payload: {
                            codeScanTypes: response.data.map(x => Helper.toSelectListItem(x))
                        }
                    });
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
     * action to set source code types and save info to store
     * @param errorCallback
     */
    public static fetchSourceCodeTypes(errorCallback: (error?: any) => void): ThunkDispatch<StaticScanInfoState, any, IAppActionModel<StaticScanInfoState>> {
        return (dispatch: ThunkDispatch<StaticScanInfoState, any, IAppActionModel<StaticScanInfoState>>) => {
            staticScanInfoService.getSourceCodeTypes(dispatch).then((response: ApiResponseModel<KeyNamePairModel[]>) => {
                if (response && response.isSuccess) {
                    dispatch({
                        type: StaticScanInfoActionType.FetchSourceCodeTypes,
                        payload: {
                            sourceCodeTypes: response.data.map(x => Helper.toSelectListItem(x))
                        }
                    });
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
     * action to set source control types and save info to store
     * @param errorCallback
     */
    public static fetchSourceControlTypes(errorCallback: (error?: any) => void): ThunkDispatch<StaticScanInfoState, any, IAppActionModel<StaticScanInfoState>> {
        return (dispatch: ThunkDispatch<StaticScanInfoState, any, IAppActionModel<StaticScanInfoState>>) => {
            staticScanInfoService.getSourceControlTypes(dispatch).then((response: ApiResponseModel<KeyNamePairModel[]>) => {
                if (response && response.isSuccess) {
                    dispatch({
                        type: StaticScanInfoActionType.FetchSourceControlTypes,
                        payload: {
                            sourceControlTypes: response.data.map(x => Helper.toSelectListItem(x))
                        }
                    });
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
     * action to set quality profile tab state info to store
     * @param show
     */
    public static setShowQualityProfileTab(show: boolean = false): ThunkDispatch<StaticScanInfoState, any, IAppActionModel<StaticScanInfoState>> {
        return (dispatch: ThunkDispatch<StaticScanInfoState, any, IAppActionModel<StaticScanInfoState>>) => {
            dispatch({
                type: StaticScanInfoActionType.ShowQualityProfileTab,
                payload: { showQualityProfileTab: show }
            });
        };
    }

    /**
     * action to set form state info to store
     * @param showForm
     */
    public static setFormState(showForm: boolean): ThunkDispatch<StaticScanInfoState, any, IAppActionModel<StaticScanInfoState>> {
        return (dispatch: ThunkDispatch<StaticScanInfoState, any, IAppActionModel<any>>) => {
            dispatch({
                type: StaticScanInfoActionType.ShowForm,
                payload: { showForm: showForm }
            });
        };
    }

    /**
     * action to remove static scan mapping from project to store
     * @param staticScanId
     * @param successCallback
     * @param errorCallback
     */
    public static removeCodeMapping(staticScanId: number, successCallback: (response) => void, errorCallback: (response) => void): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<StaticScanInfoState, any, IAppActionModel<StaticScanInfoState>>) => {
            staticScanInfoService.removeCodeMapping(staticScanId, dispatch).then(
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
    public static setTokenState(enabled: boolean): ThunkDispatch<StaticScanInfoState, any, IAppActionModel<StaticScanInfoState>> {
        return (dispatch: ThunkDispatch<StaticScanInfoState, any, IAppActionModel<StaticScanInfoState>>) => {
            dispatch({
                type: StaticScanInfoActionType.TokenBasedAccountState,
                payload: { staticIsTokenBased: enabled }
            });
        };
    }

    //#endregion public functions

    //#region private functions
    //#endregion private functions
}

