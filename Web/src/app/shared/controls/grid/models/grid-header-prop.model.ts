//#region react imports
//#endregion react imports

//#region application imports

import { ColType } from '../../../../utilities';

import { GridDataCellPropModel } from './grid-data-cell.model';

//#endregion application imports

export interface GridHeaderPropModel extends GridDataCellPropModel {
    canFilter?: boolean;
    canSort?: boolean;
    hidden?: boolean;
    dataPropertyName?: string;
    format?: (row: any) => React.ReactNode;
    type?: ColType;
    width?: string;
}