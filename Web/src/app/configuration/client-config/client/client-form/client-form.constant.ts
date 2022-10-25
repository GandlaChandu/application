//#region react imports
//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

//#endregion application imports

export class ClientFormConstant {

    public static readonly form: string = 'clientForm';

    public static readonly errorMessage = class {
        public static readonly clientRequired: string = `Client name ${Constant.message.requiredMessage}`;
        public static readonly clientMaxlen: string = `Client name ${Constant.message.maxLenMessage} 50`;
        public static readonly clientInValid: string = `Client name ${Constant.message.patternMessage}`;
    }
}