//#region react imports
//#endregion react imports

//#region application imports

import { UserProfileModel } from '../../shared';

import { ErrorInfoModel, LoaderInfoModel, AuthInfoModel } from '../models';

//#endregion application imports

export class CoreState {
    public errorInfo?: ErrorInfoModel;
    public loaderInfo?: LoaderInfoModel;
    public autheticationInfo?: AuthInfoModel;
    public isSSORedirect?: boolean;
    public userProfile?: UserProfileModel;

    constructor() {
        this.errorInfo = new ErrorInfoModel();
        this.loaderInfo = new LoaderInfoModel();
        this.autheticationInfo = new AuthInfoModel();
        this.isSSORedirect = false;
    }
}