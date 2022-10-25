//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from './grid-header-prop.model';
import { GridBaseModel } from './grid-base.model';
import { GridActionElementModel } from './grid-action-element.model';

//#endregion application imports

export interface GridOwnPropModel<T> extends GridBaseModel<T> {
    headerCells?: GridHeaderPropModel[];
    actionElements?: GridActionElementModel[];
}