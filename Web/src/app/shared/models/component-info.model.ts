import { FunctionalCode } from '../../utilities';

export class ComponentInfoModel {
    public prevPageUrl?: string;
    public code?: FunctionalCode;
    public hasPermission?: boolean;
    public userRoles?: any[];
    public isScreen?: boolean;
    public pageTitle?: string;

    constructor() {
        this.userRoles = [];
    }
}