//#region react imports
//#endregion react imports

//#region application imports

import { TextValuePairModel } from '../../../shared';

//#endregion application imports

export class RecentScanModel {
    public projectId: number;
    public projectName: string;
    public scanDate: string;
    public scanTypeId: number;
    public url: string;
    public vulnerabilities: TextValuePairModel[];
}