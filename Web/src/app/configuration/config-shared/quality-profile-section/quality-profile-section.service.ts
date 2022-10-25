//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { EntityType, Url } from '../../../utilities';
import { IAppActionModel, apiHandler } from '../../../core';
import { Helper } from '../../../shared';

import { QualityProfileFormModel } from './quality-profile-form';

//#endregion application imports

class QualityProfileSectionService {

    //#region public functions

    /**
     * get quality profiles for the entity
     * @param entiyType
     * @param entityId
     * @param dispatch
     */
    public getQualityProfiles(entiyType: EntityType, entityId: number, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(`${Url.getStaticScanUrl(Url.apiUrl.fetchEntityProfilesApi)}/${entiyType}/${entityId}`, dispatch, Helper.setHeaderAuthToken());
    }

    /**
    * get all languages
    * @param dispatch
    */
    public getAllLanguages(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getStaticScanUrl(Url.apiUrl.fetchLanguageApi), dispatch, Helper.setHeaderAuthToken());
    }

    /**
    * get all language quality profiles
    * @param languageId
    * @param dispatch
    */
    public getLanguageProfiles(languageId: number, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(`${Url.getStaticScanUrl(Url.apiUrl.fetchLanguageQualityProfilesApi)}${languageId}`, dispatch, Helper.setHeaderAuthToken());
    }

    /**
    * saves quality profile for entity
    * @param languageId
    * @param dispatch
    */
    public saveEntityProfile(request: QualityProfileFormModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        if (request.id && request.id > 0) {
            return apiHandler.put(Url.getStaticScanUrl(Url.apiUrl.qualityProfileForEntityEditApi), request, dispatch, Helper.setHeaderAuthToken());
        }
        else {
            return apiHandler.post(Url.getStaticScanUrl(Url.apiUrl.qualityProfileForEntitySaveApi), request, dispatch, Helper.setHeaderAuthToken());
        }
    }

    /**
     * removes language profile mappings from DB
     * @param dispatch
     */
    public removeProfileMapping(id: number, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.delete(`${Url.getStaticScanUrl(Url.apiUrl.removeLanguageProfileMapping)}${id}`, dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const qualityProfileSectionService = new QualityProfileSectionService();