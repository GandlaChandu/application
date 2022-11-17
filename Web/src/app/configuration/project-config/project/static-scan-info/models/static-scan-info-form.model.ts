//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export class StaticScanInfoFormModel {

    public staticScanId: number;
    public codeOrCodeURL: string;
    public staticScanUserName: string;
    public staticScanPassword: string;
    public staticScanTypes: number[];
    public sourceCodeTypeId: number;
    public sourceControlTypeId: number;
    public projectId: number;
    public isTokenBased: boolean;
    public projectPath: string;

    constructor() {
        this.staticScanTypes = [];
    }
}