//#region react imports
//#endregion react imports

//#region application imports

import { TicketModel } from '../../../../../shared';

//#endregion application imports

export class TicketingSystemInfoFormModel {
    public projectId: number;
    public configuration: TicketModel;
    public id: number;

    //Ticket system configurations
    public ticketSystemConfigurationId: number;
    public type: number;
    public ticketSystemType: number;
    public ticketSystemStatus?: any

    //GitHub
    public isTokenBased: boolean;
    public username: string;
    public password: string;
    public owner: string;
    public repositoryName: string;
    public isEnterpriseAccount: boolean;
    public enterpriseUrl: string;

}