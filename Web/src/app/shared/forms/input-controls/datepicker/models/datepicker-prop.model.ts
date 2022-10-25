//#region react imports
//#endregion react imports

//#region application imports

import { FieldPropModel } from '../../base';

//#endregion application imports

export interface DatepickerPropModel extends FieldPropModel {
    placeHolder?: string;
    type?: string;
    selectsStart?: boolean;
    startDate?: any;
    endDate?: any;
    selectsEnd?: boolean;
    minDate?: any;
    maxDate?: any;
}