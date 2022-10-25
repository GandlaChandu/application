//#region react imports
//#endregion react imports

//#region application imports

import { FieldPropModel } from '../../base';
import { SelectListItemModel } from '../../drop-down/models';

//#endregion application imports

export interface AutoCompletePropModel extends FieldPropModel {
    options: SelectListItemModel[];
    
}