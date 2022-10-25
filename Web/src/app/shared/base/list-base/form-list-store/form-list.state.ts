//#region react imports
//#endregion react imports

//#region application imports

import { GridRowModel } from '../../../controls';

//#endregion application imports

export interface FormListState<T> {
    formlist?: GridRowModel<T>[];
    total?: number;
}