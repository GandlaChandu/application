//#region react imports
//#endregion react imports

//#region application imports

import { PageRequestModel, DivisionModel, PageBaseDispatchPropModel } from '../../../../../shared';

//#endregion application imports

export interface DivisionSectionDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchFetchDivisions?: (id: number, pageRequest: PageRequestModel, errorCallback: (error?: any) => void) => void;
    dispacthDivisionPopupState?: (show: boolean, division?: DivisionModel) => void;
    dispatchSaveDivision?: (division: DivisionModel, successCallback: (response) => void, errorCallback: (error) => void) => void;
}