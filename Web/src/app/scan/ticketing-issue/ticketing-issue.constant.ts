//#region react imports
//#endregion react imports

//#region application imports

import { Constant } from '../../utilities';

//#endregion application imports

export class TicketingIssueConstant {

    public static readonly form: string = 'ticketingIssueForm';

    public static readonly errorMessage = class {
        public static readonly titleRequired: string = `Title ${Constant.message.requiredMessage}`;
        public static readonly bodyRequired: string = `Body ${Constant.message.requiredMessage}`;
    }
}