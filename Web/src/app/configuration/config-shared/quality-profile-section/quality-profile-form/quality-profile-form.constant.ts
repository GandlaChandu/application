//#region react imports
//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

//#endregion application imports

export class QualityProfileFormConstant {

    public static readonly form: string = 'qualityProfileForm';

    public static readonly errorMessage = class {
        public static readonly languageRequired: string = `Language ${Constant.message.requiredMessage}`;
        public static readonly profileRequired: string = `Profile ${Constant.message.requiredMessage}`;
    }
}