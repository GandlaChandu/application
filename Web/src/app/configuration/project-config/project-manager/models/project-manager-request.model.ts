//#region react imports
//#endregion react imports

import { PageRequestModel } from '../../../../shared';

//#region application imports
//#endregion application imports

export class ProjectManagerRequestModel {
    public clientId?: number;
    public divisionId?: number;
    public searchTerm?: string;
    public listParameter: PageRequestModel;
}