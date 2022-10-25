//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { apiHandler, IAppActionModel } from '../../../../core';
import { Url } from '../../../../utilities';
import { Helper } from '../../../../shared';

//#endregion application imports

class StaticScanInfoService {

    //#region public functions

    /**
     * get code scan types
     * @param dispatch
     */
    public getCodeScanTypes(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getApplicationAnalyzerUrl(Url.apiUrl.getStaticScanTypesApi), dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * get source code types
     * @param dispatch
     */
    public getSourceCodeTypes(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getApplicationAnalyzerUrl(Url.apiUrl.getStaticSourceCodeTypesApi), dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * get source control types
     * @param dispatch
     */
    public getSourceControlTypes(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getApplicationAnalyzerUrl(Url.apiUrl.getStaticSourceControlTypesApi), dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * removes static scan and project mappings from DB
     * @param dispatch
     */
    public removeCodeMapping(staticScanId: number, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.put(Url.getStaticScanUrl(`${Url.apiUrl.removeCodeMappingAPI}/${staticScanId}`), '', dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const staticScanInfoService = new StaticScanInfoService();