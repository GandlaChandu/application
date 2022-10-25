//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export class DivisionSectionModel {

    public staticScanId: number;
    public codeOrCodeURL: string;
    public staticScanUserName: string;
    public staticScanPassword: string;
    public staticScanTypes: number[];
    public sourceCodeTypeId: number;
    public sourceControlTypeId: number;

    constructor() {
        this.staticScanTypes = [];
    }
}