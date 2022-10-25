//#region react imports
//#endregion react imports

//#region application imports

import { GridBaseModel } from './grid-base.model';
import { FormGridHeaderPropModel } from './form-grid-header-prop.model';
import { FormGridActionElementModel } from './form-grid-action-element.model';

//#endregion application imports

export interface FormGridOwnPropModel<T> extends GridBaseModel<T> {
    headerCells?: FormGridHeaderPropModel[];
    actionElements?: FormGridActionElementModel[];
}