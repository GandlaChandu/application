//#region react imports
//#endregion react imports

//#region application imports

import { ProjectManagerRequestModel } from '../../models/project-manager-request.model';

//#endregion application imports

export interface ProjectFilterDispatchPropModel {
    dispatchFetchClients?: () => void;
    dispatchFetchDivisions?: (clientId: number) => void;
    dispatchShowDivision?: (show: boolean) => void;
    dispatchFetchProjects?: (pageRequest: ProjectManagerRequestModel) => void;
    dispatchResetControl: (formModel: any, form: string, fieldKey: string) => void;
}