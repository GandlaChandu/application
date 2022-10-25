//#region react imports
//#endregion react imports

//#region application imports

import { FilterModel } from './filter.model';
import { SortModel } from './sort.model';
import { PaginationModel } from './pagination.model';

//#endregion application imports

export class PageRequestModel {
    public filter?: FilterModel[];
    public sortField?: SortModel;
    public pagination?: PaginationModel;

    constructor() {
        this.filter = [];
        this.pagination = new PaginationModel();
    }
}