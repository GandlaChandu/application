//#region react imports
//#endregion react imports

//#region application imports

import { EntityType } from '../../../../utilities';

import { QualityProfileFormModel } from '../quality-profile-form';

//#endregion application imports

export interface QualityProfileSectionDispatchPropModel {
    dispatchEntityProfiles?: (entityType: EntityType, entityId: number, errorCallback: (error?: any) => void) => void;
    dispatchShowPopup?: (show: boolean) => void;
    dispatchSaveEntityProfile?: (profile: QualityProfileFormModel, successCallback: (response?: any) => void, errorCallback: (error?: any) => void) => void;
    dispatchRemoveProfileMapping: (id: number, successCallback: (response) => void, errorCallback: (error) => void) => void;
    dispatchSetSelectedInfo?: (profile: QualityProfileFormModel) => void;
    dispatchSetInitialInfo?: (profile: QualityProfileFormModel) => void;

}