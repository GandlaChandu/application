//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel } from '../../../shared';
import { ErrorInfoModel } from '../../../core';

//#endregion application imports

export interface PrivateRouteDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchSetErrorStatusCode?: (error: ErrorInfoModel) => void;
}