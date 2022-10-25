//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export class ClientModel {
    public id: number;
    public name: string;
    public isActive: boolean;
    public dynamicScanPolicyId: number;

    constructor() {
        this.id = 0;
        this.name = '';
        this.isActive = true;
    }
}