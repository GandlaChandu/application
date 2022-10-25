//#region react imports
//#endregion react imports

//#region application imports

import { ScanCascadeFormModel } from '../../../shared';

import { ScheduleDetailModel } from './schedule-detail.model';

//#endregion application imports

export class ScheduleModel implements ScanCascadeFormModel {
    public id?: number;
    public name?: string;
    public isEnabled?: boolean;
    public isScheduled?: boolean;
    public client?: string;
    public project?: string;
    public division?: string;
    public isDeleted?: boolean;
    public schedule?: ScheduleDetailModel;

    public clientId?: number;
    public divisionId?: number;
    public projectId?: number;
    public scanTypeId?: any;

    constructor() {
        this.isEnabled = true;
    }

}