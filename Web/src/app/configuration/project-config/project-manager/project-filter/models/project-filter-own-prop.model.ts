//#region react imports
//#endregion react imports

//#region application imports

import { SelectListItemModel } from '../../../../../shared';

import { ProjectFilterFormModel } from '../../models';

//#endregion application imports

export interface ProjectFilterOwnPropModel {
    clients?: SelectListItemModel[];
    divisions?: SelectListItemModel[];
    formData?: ProjectFilterFormModel;
    showDivision?: boolean;
}
