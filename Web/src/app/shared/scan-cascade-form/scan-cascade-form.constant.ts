//#region react imports
//#endregion react imports

//#region application imports

import { Constant } from '../../utilities';

//#endregion application imports

export class ScanCascadeFormConstant {

    public static readonly form: string = 'scanCascadeForm';

    public static readonly errorMessage = class {
        public static readonly clientRequired: string = `Client ${Constant.message.requiredMessage}`;
        public static readonly divisionRequired: string = `Division ${Constant.message.requiredMessage}`;
        public static readonly projectRequired: string = `Project ${Constant.message.requiredMessage}`;
        public static readonly scanTypeRequired: string = `Scan Type ${Constant.message.requiredMessage}`;
        public static readonly startDateRequired: string = `Start Date ${Constant.message.requiredMessage}`;
        public static readonly endDateRequired: string = `End Date ${Constant.message.requiredMessage}`;

    }

    public static readonly formField = class {
        public static readonly client: string = 'clientId';
        public static readonly division: string = 'divisionId';
        public static readonly project: string = 'projectId';
        public static readonly scanType: string = 'scanTypeId';
        public static readonly startDate: string = 'startDate';
        public static readonly endDate: string = 'endDate';
    }
}