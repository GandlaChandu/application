//#region react imports
//#endregion react imports

//#region application imports

import { ValidationConfigModel } from '../../models';

//#endregion application imports

export interface FieldPropModel {
    id?: string;
    disabled?: boolean;
    required?: boolean;
    label?: string;
    validations?: ValidationConfigModel[];
    value?: any;
    helpText?: string;
}