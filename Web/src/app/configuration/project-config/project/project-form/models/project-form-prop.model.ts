//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel, PageBasePropModel } from '../../../../../shared';

import { ProjectFormOwnPropModel } from './project-form-own-prop.model';
import { ProjectFormDispatchPropModel } from './project-form-dispatch-prop.model';
import { ProjectFormModel } from './project-form.model';

//#endregion application imports

export interface ProjectFormPropModel extends FormPropModel<ProjectFormModel>, ProjectFormOwnPropModel, ProjectFormDispatchPropModel, PageBasePropModel {
}