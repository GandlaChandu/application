//#region react imports
//#endregion react imports

//#region application imports

import { PageRequestModel, FilterModel } from '../../../models';
import { GridPaginationPropModel } from './grid-pagination-prop.model';
import { GridRowModel } from './grid-row.model';

//#endregion application imports

export interface GridBaseModel<T> {
    paginationInfo?: GridPaginationPropModel;
    data?: GridRowModel<T>[];
    isServerSide?: boolean;
    defaultSortBy?: string;
    defaultSortAsc?: boolean;
    onRefresh?: (pageRequestModel: PageRequestModel) => void;
    title?: string;
    filterInfo?: FilterModel[];
}