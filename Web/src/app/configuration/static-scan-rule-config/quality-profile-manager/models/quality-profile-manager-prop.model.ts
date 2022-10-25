//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel } from '../../../../shared';

import { QualityProfileManagerDispatchPropModel } from './quality-profile-manager-dispatch-prop.model';
import { LanguageProfileMapModel } from '../../models';

//#endregion application imports

export interface QualityProfileManagerPropModel extends ListPageBasePropModel<LanguageProfileMapModel>, QualityProfileManagerDispatchPropModel {

}