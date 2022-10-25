//#region react imports
//#endregion react imports

//#region application imports

//#endregion application imports

export class UserModel {
    public id?: number;
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public roles?: string[];
    public isActive?: boolean;

    constructor() {
        this.roles = [];
        this.isActive = true;
    }

}