//#region react imports
//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';
import { ScanCascadeModel } from '../../../../shared';

import { ScheduleModel } from '../../models';

//#endregion application imports

export class ScheduleState extends ScanCascadeModel {

    //#region model properties

    public initialScheduleInfo?: ScheduleModel;
    public scheduleInfo?: ScheduleModel;
    public showConfig?: boolean;
    public cronValue?: string;

    //#endregion  model properties

    //#region constructor

    constructor() {
        super();
        this.cronValue = Constant.defaultCron;
    }

    //#endregion constructor

    //#region private methods
    //#endregion private methods

}