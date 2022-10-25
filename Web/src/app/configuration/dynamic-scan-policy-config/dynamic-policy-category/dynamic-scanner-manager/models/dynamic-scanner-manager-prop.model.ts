//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../../shared';

import { DynamicScannerManagerOwnPropModel } from './dynamic-scanner-manager-own-prop.model';
import { DynamicScannerManagerDispatchPropModel } from './dynamic-scanner-manager-dispatch-prop.model';
import { DynamicScannerModel } from '../../../models';

//#endregion application imports

export interface DynamicScannerManagerPropModel extends FormPropModel<DynamicScannerModel[]>, DynamicScannerManagerOwnPropModel, DynamicScannerManagerDispatchPropModel {
    formData?: any;
}