//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel, PageRequestModel } from '../../../../shared';

//#endregion application imports

export interface UserManagerDispatchModel extends PageBaseDispatchPropModel {
    dispatchFetchUsers?: (pageRequestModel: PageRequestModel, errorCallback: (error) => void) => void;
}