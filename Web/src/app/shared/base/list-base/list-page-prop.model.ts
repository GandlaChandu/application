//#region react imports
//#endregion react imports

//#region application imports

import { PageBasePropModel, PagedResult } from '../../models';

//#endregion application imports

export interface ListPageBasePropModel<T> extends PageBasePropModel {
    gridResultData?: PagedResult<T>;
    gridFormData?: T[];
}