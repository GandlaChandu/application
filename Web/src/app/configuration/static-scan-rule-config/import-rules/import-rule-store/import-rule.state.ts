//#region react imports
//#endregion react imports

//#region application imports

import { SelectListItemModel, PagedResult, GridRowModel, FormListState } from '../../../../shared';

import { RuleModel } from '../../models';
import { ImportRuleFilterFormModel } from '../models';

//#endregion application imports

export class ImportRuleState implements FormListState<RuleModel> {

    //#region model properties

    public severityTypes?: SelectListItemModel[];
    public vulnerabilityTypes?: SelectListItemModel[];
    public selectedLanguage?: string;
    public rules?: PagedResult<RuleModel>;
    public profileBasedRules?: PagedResult<RuleModel>;
    public filterFormData?: ImportRuleFilterFormModel;
    public formlist?: GridRowModel<RuleModel>[];
    public total?: number;

    //#endregion  model properties

    //#region constructor

    constructor() {
        this.severityTypes = [];
        this.vulnerabilityTypes = [];
        this.rules = new PagedResult<RuleModel>();
        this.profileBasedRules = new PagedResult<RuleModel>();
        this.formlist = [];
    }

    //#endregion constructor

    //#region private methods
    //#endregion private methods

}