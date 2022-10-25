//#region react imports
//#endregion react imports

//#region application imports

import { PageBasePropModel } from '../../../../../shared';

import { QualityProfileFormDispatchPropModel } from './quality-profile-form-dispatch-prop.model';
import { QualityProfileFormOwnPropModel } from './quality-profile-own-prop.model';

//#endregion application imports

export interface QualityProfileFormPropModel extends QualityProfileFormOwnPropModel, QualityProfileFormDispatchPropModel, PageBasePropModel {
    // languageId?: number;
}