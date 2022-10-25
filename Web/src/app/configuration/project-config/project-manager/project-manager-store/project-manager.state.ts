//#region react imports
//#endregion react imports

//#region application imports

import { PagedResult, SelectListItemModel, ProjectModel } from '../../../../shared';

//#endregion application imports

export class ProjectManagerState {
    public projects?: PagedResult<ProjectModel>;
    public clients?: SelectListItemModel[];
    public divisions?: SelectListItemModel[];

    public showDivision?: boolean;

    constructor() {
        this.projects = new PagedResult<ProjectModel>();
        this.clients = [];
        this.divisions = [];
        this.showDivision = false;
    }
}