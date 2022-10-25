//#region react imports
//#endregion react imports

//#region application imports

//#endregion application imports

export class DynamicConfigBaseModel {
    public id?: number;
    public name?: string;
    public scanPolicyCode?: string;

    public attackStrengthValue?: string;
    public attackStrength?: number;

    public alertThresholdValue?: string;
    public alertThreshold?: number;

    public isDeleted?: boolean;
    public enabled?: boolean;

    constructor() {
        this.isDeleted = false;
    }
}