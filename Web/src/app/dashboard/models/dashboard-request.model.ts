//#region react imports
//#endregion react imports

//#region application imports

import { PageRequestModel } from '../../shared';

//#endregion application imports

export class DashboardRequestModel {

    //#region model properties

    public clientId?: number;
    public divisionId?: number;
    public projectId?: number;
    public scanType?: number;
    public scanId?: number;
    public vulnerabilityTrendPeriod?: number;
    public startDate?: Date;
    public endDate?: Date;
    public listParameter?: PageRequestModel;
    public accessibleClients?: number[];
    public clientName?: string;
    public divisionName?: string;
    public projectName?: string;

    //#endregion  model properties

    //#region constructor

    constructor() {
        this.clientId = 0;
        this.divisionId = 0;
        this.projectId = 0;
        this.scanType = null;
        this.scanId = 0;
        this.vulnerabilityTrendPeriod = 30;
    }

    //#endregion constructor


}