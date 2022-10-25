//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { GridActionFieldType, ButtonComponent, ListComponentBase, PageRequestModel, Helper, GridRowModel } from '../../../shared';
import { Constant, Url, DynamicScanStatus, FunctionalCode } from '../../../utilities';

import { DynamicScanListPropModel, DynamicScanListModel } from './models';
import { DynamicScanListConstant } from './dynamic-scan-list.constant';

//#endregion application imports

export class DynamicScanListComponent extends ListComponentBase<DynamicScanListPropModel, DynamicScanListModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.DynamicViewList);

    }

    //#endregion constructor

    //#region life cycle hooks

    /**
     * renders html for component 
     */
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12 text-right">
                        {this.renderTriggerScanLink()}
                    </div>
                </div>
                {this.renderTable()}
            </div>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * sets grid props 
     */
    public setGridInfo() {
        this.gridPropModel.headerCells = [
            DynamicScanListConstant.headers.projectName,
            {
                ...DynamicScanListConstant.headers.url,
                format: (row: GridRowModel<DynamicScanListModel>) => <a href={row.rowData.url} target="_blank" rel="noopener noreferrer">{row.rowData.url}</a>
            },
            {
                ...DynamicScanListConstant.headers.startDate,
                format: (row: GridRowModel<DynamicScanListModel>) => Helper.dateFormat(row.rowData.scanStartTime, Constant.format.dateTimeFormat)
            },
            {
                ...DynamicScanListConstant.headers.endDate,
                format: (row: GridRowModel<DynamicScanListModel>) => Helper.dateFormat(row.rowData.scanEndTime, Constant.format.dateTimeFormat)
            },
            DynamicScanListConstant.headers.status
        ];
        this.gridPropModel.actionElements = [
            {
                type: GridActionFieldType.View,
                onClick: this.onViewResultsLinkClick.bind(this),
                canDisplay: (row: GridRowModel<DynamicScanListModel>) => {
                    if (row.rowData.status === DynamicScanStatus.Completed) {
                        return true;
                    }
                    return false;
                },
                tooltip: DynamicScanListConstant.viewTooltip
            },
            {
                type: GridActionFieldType.Redo,
                onClick: this.onRedoLinkClick.bind(this),
                canDisplay: (row: GridRowModel<DynamicScanListModel>) => {
                    if (row.rowData.status === DynamicScanStatus.Completed ||
                        row.rowData.status === DynamicScanStatus.Failed) {
                        return true;
                    }
                    return false;
                },
                tooltip: DynamicScanListConstant.redoTooltip
            }
        ];

    }

    /**
     * gets data for grid 
     * @param pageRequestModel
     */
    public fetchGridResult(pageRequestModel: PageRequestModel) {
        this.props.dispatchFetchDynamicResults(pageRequestModel, this.handleApiFetchError.bind(this));
    }

    /**
     * on view results link click callback
     * @param rowData
     */
    public onViewResultsLinkClick(resultInfo: DynamicScanListModel) {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.dynamicScanResultsPage,
                    state: { resultInfo: resultInfo }
                }
            );
        }
    }

    /**
     * on redo link click callback
     * @param rowData
     */
    public onRedoLinkClick(resultInfo: DynamicScanListModel) {
        this.props.dispatchInitiateScan(resultInfo.projectId,
            (response) => {
                this.handleApiSaveSuccess(response);
                if (this.isApiResponseSuccess(response)) {
                    this.props.dispatchFetchDynamicResults(this.getPageRequestInfo(), this.handleApiFetchError.bind(this));
                }

            },
            this.handleApiSaveError.bind(this)
        );
    }

    /**
     * on trigger scan link click callback
     
     */
    public onTriggerScanLinkClick() {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.dynamicScanTriggerPage
                }
            );
        }
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     *  renders html for add client link
     */
    private renderTriggerScanLink() {
        return (
            <ButtonComponent
                type="button"
                displayText="New Scan"
                displayType="link"
                id="btn_add_edit_add_division"
                fontIconPrefix="fa fa-plus"
                className="btn-primary"
                clickHandler={this.onTriggerScanLinkClick.bind(this)}
            >
            </ButtonComponent>
        );
    }

    //#endregion private methods
}