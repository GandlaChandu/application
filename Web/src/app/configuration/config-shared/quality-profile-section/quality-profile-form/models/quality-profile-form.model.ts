//#region react imports
//#endregion react imports

//#region application imports

import { EntityType } from '../../../../../utilities';

//#endregion application imports

export class QualityProfileFormModel {
    public id?: number;
    public entityType?: EntityType;
    public entityId?: number;
    public qualityProfileId?: number;
    public languageId?: number;
    public languageName?: string;
    public qualityProfileName?: string;
    public qualityProfilePreferences?: any[];
    public clientId?: number;
    public isDisable?: boolean;

    constructor(){
        this.isDisable = true;
    }
}