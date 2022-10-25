//#region react imports
//#endregion react imports

//#region application imports

import { SelectListItemModel } from '../../forms';
import { ScanCascadeFormModel } from './scan-cascade-form.model';

//#endregion application imports

export class ScanCascadeModel implements ScanCascadeFormModel {

    //#region model properties

    public clients?: SelectListItemModel[];
    public divisions?: SelectListItemModel[];
    public projects?: SelectListItemModel[];
    public scanTypes?: SelectListItemModel[];

    public clientId?: number;
    public divisionId?: number;
    public projectId?: number;
    public scanTypeId?: number;
    public startDate?: Date;
    public endDate?: Date;

    //#endregion  model properties

    //#region constructor

    constructor() {
        this.clients = [];
        this.divisions = [];
        this.projects = [];
        this.scanTypes = [];
    }

    //#endregion constructor

    //#region private methods
    //#endregion private methods

}