//#region react imports
//#endregion react imports

import { ToasterInfoModel, AlertInfoModel } from '../models';

//#region application imports
//#endregion application imports

export class PageState {
    public pageTitle?: string;
    public showMenu?: boolean;
    public toasterInfo?: ToasterInfoModel;
    public alertInfo?: AlertInfoModel;
    public showUserIconDropdown?: boolean;

    public isEditMode?: boolean;
    public isSaveAndContinue?: boolean;

    public isLoading?: boolean;

    constructor() {
        this.pageTitle = '';
        this.showMenu = true;
        this.toasterInfo = new ToasterInfoModel();
        this.showUserIconDropdown = false;
        this.isLoading = true;
    }
}