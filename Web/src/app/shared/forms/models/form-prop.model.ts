//#region react imports

import { InjectedFormProps } from 'redux-form';

//#endregion react imports

//#region application imports
//#endregion application imports

export interface FormPropModel<FormData = {}> extends InjectedFormProps<FormData> {
    onReset?: () => void;
}