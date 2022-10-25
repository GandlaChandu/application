//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel, PageBasePropModel } from '../../../../../shared';

import { QualityProfileFormOwnPropModel } from './quality-profile-form-own-prop.model';
import { QualityProfileFormDispatchPropModel } from './quality-profile-form-dispatch-prop.model';
import { LanguageProfileMapModel } from '../../../models';

//#endregion application imports

export interface QualityProfileFormPropModel extends FormPropModel<LanguageProfileMapModel>, QualityProfileFormOwnPropModel, QualityProfileFormDispatchPropModel, PageBasePropModel {
}