//#region react imports
//#endregion react imports

//#region application imports

import { GridActionType } from '../grid-action-type.enum';
import { GridActionElementModel } from './grid-action-element.model';

//#endregion application imports

export class FormGridActionElementModel extends GridActionElementModel {

    public uniqueKey?: string;

    /**
     * type of action element control
     */ 
    public actionType?: GridActionType = GridActionType.Button;

    /**
     * property name value for the form control to bind. Should be specified except for button types
     */
    public dataPropertyName?: string;

    /**
     * field props to fetch if required for a form type action
     */ 
    getFieldPropsCallBack?: (row) => any;

}