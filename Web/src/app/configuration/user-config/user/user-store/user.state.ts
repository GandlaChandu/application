//#region react imports
//#endregion react imports

//#region application imports

import { SelectListItemModel } from '../../../../shared';

import { UserModel } from '../../models';

//#endregion application imports

export class UserState {

    //#region model properties

    public user?: UserModel;
    public roleOptions?: SelectListItemModel[];

    //#endregion  model properties

    //#region constructor

    constructor() {
        this.roleOptions = [];
    }

    //#endregion constructor

    //#region private methods
    //#endregion private methods

}