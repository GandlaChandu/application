//#region react imports
//#endregion react imports

//#region application imports

import { PagedResult, DivisionModel } from '../../../../../shared';

//#endregion application imports

export interface DivisionSectionState {

    //#region model properties

    showDivisionTab?: boolean;
    divisions?: PagedResult<DivisionModel>;
    showDivisionPopup?: boolean;
    selectedDivision?: DivisionModel;

    //#endregion  model properties

}