//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel } from '../../../../../shared';

import { StaticScanInfoState } from '../static-scan-info-store';
import { QualityProfileFormModel } from '../../../../config-shared/quality-profile-section';

//#endregion application imports

export interface StaticScanInfoFormOwnPropModel extends ListPageBasePropModel<QualityProfileFormModel>, StaticScanInfoState {
    entityId?: number;
    clientId?: number;
}
