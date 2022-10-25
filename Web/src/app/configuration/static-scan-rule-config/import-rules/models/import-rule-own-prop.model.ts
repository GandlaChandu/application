//#region react imports
//#endregion react imports

//#region application imports

import { ImportRuleFilterFormModel } from './import-rule-filter-form.model';
import { ImportRuleState } from '../import-rule-store';

//#endregion application imports

export interface ImportRuleOwnPropModel extends ImportRuleState {
    formData?: ImportRuleFilterFormModel;
    selectedLanguage?: string;
}