//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from './grid-header-prop.model';
import { FieldType } from '../field-type.enum';
import { GridRowModel } from './grid-row.model';

//#endregion application imports

export interface FormGridHeaderPropModel extends GridHeaderPropModel {
    isEditable?: (row: GridRowModel<any>) => boolean;
    editModeDataPropertyName?: string;
    renderControlCallback?: (row: GridRowModel<any>) => React.ReactNode;
    getFieldPropsCallBack?: (row) => any;
    editFieldType?: FieldType;
}