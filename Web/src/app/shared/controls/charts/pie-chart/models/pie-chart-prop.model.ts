//#region react imports
//#endregion react imports

//#region application imports

import { TextValuePairModel } from '../../../../../shared';

//#endregion application imports

export interface PieChartPropModel {
    VulnerabilityTypes?: TextValuePairModel[];
    label?: string[];
    dataSet?: number[];
}