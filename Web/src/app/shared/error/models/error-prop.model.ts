//#region react imports
//#endregion react imports

//#region application imports

import { ErrorInfoModel } from '../../../core';

//#endregion application imports

export class ErrorPropModel {
    public errorInfo?: ErrorInfoModel;
    public dispatchClearError?: () => void;
    public dispatchSetError?: (error: ErrorInfoModel) => void;
    public history?: any;
}