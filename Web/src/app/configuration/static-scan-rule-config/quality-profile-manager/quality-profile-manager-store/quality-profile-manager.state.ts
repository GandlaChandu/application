//#region react imports
//#endregion react imports

//#region application imports

import {  PagedResult } from '../../../../shared';

import { LanguageProfileMapModel } from '../../models';

//#endregion application imports

export class QualityProfileManagerState {

    public qualityProfiles?: PagedResult<LanguageProfileMapModel>;

    constructor() {
        this.qualityProfiles = new PagedResult<LanguageProfileMapModel>();
    }
}