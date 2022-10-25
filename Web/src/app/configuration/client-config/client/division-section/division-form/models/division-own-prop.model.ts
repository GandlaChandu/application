//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel, DivisionModel } from '../../../../../../shared';

import { DivisionSectionState } from '../../division-store';

//#endregion application imports

export interface DivisionFormOwnPropModel extends FormPropModel<DivisionModel>, DivisionSectionState {
}
