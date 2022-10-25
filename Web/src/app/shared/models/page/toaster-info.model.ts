//#region react imports
//#endregion react imports

//#region application imports

import { MessageType } from '../../../utilities';

//#endregion application imports

export class ToasterInfoModel {
    public open: boolean;
    public handleClose?: () => void;
    public messageType?: MessageType;
    public message?: string;

    constructor() {
        this.open = false;
        this.messageType = MessageType.Info;
        this.message = '';
    }
}