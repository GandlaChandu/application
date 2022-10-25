//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel, ClientModel } from '../../../../shared';

import { ClientDispatchModel } from './client-dispatch.model';
import { ClientOwnPropModel } from './client-own-prop.model';

//#endregion application imports

export interface ClientPropModel extends FormPropModel<ClientModel>, ClientDispatchModel, ClientOwnPropModel {
}