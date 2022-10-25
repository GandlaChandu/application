//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../shared';

import { UserMapManagerOwnPropModel } from './user-map-manager-own-prop.model';
import { UserMapManagerDispatchPropModel } from './user-map-manager-dispatch-prop.model';
import { UserMapSectionModel } from '../../../config-shared';

//#endregion application imports

export interface UserMapManagerPropModel extends FormPropModel<UserMapSectionModel[]>,  UserMapManagerOwnPropModel, UserMapManagerDispatchPropModel {
}