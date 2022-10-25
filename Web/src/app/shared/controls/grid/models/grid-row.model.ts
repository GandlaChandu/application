//#region react imports
//#endregion react imports

//#region application imports

import { GridRowEventModel } from './grid-row-event.model';

//#endregion application imports

export interface GridRowModel<T> extends GridRowEventModel {
    rowData?: T;
    index?: number;
}