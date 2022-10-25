//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { GridActionFieldType, ListComponentBase, PageRequestModel, GridRowModel } from '../../shared';
import { Url } from '../../utilities';

import './project-list-section.scss';
import { ProjectListSectionConstant } from './project-list-section.constant';
import { ProjectListSectionPropModel, ProjectListSectionModel } from './models';
import { DashboardRequestModel } from '../models';

//#endregion application imports

export class ProjectListSectionComponent extends ListComponentBase<ProjectListSectionPropModel, ProjectListSectionModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * renders html for component 
     */
    render() {
        return (
            <div className="project-list">
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
            ProjectListSectionConstant.headers.projectName,
            {
                ...ProjectListSectionConstant.headers.stats,
                format: (row: GridRowModel<ProjectListSectionModel>) =>
                    <p className="counts">
                        <label className="disc-danger">{row.rowData.high ? row.rowData.high : 0}</label>
                        <label className="disc-warning">{row.rowData.medium ? row.rowData.medium : 0}</label>
                        <label className="disc-info">{row.rowData.low ? row.rowData.low : 0}</label>
                    </p>
            }
        ];
        this.gridPropModel.actionElements = [
            {
                type: GridActionFieldType.View,
                onClick: this.onViewResultsClick.bind(this),
                tooltip: 'View Project Stats'
            }
        ];
    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult(pageRequest: PageRequestModel) {
        let dashboardRequest: DashboardRequestModel = {
            listParameter: pageRequest
        };
        this.props.dispatchFetchProjects(dashboardRequest, this.handleApiFetchError.bind(this));
    }

    /**
     * on view results link click callback
     * @param row
     */
    public onViewResultsClick(row) {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.manageProjectDashboardPage,
                    state: { projectInfo: row }
                }
            );
        }
    }

    //#endregion events callbacks/public methods

    //#region private methods
    //#endregion private methods
}