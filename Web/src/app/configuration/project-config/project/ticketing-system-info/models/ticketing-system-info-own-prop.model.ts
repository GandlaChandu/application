//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel } from '../../../../../shared';

import { TicketingSystemInfoState } from '../ticketing-system-info-store';
import { QualityProfileFormModel } from '../../../../config-shared/quality-profile-section';

//#endregion application imports

export interface TicketingSystemInfoFormOwnPropModel extends ListPageBasePropModel<QualityProfileFormModel>, TicketingSystemInfoState {
  
}
