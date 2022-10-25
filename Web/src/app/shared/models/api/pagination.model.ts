//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export class PaginationModel {
    public pageNumber: number;
    public pageSize: number;

    constructor() {
        this.pageNumber = 1;
        this.pageSize = 5;
    }
}