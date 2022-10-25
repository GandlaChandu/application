//#region react imports
//#endregion react imports

//#region application imports

import { QualityProfileConfigState } from '../../quality-profile-config-store';

//#endregion application imports

export interface QualityProfileFormOwnPropModel extends QualityProfileConfigState {
    showImportRulesPopup?: string;
    selectedLanguage?: string;
}