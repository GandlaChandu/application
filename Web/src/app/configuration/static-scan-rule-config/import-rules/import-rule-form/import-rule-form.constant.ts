//#region react imports
//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

//#endregion application imports

export class ImportRuleFormConstant {

    public static readonly form: string = 'importRuleForm';

    public static readonly errorMessage = class {
        public static readonly languageRequired: string = `Language ${Constant.message.requiredMessage}`;
        public static readonly nameRequired: string = `Profile name ${Constant.message.requiredMessage}`;
        public static readonly profileMaxlen: string = `Profile name ${Constant.message.maxLenMessage} 50`;
       
    }
}