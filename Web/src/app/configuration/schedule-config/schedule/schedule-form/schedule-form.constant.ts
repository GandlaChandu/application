//#region react imports
//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

//#endregion application imports

export class ScheduleFormConstant {

    public static readonly form: string = 'scheduleForm';

    public static readonly errorMessage = class {
        public static readonly nameRequired: string = `First Name ${Constant.message.requiredMessage}`;
        public static readonly startDateRequired: string = `Start Date ${Constant.message.requiredMessage}`;
        public static readonly endDateRequired: string = `End Date ${Constant.message.requiredMessage}`;

    }
}