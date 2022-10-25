//#region react imports
//#endregion react imports

//#region application imports

import { SelectListItemModel, PagedResult } from '../../../../shared';

import { RuleModel, LanguageProfileMapModel } from '../../models';

//#endregion application imports

export class QualityProfileConfigState {

    //#region model properties

    public languageTypes?: SelectListItemModel[];
    public qualityProfileInfo?: LanguageProfileMapModel;
    public showImportRulesPopup?: string;
    public selectedLanguage?: string;
    public severity?: any;
    public vulnerability?: any;
    public profileLanguage?: number;
    public importProfileBasedRules?: PagedResult<RuleModel>;

    //#endregion  model properties

    //#region constructor

    constructor() {
        // this.showImportRulesPopup = false;
        this.languageTypes = [];
        this.importProfileBasedRules = new PagedResult<RuleModel>();
    }

    //#endregion constructor

}