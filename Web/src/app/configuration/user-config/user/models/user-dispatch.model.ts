//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel } from '../../../../shared';

import { UserModel } from '../../models';

//#endregion application imports

export interface UserDispatchModel extends PageBaseDispatchPropModel {
    dispatchSetUser?: (user: UserModel) => void;
    dispatchFetchAndSetUser?: (id: number, errorCallback: (response) => void ) => void;
    dispatchSaveUser?: (user: UserModel, successCallback: (response) => void, errorCallback: (response) => void) => void;
}