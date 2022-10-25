//#region react imports
//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

//#endregion application imports

export class ProjectFormConstant {

    public static readonly form: string = 'projectForm';

    public static readonly errorMessage = class {
        public static readonly clientRequired: string = `Client name ${Constant.message.requiredMessage}`;
        public static readonly divisionRequired: string = `Division name ${Constant.message.requiredMessage}`;
        public static readonly analysisRequired: string = `Analysis type ${Constant.message.requiredMessage}`;

        public static readonly projectRequired: string = `Project name ${Constant.message.requiredMessage}`;
        public static readonly projectInvalid: string = `Project name ${Constant.message.patternMessage}`;
        public static readonly projectMaxlen: string = `Client name ${Constant.message.maxLenMessage} 50`;
    }
}