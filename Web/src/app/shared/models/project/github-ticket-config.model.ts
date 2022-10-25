//#region react imports
//#endregion react imports

//#region application imports

import { TicketModel } from './ticket.model';

//#endregion application imports

export class GitHubTicketConfigModel extends TicketModel {
    public isTokenBased: boolean;
    public username: string;
    public password: string;
    public owner: string;
    public name: string;
    public isEnterpriseAccount: boolean;
    public enterpriseUrl: string;
}