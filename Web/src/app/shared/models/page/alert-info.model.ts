//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export class AlertInfoModel {
    public open: boolean;
    public messages?: string[];

    constructor() {
        this.open = false;
        this.messages = [];
    }
}