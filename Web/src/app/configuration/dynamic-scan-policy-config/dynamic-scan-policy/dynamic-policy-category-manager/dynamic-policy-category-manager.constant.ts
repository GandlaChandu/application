//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from '../../../../shared';

//#endregion application imports

export class DynamicPolicyCategoryManagerConstant {

    public static readonly headers = class {
        public static readonly policyName: GridHeaderPropModel = {
            title: 'Category Name',
            dataPropertyName: 'name',
            canSort: true
        };
        public static readonly attackStrength: GridHeaderPropModel = {
            title: 'Attack Strength',
            dataPropertyName: 'attackStrengthValue'
        };
        public static readonly alertThreshold: GridHeaderPropModel = {
            title: 'Alert Threshold',
            dataPropertyName: 'alertThresholdValue'
        };
        public static readonly isActive: GridHeaderPropModel = {
            title: 'Is Active',
            dataPropertyName:'enabled',
            canSort: true
        };
    }
}