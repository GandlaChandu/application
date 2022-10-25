//#region react imports
//#endregion react imports

//#region application imports

import { FormGridOwnPropModel } from './form-grid-own-prop.model';

//#endregion application imports

export interface FormGridPropModel<T> extends FormGridOwnPropModel<T> {
    isEditableDefault?: boolean;
}