//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../shared';

import { QualityProfileSectionOwnPropModel } from './quality-profile-section-own-prop.model';
import { QualityProfileSectionDispatchPropModel } from './quality-profile-section-dispatch-prop.model';

//#endregion application imports

export interface QualityProfileSectionPropModel extends FormPropModel<any>, QualityProfileSectionOwnPropModel, QualityProfileSectionDispatchPropModel {
}