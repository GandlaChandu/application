//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseOwnPropModel } from '../../../../shared';

import { ProjectState } from '../project-store';

//#endregion application imports

export interface ProjectOwnPropModel extends PageBaseOwnPropModel, ProjectState {
}