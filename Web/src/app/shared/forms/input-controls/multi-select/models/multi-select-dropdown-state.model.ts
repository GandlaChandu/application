//#region react imports
//#endregion react imports

//#region application imports

import { KeyNamePairModel } from '../../../../models';

//#endregion application imports

export class MultiSelectDropDownStateModel {
    //#region model properties
    public selectedOptions: KeyNamePairModel[];
    public selectedOptionText:string[];
    //#endregion model properties

    //#region constructor

    constructor() {
        this.selectedOptions=[];
        this.selectedOptionText=[];
    }

    //#endregion constructor

    //#region private methods
    //#endregion private methods
}