//#region react imports
//#endregion react imports

//#region application imports

import { PermissionOwnPropModel } from './permission-own-prop.model';
import { PermissionDispatchPropModel } from './permission-dispatch-prop.model';
import { PageBasePropModel } from '../../models';

//#endregion application imports

export interface PermissionPropModel extends PermissionOwnPropModel, PermissionDispatchPropModel, PageBasePropModel {
  
}