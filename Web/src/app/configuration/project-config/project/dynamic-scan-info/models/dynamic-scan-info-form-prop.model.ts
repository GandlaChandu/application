//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../../shared';

import { DynamicScanInfoFormOwnPropModel } from './dynamic-scan-info-own-prop.model';
import { DynamicScanInfoFormDispatchPropModel } from './dynamic-scan-info-form-dispatch-prop.model';
import { DynamicScanInfoFormModel } from './dynamic-scan-info-form.model';

//#endregion application imports

export interface DynamicScanInfoFormPropModel extends FormPropModel<DynamicScanInfoFormModel>, DynamicScanInfoFormOwnPropModel, DynamicScanInfoFormDispatchPropModel {
    appAnalysisInfo?: DynamicScanInfoFormModel;
}