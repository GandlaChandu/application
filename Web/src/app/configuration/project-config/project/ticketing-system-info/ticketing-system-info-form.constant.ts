//#region react imports
//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

//#endregion application imports

export class TicketingSystemInfoFormConstant {

    public static readonly form: string = 'TicketingSystemForm';

    public static readonly errorMessage = class {
        public static readonly ticketingSystemTypeRequired: string = `Ticketing system type ${Constant.message.requiredMessage}`;
        public static readonly ticketingSystemTokenRequired: string = `Token ${Constant.message.requiredMessage}`;
        public static readonly ticketingSystemUsernameRequired: string = `Username ${Constant.message.requiredMessage}`;
        public static readonly ticketingSystemPasswordRequired: string = `Password ${Constant.message.requiredMessage}`;
        public static readonly ticketingSystemOwnerRequired: string = `Owner ${Constant.message.requiredMessage}`;
        public static readonly ticketingSystemRepositoryNameRequired: string = `Repository name ${Constant.message.requiredMessage}`;
        public static readonly ticketingSystemEnterpriseUrlRequired: string = `Enterprise Url ${Constant.message.requiredMessage}`;
        public static readonly ticketingSystemEnterpriseUrlInValid: string = `Enterprise Url ${Constant.message.patternMessage}`;
    }
}