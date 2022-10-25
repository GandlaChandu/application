//#region react imports
//#endregion react imports

//#region application imports

import './grid.scss';
import { GridPropModel } from './models/grid-prop.model';
import { GridRowModel } from './models/grid-row.model';
import { GridBase } from './grid.base';

//#endregion application imports

export class GridComponent<T> extends GridBase<GridPropModel<T>> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on action click event
     * @param row
     * @param clickHandler
     */
    public onActionClick(row: GridRowModel<T>, clickHandler: (rowData: any, gridRow?: GridRowModel<any>) => void) {
        if (clickHandler) {
            clickHandler(row.rowData, row);
        }
    }

    //#endregion event callbacks/public methods

    //#region protected methods
    //#endregion protected methods
}
