//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel } from '../../../../shared';

import { UserMapSectionModel } from './user-map-section.model';
import { UserMapSectionState } from '../user-map-section-store';

//#endregion application imports

export interface UserMapSectionOwnPropModel extends ListPageBasePropModel<UserMapSectionModel>, UserMapSectionState {
    namespace?: string;
}
