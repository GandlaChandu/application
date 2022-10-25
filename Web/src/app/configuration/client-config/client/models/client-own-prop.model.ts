//#region react imports
//#endregion react imports

//#region application imports

import { ClientModel, ListPageBasePropModel } from '../../../../shared';

import { QualityProfileFormModel } from '../../../config-shared';
import { ClientState } from '../client-store';

//#endregion application imports

export interface ClientOwnPropModel extends ListPageBasePropModel<QualityProfileFormModel>, ClientState  {
    client?: ClientModel;
}