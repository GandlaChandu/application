//#region react imports
//#endregion react imports

//#region application imports

import { Constant } from '../../../utilities';

//#endregion application imports

export class ScheduleDetailModel {
    public id?: number;
    public jobId?: number;
    public isActive?: boolean;
    public cronSchedule?: string;
    public cronScheduleDesc?: string;
    public startDate?: Date;
    public endDate?: Date;
    public isDeleted?: boolean;

    constructor() {
        this.cronSchedule = Constant.defaultCron;
        this.isActive = true;
    }

}