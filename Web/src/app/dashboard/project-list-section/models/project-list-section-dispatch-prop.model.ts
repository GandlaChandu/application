//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel, ErrorFn, PageRequestModel } from '../../../shared';
import { DashboardRequestModel } from '../../models';

//#endregion application imports

export interface ProjectListSectionDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchFetchProjects?: (request: DashboardRequestModel, errorCallback: ErrorFn) => void;
}