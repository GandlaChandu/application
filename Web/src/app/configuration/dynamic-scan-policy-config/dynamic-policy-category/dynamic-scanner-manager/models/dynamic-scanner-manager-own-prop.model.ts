//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel, GridRowModel } from '../../../../../shared';

import { DynamicPolicyCategoryState } from '../../dynamic-policy-category-store';
import { DynamicScannerModel } from '../../../models';

//#endregion application imports

export interface DynamicScannerManagerOwnPropModel extends ListPageBasePropModel<GridRowModel<DynamicScannerModel>>, DynamicPolicyCategoryState {
}
