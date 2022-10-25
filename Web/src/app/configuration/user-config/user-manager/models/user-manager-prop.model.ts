//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel } from '../../../../shared';

import { UserManagerDispatchModel } from './user-manager-dispatch.model';
import { UserModel } from '../../models';

//#endregion application imports

export interface UserManagerPropModel extends ListPageBasePropModel<UserModel>, UserManagerDispatchModel {
}