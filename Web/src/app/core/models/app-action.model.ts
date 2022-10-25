//#region react imports

import { Action } from 'redux';

//#endregion react imports

//#region application imports
//#endregion application imports

export interface IAppActionModel<T> extends Action {
    payload: T
}