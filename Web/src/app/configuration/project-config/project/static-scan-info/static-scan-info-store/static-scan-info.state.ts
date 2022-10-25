//#region react imports
//#endregion react imports

//#region application imports

import { SelectListItemModel, PagedResult } from '../../../../../shared';

import { QualityProfileSectionState, QualityProfileFormModel } from '../../../../config-shared';

//#endregion application imports

export class StaticScanInfoState implements QualityProfileSectionState {

    //#region model properties

    public codeScanTypes?: SelectListItemModel[];
    public sourceCodeTypes?: SelectListItemModel[];
    public sourceControlTypes?: SelectListItemModel[];
    public showCodeAnalysisDiv?: boolean;
    public staticIsTokenBased?: boolean;

    //Quality profile
    public showQualityProfileTab?: boolean;
    public selectedProfile?: QualityProfileFormModel;
    public showPopup?: boolean;
    public languages?: SelectListItemModel[];
    public languageProfiles?: SelectListItemModel[];
    public gridResultData?: PagedResult<QualityProfileFormModel>;
    public showForm?: boolean;
    //#endregion  model properties

    //#region constructor

    constructor() {
        this.codeScanTypes = [];
        this.sourceCodeTypes = [];
        this.sourceControlTypes = [];
        this.gridResultData = new PagedResult<QualityProfileFormModel>();
    }

    //#endregion constructor
}