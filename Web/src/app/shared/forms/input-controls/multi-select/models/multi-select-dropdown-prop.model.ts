//#region react imports
//#endregion react imports

//#region application imports

import { FieldPropModel } from '../../base';
import { SelectListItemModel } from '../../drop-down';

//#endregion application imports

export interface MultiSelectDropDownPropModel extends FieldPropModel {
    options?: SelectListItemModel[];
    value?: any[];
} 
