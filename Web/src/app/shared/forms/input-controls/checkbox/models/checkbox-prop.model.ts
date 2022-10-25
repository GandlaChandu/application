//#region react imports
//#endregion react imports

//#region application imports

import { FieldPropModel } from '../../base';

//#endregion application imports

export interface CheckcboxPropModel extends FieldPropModel {
    checked?: boolean;
    isLabelLeft?: boolean;
}