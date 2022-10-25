//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export class DynamicScanListModel {
    public id: number;
    public url: string;
    public statusId: number;
    public status: string;
    public isDeleted: boolean;
    public projectName: string;
    public projectId: number;
    public scanStartTime: Date;
    public scanEndTime: Date;
}