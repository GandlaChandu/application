//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel } from '../../../../shared';
import { EntityType } from '../../../../utilities';

import { QualityProfileSectionState } from '../quality-profile-store';
import { QualityProfileFormModel } from '../quality-profile-form'

//#endregion application imports

export interface QualityProfileSectionOwnPropModel extends ListPageBasePropModel<QualityProfileFormModel>, QualityProfileSectionState {
    namespace?: string;
    entityType?: EntityType;
    entityId?: number;
    clientId?: number;
    isEnable?: boolean;
}
