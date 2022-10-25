//#region react imports
//#endregion react imports

//#region application imports

import { StaticScanInfoFormModel } from '../../static-scan-info/models/static-scan-info-form.model';

//#endregion application imports

export class ProjectFormModel extends StaticScanInfoFormModel {

    public projectId: number;

    public clientId: number;
    public divisionId: number;

    public projectName: string;
    public isActive: boolean;

    constructor() {
        super();
        this.isActive = true;
    }
}