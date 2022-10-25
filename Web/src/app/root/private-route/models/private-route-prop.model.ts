//#region react imports
//#endregion react imports

//#region application imports

import { CoreState } from '../../../core';
import { FunctionalCode } from '../../../utilities';

import { PrivateRouteOwnPropModel } from './private-route-own-prop.model';
import { PrivateRouteDispatchPropModel } from './private-route-dispatch-prop.model';

//#endregion application imports

export interface PrivateRoutePropModel extends PrivateRouteOwnPropModel, PrivateRouteDispatchPropModel, CoreState {    
    path?: string;
    component?: any;
    location?: any;
    code: FunctionalCode;
}