//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../shared';

import { UserDispatchModel } from './user-dispatch.model';
import { UserOwnPropModel } from './user-own-prop.model';
import { UserModel } from '../../models';

//#endregion application imports

export interface UserPropModel extends FormPropModel<UserModel>, UserDispatchModel, UserOwnPropModel {
}