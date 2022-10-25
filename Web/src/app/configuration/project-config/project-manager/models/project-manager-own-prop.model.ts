//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel, ProjectModel } from '../../../../shared';

import { ProjectFilterFormModel } from './project-filter-form.model';

//#endregion application imports

export interface ProjectManagerOwnPropModel extends ListPageBasePropModel<ProjectModel> {
    formData?: ProjectFilterFormModel
}
