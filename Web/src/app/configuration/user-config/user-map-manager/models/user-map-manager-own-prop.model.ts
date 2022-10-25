//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel, GridRowModel } from '../../../../shared';

import { UserMapManagerState } from '../user-map-manager-store';
import { UserMapSectionModel } from '../../../config-shared';

//#endregion application imports

export interface UserMapManagerOwnPropModel extends
    ListPageBasePropModel<GridRowModel<UserMapSectionModel>>,
    UserMapManagerState {   
    namespace?: string;
}
