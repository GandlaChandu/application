//#region react imports

import { connect } from 'react-redux';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { GlobalState, containerHelper } from '../../../shared';
import { IAppActionModel } from '../../../core';
import { EntityType } from '../../../utilities';

import { QualityProfileSectionComponent } from './quality-profile-section.component';
import { QualityProfileSectionOwnPropModel, QualityProfileSectionDispatchPropModel } from './models';
import { qualityProfileSectionSelector, QualityProfileSectionActionCreator } from './quality-profile-store';
import { QualityProfileFormModel } from './quality-profile-form';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state, ownprops): Selector<any, QualityProfileSectionOwnPropModel> {
    return createStructuredSelector(
        {
            showQualityProfileTab: (state) => qualityProfileSectionSelector.getQualityProfileTabState(state, ownprops),
            gridResultData: (state) => qualityProfileSectionSelector.getEntityProfiles(state, ownprops),
            languages: (state) => qualityProfileSectionSelector.getLanguages(state, ownprops),
            selectedProfile: (state) => qualityProfileSectionSelector.getSelectedProfile(state, ownprops),
            showPopup: (state) => qualityProfileSectionSelector.getPopupState(state, ownprops)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): QualityProfileSectionDispatchPropModel {
    return {

        ...containerHelper().mapDispatchToPropsBase(dispatch),

        dispatchEntityProfiles: (entityType: EntityType, entityId: number, errorCallback: (error?: any) => void) =>
            dispatch(QualityProfileSectionActionCreator.fetchEntityProfiles(entityType, entityId, errorCallback)),

        dispatchShowPopup: (show: boolean) =>
            dispatch(QualityProfileSectionActionCreator.setPopupState(show)),

        dispatchSaveEntityProfile: (request: QualityProfileFormModel, successCallback: (response?: any) => void, errorCallback: (error?: any) => void) =>
            dispatch(QualityProfileSectionActionCreator.saveEntityProfile(request, successCallback, errorCallback)),

        dispatchRemoveProfileMapping: (id: number, successCallback: (response?: any) => void, errorCallback: (error?: any) => void) =>
            dispatch(QualityProfileSectionActionCreator.removeProfileMapping(id, successCallback, errorCallback)),

        dispatchSetSelectedInfo: (profile: QualityProfileFormModel) =>
            dispatch(QualityProfileSectionActionCreator.setSelectedProfileInfo(profile)),

        dispatchSetInitialInfo: (profile: QualityProfileFormModel) =>
            dispatch(QualityProfileSectionActionCreator.setInitialProfile(profile))
    };
}

export const QualityProfileSectionContainer = connect(mapStateToProps, mapDispatchToProps)(QualityProfileSectionComponent);