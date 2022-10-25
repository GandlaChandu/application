//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseOwnPropModel } from '../../../../shared';

import { QualityProfileConfigState } from '../quality-profile-config-store';

//#endregion application imports

export interface QualityProfileConfigOwnPropModel extends PageBaseOwnPropModel, QualityProfileConfigState {
    showImportRulesPopup?: string;
}