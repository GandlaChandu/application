//#region react imports
//#endregion react imports

//#region application imports

import { PagedResult } from '../../../../shared';

import { UserModel } from '../../models';

//#endregion application imports

export class UserManagerState {
    public users?: PagedResult<UserModel>;
}