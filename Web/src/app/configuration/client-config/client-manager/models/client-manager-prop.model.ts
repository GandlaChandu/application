//#region react imports
//#endregion react imports

//#region application imports

import { ClientModel, ListPageBasePropModel } from '../../../../shared';

import { ClientManagerDispatchModel } from './client-manager-dispatch.model';

//#endregion application imports

export interface ClientManagerPropModel extends ListPageBasePropModel<ClientModel>, ClientManagerDispatchModel {
}