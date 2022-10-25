//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export interface ButtonFieldModel {
    id?: string;
    displayText?: string;
    className?: string;
    clickHandler?: (...args: any[]) => any;
    mouseEnterHandler?: (...args: any[]) => any;
    mouseLeaveHandler?: (...args: any[]) => any;
    type?: 'button' | 'submit' | 'reset';
    size?: 'small' | 'medium' | 'large';
    title?: string;
    displayType?: 'button' | 'link' | 'ghost' | 'help';
    fontIconPrefix?: string;
    fontIconSuffix?: string;
    disabled?: boolean;
}