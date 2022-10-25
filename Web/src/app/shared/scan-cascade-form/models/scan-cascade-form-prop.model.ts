//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../shared';

import { ScanCascadeFormDispatchPropModel } from './scan-cascade-form-dispatch-prop.model';
import { ScanCascadeFormOwnPropModel } from './scan-cascade-form-own-prop.model';
import { ScanCascadeFormModel } from './scan-cascade-form.model';
import { PageBasePropModel } from '../../models';

//#endregion application imports

export interface ScanCascadeFormPropModel extends FormPropModel<ScanCascadeFormModel>,
    ScanCascadeFormOwnPropModel,
    ScanCascadeFormDispatchPropModel,
    PageBasePropModel {
}