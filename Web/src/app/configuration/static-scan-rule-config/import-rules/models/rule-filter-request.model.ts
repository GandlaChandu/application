//#region react imports
//#endregion react imports

import { PaginationModel } from '../../../../shared';

//#region application imports
//#endregion application imports

export class RuleFilterRequestModel {
    public languageId?: number;
    public severities?: string;
    public sonarSourceSecurities?: string;
    public pagination?: PaginationModel;
}