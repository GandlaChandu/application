//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel, DivisionModel, ClientModel } from '../../../../../shared';

import { DivisionSectionState } from '../division-store';

//#endregion application imports

export interface DivisionSectionOwnPropModel extends ListPageBasePropModel<DivisionModel>, DivisionSectionState {
    client?: ClientModel;
}
