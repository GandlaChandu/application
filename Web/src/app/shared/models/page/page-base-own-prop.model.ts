//#region react imports

import { browserHistory } from 'react-router-dom';

//#endregion react imports

//#region application imports

import { PageState } from '../../global-states';
import { CoreState } from '../../../core';
import { UserRoleModel } from '../user-role.model';

//#endregion application imports

export interface PageBaseOwnPropModel extends PageState, CoreState {
    history?: browserHistory;
    isGlobalError?: boolean;
    userRoles?: UserRoleModel[];
}