//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { GridActionFieldType, ButtonComponent, ListComponentBase, PageRequestModel, GridRowModel, Helper } from '../../../shared';
import { Constant, Url, StaticScanStatus, FunctionalCode } from '../../../utilities';

import { StaticScanListPropModel, StaticScanListModel } from './models';
import { StaticScanListConstant } from './static-scan-list.constant';

//#endregion application imports

export class StaticScanListComponent extends ListComponentBase<StaticScanListPropModel, StaticScanListModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.StaticViewList);

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
            StaticScanListConstant.headers.projectName,
            {
                ...StaticScanListConstant.headers.url,
                format: (row: GridRowModel<StaticScanListModel>) =>
                    <a href={row.rowData.url} target="_blank" rel="noopener noreferrer">{row.rowData.url}</a>
            },
            StaticScanListConstant.headers.userName,
            {
                ...StaticScanListConstant.headers.startDate,
                format: (row: GridRowModel<StaticScanListModel>) => Helper.dateFormat(row.rowData.startTime, Constant.format.dateTimeFormat)
            },
            {
                ...StaticScanListConstant.headers.endDate,
                format: (row: GridRowModel<StaticScanListModel>) => Helper.dateFormat(row.rowData.endTime, Constant.format.dateTimeFormat)
            },
            StaticScanListConstant.headers.status
        ];

        this.gridPropModel.actionElements = [
            {
                type: GridActionFieldType.View,
                onClick: this.onViewResultsLinkClick.bind(this),
                canDisplay: (row: GridRowModel<StaticScanListModel>) => {
                    if (row.rowData.status === StaticScanStatus.Completed) {
                        return true;
                    }
                    return false;
                },
                tooltip: StaticScanListConstant.viewTooltip

            },
            {
                type: GridActionFieldType.Redo,
                onClick: this.onRedoLinkClick.bind(this),
                canDisplay: (row: GridRowModel<StaticScanListModel>) => {
                    if (row.rowData.status === StaticScanStatus.Completed ||
                        row.rowData.status === StaticScanStatus.Failed) {
                        return true;
                    }
                    return false;
                },
                tooltip: StaticScanListConstant.redoTooltip
            }
        ];
    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult(pageRequest: PageRequestModel) {
        this.props.dispatchFetchStaticResults(pageRequest, this.handleApiFetchError.bind(this));
    }

    /**
     * on view results link click callback
     * @param resultInfo
     */
    public onViewResultsLinkClick(resultInfo: StaticScanListModel) {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.staticScanResultsPage,
                    state: { resultInfo: resultInfo }
                }
            );
        }
    }

    /**
     * on redo link click callback
     * @param rowData
     */
    public onRedoLinkClick(resultInfo: StaticScanListModel) {
        this.props.dispatchInitiateScan(resultInfo.projectId,
            (response) => {
                this.handleApiSaveSuccess(response);
                if (this.isApiResponseSuccess(response)) {
                    this.props.dispatchFetchStaticResults(this.getPageRequestInfo(), this.handleApiFetchError.bind(this));
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
                    pathname: Url.pageUrl.staticScanTriggerPage
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
