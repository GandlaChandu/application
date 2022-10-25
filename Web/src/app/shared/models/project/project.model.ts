//#region react imports
//#endregion react imports

//#region application imports

import { StaticScanDetailModel } from './static-scan-detail.model';
import { DynamicScanDetailModel } from './dynamic-scan-detail.model';
import { TicketModel } from './ticket.model';

//#endregion application imports

export class ProjectModel {
    public id: number;
    public name: string;
    public clientId: number;
    public divisionId: number;
    public scanTypes: number[];
    public staticScanDetails: StaticScanDetailModel;
    public dynamicScanDetails: DynamicScanDetailModel;
    public dynamicScanPolicyId: number;
    public ticketSystemConfiguration: TicketModel;
    public isActive: boolean;

    //to identify initial dynamic policy mapping exists or not
    public hasDynamicPolicyMapping?: boolean;

    constructor() {
        this.isActive = true;
    }
}