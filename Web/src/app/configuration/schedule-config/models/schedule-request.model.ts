//#region react imports
//#endregion react imports

//#region application imports

import { ScheduleDetailModel } from './schedule-detail.model';

//#endregion application imports

export class ScheduleRequestModel {
  
    public id?: number;
    public name?: string;
    public isEnabled?: boolean;
    public isScheduled?: boolean;
   
    public isDeleted?: boolean;
    public schedule?: ScheduleDetailModel;

    public clientId?: number;
    public divisionId?: number;
    public projectId?: number;

    //For api request
    public scanTypes?: [{ scanType?: number }];

    constructor() {
        this.isEnabled = true;
    }

}