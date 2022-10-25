//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';
import { KeyNamePairModel, Helper } from '../../../../shared';
import { EntityType } from '../../../../utilities';

import { QualityProfileSectionState } from './quality-profile-section.state';
import { qualityProfileSectionService } from '../quality-profile-section.service';
import { QualityProfileSectionActionType } from './quality-profile-section-action-type.enum';
import { QualityProfileFormModel } from '../quality-profile-form';

//#endregion application imports

export class QualityProfileSectionActionCreator {

    //#region public functions

    /**
     * action to fetch entity quality profiles and save info to store
     * @param entityType
     * @param entityId
     * @param errorCallback
     */
    public static fetchEntityProfiles(entityType: EntityType, entityId: number, errorCallback: (error?: any) => void): ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>> {
        return (dispatch: ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>>) => {
            if (entityId > 0) {
                qualityProfileSectionService.getQualityProfiles(entityType, entityId, dispatch).then(
                    (response: ApiResponseModel<QualityProfileFormModel>) => {
                        if (response && response.isSuccess) {
                            dispatch({
                                type: QualityProfileSectionActionType.FetchEntityProfiles,
                                payload: {
                                    gridResultData: {
                                        items: response.data.qualityProfilePreferences,
                                        total: response.data.qualityProfilePreferences.length
                                    }
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
            else {
                dispatch({
                    type: QualityProfileSectionActionType.FetchEntityProfiles,
                    payload: {
                        gridResultData: {
                            items: []
                        }
                    }
                });
            }
        }
    }

    /**
     * action to set popup state info to store
     * @param show
     * @param division
     */
    public static setPopupState(show: boolean): ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>> {
        return (dispatch: ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>>) => {
            dispatch({
                type: QualityProfileSectionActionType.ShowPopup,
                payload: { showPopup: show }
            });
        };
    }

    /**
     * action to fetch language types and save info to store
     * @param errorCallback
     */
    public static fetchLanguages(errorCallback: (error?: any) => void): ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>> {
        return (dispatch: ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>>) => {
            qualityProfileSectionService.getAllLanguages(dispatch).then((response: ApiResponseModel<KeyNamePairModel[]>) => {
                if (response && response.isSuccess) {
                    dispatch({
                        type: QualityProfileSectionActionType.FetchLanguages,
                        payload: {
                            languages: response.data.map(x => Helper.toSelectListItem(x))
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
     * action to fetch language quaity profile types and save info to store
     * @param languageId
     * @param errorCallback
     */
    public static fetchLanguageProfiles(languageId: number, errorCallback: (error?: any) => void): ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>> {
        return (dispatch: ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>>) => {
            if (languageId) {
                qualityProfileSectionService.getLanguageProfiles(languageId, dispatch).then((response: ApiResponseModel<KeyNamePairModel[]>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: QualityProfileSectionActionType.FetchLanguageProfiles,
                            payload: {
                                languageProfiles: response.data.map(x => Helper.toSelectListItem(x))
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
    }

    /**
     * action to call save quality profile for entity api
     * @param request
     * @param successCallback
     * @param errorCallback
     */
    public static saveEntityProfile(request: QualityProfileFormModel, successCallback: (response) => void, errorCallback: (error) => void):
        ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>> {
        return (dispatch: ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>>) => {
            qualityProfileSectionService.saveEntityProfile(request, dispatch).then(successCallback, errorCallback);
        };
    }

    /**
     * action to remove language, profile mapping from store
     * @param id
     * @param successCallback
     * @param errorCallback
     */
    public static removeProfileMapping(id: number, successCallback: (response) => void, errorCallback: (response) => void):
        ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>> {
        return (dispatch: ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>>) => {
            qualityProfileSectionService.removeProfileMapping(id, dispatch).then(successCallback, errorCallback);
        };
    }

    /**
     * action to set selected quality profile info to store
     * @param profile
     */
    public static setSelectedProfileInfo(profile: QualityProfileFormModel): ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>> {
        return (dispatch: ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>>) => {
            if (profile && profile.clientId) {
                // For preselection of quality profile, on selecting language
                qualityProfileSectionService.getQualityProfiles(EntityType.Client, profile.clientId, dispatch).then(
                    (response: ApiResponseModel<QualityProfileFormModel>) => {
                        if (response && response.isSuccess) {
                            response.data.qualityProfilePreferences.forEach(x => {
                                //TODO: to create modal
                                if (profile.languageId === x.languageId) {
                                    profile.qualityProfileId = x.qualityProfileId;
                                }
                            });
                            dispatch({
                                type: QualityProfileSectionActionType.SelectedProfile,
                                payload: { selectedProfile: profile }
                            });
                        }
                    }
                );
            } else {
                dispatch({
                    type: QualityProfileSectionActionType.SelectedProfile,
                    payload: { selectedProfile: profile }
                });
            }
        };
    }

    /**
     * action to set initial quality profile info to store
     * @param profile
     */
    public static setInitialProfile(profile: QualityProfileFormModel): ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>> {
        return (dispatch: ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>>) => {

            dispatch({
                type: QualityProfileSectionActionType.InitialProfile,
                payload: { initialProfile: profile }
            });
        };
    }

    //#endregion public functions

    //#region private functions

    //#endregion private functions
}