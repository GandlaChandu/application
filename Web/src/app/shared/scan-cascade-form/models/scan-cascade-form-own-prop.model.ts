//#region react imports
//#endregion react imports

//#region application imports

import { ScanTypeEnum } from '../../../utilities';

import { ScanCascadeModel } from './scan-cascade.model';

//#endregion application imports

export interface ScanCascadeFormOwnPropModel extends ScanCascadeModel{
    namespace?: string;
    scanType?: ScanTypeEnum;
    showScanTypeOptions?: boolean;
    submitBtnText?: string;
    submitBtnIcon?: string;
    removeValidation?: boolean;
    excludeForm?: boolean;
    formData?: ScanCascadeModel;
    isScanTypeMulti?: boolean;
    includeDateRange?: boolean;
    excludeClientCascade?: boolean;
    scanFormData?: ScanCascadeModel;
}