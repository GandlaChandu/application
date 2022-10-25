//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../../shared';

import { StaticScanInfoFormOwnPropModel } from './static-scan-info-own-prop.model';
import { StaticScanInfoFormDispatchPropModel } from './static-scan-info-form-dispatch-prop.model';
import { StaticScanInfoFormModel } from './static-scan-info-form.model';
import { ProjectState } from '../../project-store'

//#endregion application imports

export interface StaticScanInfoFormPropModel extends FormPropModel<StaticScanInfoFormModel>, StaticScanInfoFormOwnPropModel, StaticScanInfoFormDispatchPropModel, ProjectState {

}