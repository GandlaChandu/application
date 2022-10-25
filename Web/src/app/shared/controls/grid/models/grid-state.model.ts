//#region react imports
//#endregion react imports

//#region application imports

import { FilterModel } from '../../../models';
import { ColType } from '../../../../utilities';

//#endregion application imports

export class GridState {
    public filterInfo?: FilterModel;
    public showOperator?: boolean;
    public showFromValue?: boolean;
    public colType?: ColType;
    public enableSearch?: boolean;
    constructor() {
        this.filterInfo = new FilterModel();
    }
}

