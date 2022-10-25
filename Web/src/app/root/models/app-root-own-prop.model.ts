//#region react imports
//#endregion react imports

//#region application imports

import { PageState, PageBaseOwnPropModel } from '../../shared';
import { CoreState } from '../../core';

//#endregion application imports

export interface AppRootOwnPropModel extends PageBaseOwnPropModel, PageState, CoreState {
    isGlobalError?: boolean;
}