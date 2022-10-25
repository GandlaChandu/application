//#region react imports
//#endregion react imports

//#region application imports

import { Constant } from '../../../../../utilities';

//#endregion application imports

export class DivisionFormConstant {

    public static readonly form: string = 'divisionForrm';

    public static readonly errorMessage = class {
        public static readonly divisionRequired: string = `Division name ${Constant.message.requiredMessage}`;
        public static readonly divisionInValid: string = `Division name ${Constant.message.patternMessage}`;
        public static readonly divisionMaxlen: string = `Client name ${Constant.message.maxLenMessage} 50`;

    }
}