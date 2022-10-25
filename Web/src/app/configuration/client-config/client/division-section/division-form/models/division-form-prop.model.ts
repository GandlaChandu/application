//#region react imports
//#endregion react imports

//#region application imports

import { PageBasePropModel } from '../../../../../../shared';

import { DivisionFormOwnPropModel } from './division-own-prop.model';
import { DivisionFormDispatchPropModel } from './division-form-dispatch-prop.model';

//#endregion application imports

export interface DivisionFormPropModel extends DivisionFormOwnPropModel, DivisionFormDispatchPropModel, PageBasePropModel {
}