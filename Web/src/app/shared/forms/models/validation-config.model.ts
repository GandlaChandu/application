//#region react imports
//#endregion react imports

//#region application imports

import { ValidatorType } from '../validators/validator-type.enum';

//#endregion application imports

export interface ValidationConfigModel {
    validatorType: ValidatorType;
    errorMessage: string;
    config?: any;
}