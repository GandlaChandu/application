//#region react imports
//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

//#endregion application imports

export class DynamicScanPolicyFormConstant {

    public static readonly form: string = 'dynamicScanRuleForm';

    public static readonly errorMessage = class {
         public static readonly scanPolicyNameRequired: string = `Scan policy name ${Constant.message.requiredMessage}`;
    }
}