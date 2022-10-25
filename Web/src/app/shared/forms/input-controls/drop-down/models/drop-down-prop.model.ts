//#region react imports
//#endregion react imports

//#region application imports

import { FieldPropModel } from '../../base';
import { SelectListItemModel } from './select-list-item.model';

//#endregion application imports

export interface DropDownPropModel extends FieldPropModel {
    options: SelectListItemModel[];
    removeClear?: boolean;
}