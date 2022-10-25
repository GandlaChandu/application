//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { Url, FunctionalCode } from '../../../utilities';
import { GridActionFieldType, ButtonComponent, ListComponentBase, PageRequestModel, GridRowModel, Helper } from '../../../shared';

import { ScheduleManagerPropModel } from './models/schedule-manager-prop.model';
import './schedule-manager.scss';
import { ScheduleManagerConstant } from './schedule-manager.constant';
import { ScheduleModel } from '../models';

//#endregion application imports

export class ScheduleManagerComponent extends ListComponentBase<ScheduleManagerPropModel, ScheduleModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.ScheduleViewLlist);

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
                        {this.renderAddScheduleLink()}
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
            ScheduleManagerConstant.headers.title,
            ScheduleManagerConstant.headers.client,
            ScheduleManagerConstant.headers.division,
            ScheduleManagerConstant.headers.project,
            ScheduleManagerConstant.headers.scanType,
            {
                ...ScheduleManagerConstant.headers.isActive,
                format: (row: GridRowModel<ScheduleModel>) => Helper.toString(row.rowData.isEnabled)
            }
        ];
        this.gridPropModel.actionElements = [
            {
                type: GridActionFieldType.Edit,
                onClick: this.onEditLinkClick.bind(this)
            },
            {
                type: GridActionFieldType.Delete,
                onClick: this.onDeleteLinkClick.bind(this)
            }
        ];
    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult(pageRequest: PageRequestModel) {
        this.props.dispatchFetchSchedules(pageRequest, this.handleApiFetchError.bind(this));
    }

    /**
     * on edit link click callback
     * @param rowData
     */
    public onEditLinkClick(rowData: ScheduleModel) {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.addEditSchedulePage,
                    state: { schedule: rowData, isEdit: true }
                }
            );
        }
    }

    /**
     * on delete link click callback
     * @param rowData
     */
    public onDeleteLinkClick(rowData: ScheduleModel) {
        let schedule: ScheduleModel = {
            ...rowData,
        };
        this.props.dispatchDeleteSchedule(
            schedule,
            (response) => {
                this.handleApiSaveSuccess(response);
                this.props.dispatchFetchSchedules(this.getPageRequestInfo(), this.handleApiFetchError.bind(this));
            },
            this.handleApiSaveError.bind(this)
        );
    }

    /**
     * on add schedule link click
     */
    public onAddScheduleClick() {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.addEditSchedulePage,
                    state: { isEdit: false }
                }
            );
        }
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     *  renders html for add schedule link
     */
    private renderAddScheduleLink() {
        return (
            <ButtonComponent
                type="button"
                displayText="Add Job Schedule"
                displayType="link"
                id="btn_add_edit_add_schedule"
                fontIconPrefix="fa fa-plus"
                className="btn-primary"
                clickHandler={this.onAddScheduleClick.bind(this)}
            >
            </ButtonComponent>
        );
    }

    //#endregion private methods
}