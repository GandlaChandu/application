//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { ErrorInfoModel } from '../../../core';

import { ToasterInfoModel } from './toaster-info.model';
import { AlertInfoModel } from './alert-info.model';

//#endregion application imports

export interface PageBaseDispatchPropModel {
    dispatchSetTitle?: (title: string) => void;
    dispatchOpenToaster?: (toaster: ToasterInfoModel) => void;
    dispatchCloseToaster?: () => void;
    dispatchShowAlert?: (alertInfo: AlertInfoModel) => void;
    dispatchHideAlert?: () => void;
    dispatchSetError?: (error: ErrorInfoModel) => void;
    dispatchShowLoader?: (show: boolean) => void;
    dispatchSetEditMode?: (isEdit: boolean) => void;
    dispatchSubmitBtnState?: (isContinue: boolean) => void;
    dispatchPageLoadingState?: (isLoading: boolean) => void;

    dispatchResetControl?: (formModel: any, form: string, fieldKey: string) => void;

    dispatch?: ThunkDispatch<any, any, any>
}