//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../../shared';

import { DivisionSectionOwnPropModel } from './division-section-own-prop.model';
import { DivisionSectionDispatchPropModel } from './division-section-dispatch-prop.model';

//#endregion application imports

export interface DivisionSectionPropModel extends FormPropModel<any>, DivisionSectionOwnPropModel, DivisionSectionDispatchPropModel {
}