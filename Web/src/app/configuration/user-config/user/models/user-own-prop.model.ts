//#region react imports
//#endregion react imports

//#region application imports

import { PageBasePropModel } from '../../../../shared';

import { UserState } from '../user-store';

//#endregion application imports

export interface UserOwnPropModel extends PageBasePropModel, UserState  {
}