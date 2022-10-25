//#region react imports
//#endregion react imports

//#region application imports

import { AppRootOwnPropModel } from './app-root-own-prop.model';
import { AppRootDispatchPropModel } from './app-root-dispatch-prop.model';

//#endregion application imports

export interface AppRootPropModel extends AppRootOwnPropModel, AppRootDispatchPropModel {
    isAutheticated?: boolean;
}