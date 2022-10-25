//#region react imports
//#endregion react imports

//#region application imports

import { TextValuePairModel } from '../../../../shared';

//#endregion application imports

export interface ResultInfoPropModel {
    date?: string;
    projectDate?: string;
    projectName?: string;
    url?: string;
    vulnerabilities?: TextValuePairModel[];
}