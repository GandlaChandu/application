//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../../shared';

import { QualityProfileFormModel } from './quality-profile-form.model';
import { QualityProfileSectionState } from '../../quality-profile-store';

//#endregion application imports

export interface QualityProfileFormOwnPropModel extends FormPropModel<QualityProfileFormModel>, QualityProfileSectionState {
    isEdit?: boolean;
    clientId?: number;
}
