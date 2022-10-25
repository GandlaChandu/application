//#region react imports
//#endregion react imports

//#region application imports

import { GridActionFieldType } from '../grid-action-field-type.enum';
import { GridRowModel } from './grid-row.model';
import { GridActionType } from '../grid-action-type.enum';

//#endregion application imports

export class GridActionElementModel {


    public id?: string;

    /**
     * type of action element control
     */ 
    public actionType?: GridActionType = GridActionType.Button;

    /**
     * type of action buttons
     */ 
    public type?: GridActionFieldType = GridActionFieldType.None;

    /**
     * specify if grid component renders action based on action field type if title has to be displayed
     */
    public title?: string;

    /**
     * specify if grid component renders action based on action field type if tooltip has to be displayed
     */
    public tooltip?: string;

    /**
     * specify if grid component renders action based on action field type if onClick has to be executed
     */
    public onClick?: (rowData: any, gridRow?: GridRowModel<any>) => void;

    /**
     * specifies if action can be displayed
     */
    public canDisplay?: (rowData: any) => boolean;

    /**
     * specifies if action can be displayed
     */
    public isDisabled?: (rowData: any) => boolean;

    /**
     * specify if tooltip should not be displayed
     */
    public noTooltip?: boolean;

}