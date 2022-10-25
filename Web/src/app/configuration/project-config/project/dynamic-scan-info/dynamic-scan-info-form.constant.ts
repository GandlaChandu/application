//#region react imports
//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

//#endregion application imports

export class DynamicScanInfoFormConstant {

    public static readonly form: string = 'dynamicScanForm';

    public static readonly errorMessage = class {

        public static readonly codeUrlRequired: string = `Code url ${Constant.message.requiredMessage}`;
        public static readonly codeUrlInvalid: string = `Code url ${Constant.message.patternMessage}`;

        public static readonly appAnalysisUserNameRequired: string = `User name ${Constant.message.requiredMessage}`;
        public static readonly appAnalysisPasswordRequired: string = `Password ${Constant.message.requiredMessage}`;

        public static readonly applicationUrlRequired: string = `Application url ${Constant.message.requiredMessage}`;
        public static readonly applicationUrlInvalid: string = `Application url ${Constant.message.patternMessage}`;

        public static readonly tokenRequired: string = `Token ${Constant.message.requiredMessage}`;

    }
}