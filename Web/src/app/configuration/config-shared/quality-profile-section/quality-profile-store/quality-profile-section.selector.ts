//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports
import { PagedResult } from '../../../../shared';

import { QualityProfileSectionState } from './quality-profile-section.state';
import { QualityProfileSectionOwnPropModel } from '../models';
import { QualityProfileFormModel } from '../quality-profile-form';

//#endregion application imports


class QualityProfileSectionSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets quality profile tab display state for client
     * @param state
     */
    public getQualityProfileTabState(state: any, ownProps: QualityProfileSectionOwnPropModel) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as QualityProfileSectionState).showQualityProfileTab : false,
            (showQualityProfileTab) => showQualityProfileTab
        );
        return selector(state);
    }

    /**
     * gets entity quality profile info
     * @param state
     * @param ownProps
     */
    public getEntityProfiles(state: any, ownProps: QualityProfileSectionOwnPropModel) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as QualityProfileSectionState).gridResultData : new PagedResult<QualityProfileFormModel>(),
            (entityProfiles) => entityProfiles
        );
        return selector(state);
    }

    /**
     * gets selected profile info
     * @param state
     * @param ownProps
     */
    public getSelectedProfile(state: any, ownProps: QualityProfileSectionOwnPropModel) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as QualityProfileSectionState).selectedProfile : new QualityProfileFormModel(),
            (selectedProfile) => selectedProfile
        );
        return selector(state);
    }

    /**
     * gets initial profile info
     * @param state
     * @param ownProps
     */
    public getInitialProfile(state: any, ownProps: QualityProfileSectionOwnPropModel) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as QualityProfileSectionState).initialProfile : new QualityProfileFormModel(),
            (selectedProfile) => selectedProfile
        );
        return selector(state);
    }

    /**
     * gets popup state
     * @param state
     * @param ownProps
     */
    public getPopupState(state: any, ownProps: QualityProfileSectionOwnPropModel) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as QualityProfileSectionState).showPopup : false,
            (showPopup) => showPopup
        );
        return selector(state);
    }

    /**
     * gets languages
     * @param state
     * @param ownProps
     */
    public getLanguages(state: any, ownProps: QualityProfileSectionOwnPropModel) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as QualityProfileSectionState).languages : [],
            (languages) => languages
        );
        return selector(state);
    }

    /**
     * gets language quality profiles
     * @param state
     * @param ownProps
     */
    public getLanguageProfiles(state: any, ownProps: QualityProfileSectionOwnPropModel) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as QualityProfileSectionState).languageProfiles : [],
            (languageProfiles) => languageProfiles
        );
        return selector(state);
    }

    //#endregion public functions

}

export const qualityProfileSectionSelector = new QualityProfileSectionSelector();

