//#region react imports
//#endregion react imports

//#region application imports

import { QualityProfileFormModel } from './quality-profile-form.model';

//#endregion application imports

export interface QualityProfileFormDispatchPropModel {
    dispatchFetchLanguages: (errorCallback: (error?: any) => void) => void;
    dispatchFetchLanguageProfiles: (languageId: number, errorCallback: (error?: any) => void) => void;
    dispatchSetSelectedInfo?: (profile: QualityProfileFormModel) => void;
}