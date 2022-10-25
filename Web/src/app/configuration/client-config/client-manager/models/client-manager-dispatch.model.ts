//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel, PageRequestModel } from '../../../../shared';

//#endregion application imports

export interface ClientManagerDispatchModel extends PageBaseDispatchPropModel {
    dispatchFetchClients?: (pageRequestModel: PageRequestModel, errorCallback: (error) => void) => void;
}