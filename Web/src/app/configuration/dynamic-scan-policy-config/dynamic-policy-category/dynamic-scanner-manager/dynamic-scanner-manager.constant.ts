//#region react imports
//#endregion react imports

//#region application imports

import { FormGridHeaderPropModel, FieldType } from '../../../../shared';

//#endregion application imports

export class DynamicScannerManagerConstant {

    public static readonly form: string = 'dynamicScannerManagerForm';
    public static readonly gridFieldName: string = 'form';

    public static readonly headers = class {
        public static readonly scannerName: FormGridHeaderPropModel = {
            title: 'Test Name',
            dataPropertyName: 'name'
        };
        public static readonly alertThresholdValue: FormGridHeaderPropModel = {
            title: 'Threshold',
            dataPropertyName: 'alertThresholdValue',
            editModeDataPropertyName: 'alertThreshold',
            isEditable: (row) => true,
            editFieldType: FieldType.Dropdown
        };
        public static readonly attackStrengthValue: FormGridHeaderPropModel = {
            title: 'Strength',
            dataPropertyName: 'attackStrengthValue',
            editModeDataPropertyName: 'attackStrength',
            isEditable: (row) => true,
            editFieldType: FieldType.Dropdown
        };
    }
}