//#region react imports

import { ReactChild } from 'react';

//#endregion react imports

//#region application imports
//#endregion application imports

export interface PopupPropModel {
    open: boolean;
    closeHandler: (...args: any[]) => void;
    popupHeader?: string;
    popupContent?: ReactChild;
    popupFooter?: ReactChild;
    showCloseIcon?: boolean;
    scrollable?: boolean;
    size?: string;
    dialogClassName?: string;
}