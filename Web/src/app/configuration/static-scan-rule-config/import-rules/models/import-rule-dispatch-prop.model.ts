//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel } from '../../../../shared';

import { ImportRuleFilterFormModel } from './import-rule-filter-form.model';

//#endregion application imports

export interface ImportRuleDispatchPropModel extends PageBaseDispatchPropModel {    
    dispatchFetchSeverityTypes: (errorCallback: (error?: any) => void) => void;
    dispatchFetchVulnerabilityTypes: (errorCallback: (error?: any) => void) => void;
    dispatchSetSelectedLanguage?: (selectedLanguage: string) => void;
    dispatchSetFilterForm?: (formData: ImportRuleFilterFormModel) => void;
}