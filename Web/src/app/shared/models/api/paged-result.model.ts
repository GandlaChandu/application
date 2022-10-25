//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export class PagedResult<T> {
    items?: Array<T>;
    total?: number;

    constructor() {
        this.items = new Array<T>();
        this.total = this.items.length;
    }
}