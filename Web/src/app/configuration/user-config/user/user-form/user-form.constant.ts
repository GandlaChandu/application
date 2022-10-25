//#region react imports
//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

//#endregion application imports

export class UserFormConstant {

    public static readonly form: string = 'userForm';

    public static readonly errorMessage = class {
        public static readonly firstNameRequired: string = `First Name ${Constant.message.requiredMessage}`;
        public static readonly firstNameMaxlen: string = `First Name ${Constant.message.maxLenMessage} 50`;
        public static readonly firstNameInValid: string = `First Name ${Constant.message.patternMessage}`;

        public static readonly lastNameRequired: string = `Last Name ${Constant.message.requiredMessage}`;
        public static readonly lastNameMaxlen: string = `Last Name ${Constant.message.maxLenMessage} 50`;
        public static readonly lastNameInValid: string = `Last Name ${Constant.message.patternMessage}`;

        public static readonly emailRequired: string = `Email ${Constant.message.requiredMessage}`;

        public static readonly roleRequired: string = `Role ${Constant.message.requiredMessage}`;

    }
}