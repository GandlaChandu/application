//#region react imports
//#endregion react imports

//#region application imports

import { SelectListItemModel, PagedResult } from '../../../../shared';

import { QualityProfileFormModel } from '../quality-profile-form';

//#endregion application imports

export interface QualityProfileSectionState {

    //#region model properties

    showQualityProfileTab?: boolean;
    initialProfile?: QualityProfileFormModel;
    gridResultData?: PagedResult<QualityProfileFormModel>;
    showPopup?: boolean;
    languages?: SelectListItemModel[];
    languageProfiles?: SelectListItemModel[];
    selectedProfile?: QualityProfileFormModel;

    //#endregion  model properties

}