//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export class GridPaginationPropModel {
    public rowOptions?: number[] = [5, 10, 25];
    public totalRows: number = 0;
    public rowsPerPage: number = 5;
    //1-based index
    public page: number = 1;
    public onPageChange?: (event: any, pageNumber: number) => void = () => { };
    public onRowsPerPageChange?: (_) => void;
    isDisabled?: boolean;

}