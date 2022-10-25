//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel } from '../../../../shared';

import { ProjectManagerRequestModel } from './project-manager-request.model';

//#endregion application imports

export interface ProjectManagerDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchFetchProjects?: (pageRequest: ProjectManagerRequestModel, errorCallback: (error?: any) => void) => void;
}