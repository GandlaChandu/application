//#region react imports
//#endregion react imports

//#region application imports

import {
    ListComponentBase,
    GridRowModel
} from '../../../../shared';

import './dynamic-scanner-manager.scss';
import { DynamicScannerManagerPropModel } from './models';
import { DynamicScannerManagerConstant } from './dynamic-scanner-manager.constant';
import { DynamicScannerModel } from '../../models';

//#endregion application imports

export class DynamicScannerManagerComponent extends ListComponentBase<DynamicScannerManagerPropModel, DynamicScannerModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props, DynamicScannerManagerConstant.form);
    }

    //#endregion constructor

    //#region life cycle hooks

    /**
     * renders html for component 
     */
    render() {
        return this.renderFormTable();
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * gets grid props
     */
    public setGridInfo() {
        this.gridPropModel.paginationInfo.isDisabled = true;
        this.gridPropModel.headerCells = [
            DynamicScannerManagerConstant.headers.scannerName,
            {
                ...DynamicScannerManagerConstant.headers.alertThresholdValue,
                getFieldPropsCallBack: (row) => { return { options: this.props.alertThresholdTypes }; }
            },
            {
                ...DynamicScannerManagerConstant.headers.attackStrengthValue,
                getFieldPropsCallBack: (row) => { return { options: this.props.attackStrengthTypes }; }
            }
        ];
        this.gridPropModel.actionElements = this.getGridEditSaveActionModel(this.onRowSave.bind(this));
    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult() {
        this.props.dispatchFetchPolicyScannerlist(
            {
                scanPolicyCode: this.props.dynamicCategoryInfo.scanPolicyCode,
                categoryId: this.props.dynamicCategoryInfo.id,
            },
            this.handleApiFetchError.bind(this));
    }

    /**
     * on row save event
     * @param row
     */
    public onRowSave(row: GridRowModel<DynamicScannerModel>) {
        this.props.dispatchUpdateScanner(
            this.props.dynamicCategoryInfo,
            row.rowData,
            (response) => {
                this.handleApiSaveSuccess(response);
                if (this.isApiResponseSuccess(response)) {
                    this.fetchGridResult();
                }
            },
            this.handleApiSaveError.bind(this));
    }

    //#endregion events callbacks/public methods

    //#region private methods
    //#endregion private methods
}
