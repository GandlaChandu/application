//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../../shared';

import { ProjectFilterOwnPropModel } from './project-filter-own-prop.model';
import { ProjectFilterDispatchPropModel } from './project-filter-dispatch-prop.model';
import { ProjectFilterFormModel } from '../../models';

//#endregion application imports

export interface ProjectFilterPropModel extends FormPropModel<ProjectFilterFormModel>, ProjectFilterOwnPropModel, ProjectFilterDispatchPropModel {
}
