//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { ButtonComponent, Helper, GridActionFieldType, ListComponentBase, PageRequestModel, ProjectModel, GridRowModel } from '../../../shared';
import { Url, FunctionalCode } from '../../../utilities';

import './project-manager.scss';
import { ProjectManagerConstant } from './project-manager.constant';
import { ProjectFilterForm } from './project-filter/project-filter.form';
import { ProjectManagerPropModel, ProjectFilterFormModel } from './models';

//#endregion application imports

export class ProjectManagerComponent extends ListComponentBase<ProjectManagerPropModel, ProjectModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.ProjectViewList);

    }

    //#endregion constructor

    //#region life cycle hooks

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                <div>
                    <div className="row">
                        <div className="col-sm-12 text-right">
                            {this.renderAddLink()}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <ProjectFilterForm
                                onReset={this.onResetClick.bind(this)}
                                onSubmit={this.onSearchClick.bind(this)} />
                        </div>
                    </div>
                    {this.renderTable()}
                </div>
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * sets grid props 
     */
    public setGridInfo() {
        this.gridPropModel.headerCells = [
            ProjectManagerConstant.headers.clientName,
            ProjectManagerConstant.headers.divisionName,
            ProjectManagerConstant.headers.projectName,
            {
                ...ProjectManagerConstant.headers.isActive,
                format: (row: GridRowModel<ProjectModel>) => <>{Helper.toString(row.rowData.isActive)}</>
            }
        ];
        this.gridPropModel.actionElements = [
            {
                type: GridActionFieldType.Edit,
                onClick: this.onEditLinkClick.bind(this)
            }
        ];
    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult(pageRequest: PageRequestModel) {
        this.props.dispatchFetchProjects({ divisionId: this.props.formData.divisionId, listParameter: pageRequest }, this.handleApiFetchError.bind(this));
    }

    /**
     * on edit link click callback
     */
    public onAddProjectClick() {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.registerProjectPage
                }
            );
        }
    }

    /**
     * on edit link click callback
     * @param rowData
     */
    public onEditLinkClick(rowData) {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.registerProjectPage,
                    state: { projectId: rowData.id, isRedirect: true }
                }
            );
        }
    }

    /**
     * on search button click 
     * @param formData
     */
    public onSearchClick(formData: ProjectFilterFormModel) {
        this.props.dispatchFetchProjects(
            {
                clientId: formData.clientId,
                divisionId: formData.divisionId,
                listParameter: this.getPageRequestInfo()
            },
            this.handleApiFetchError.bind(this));
    }

    /**
     * on reset button click 
     */
    public onResetClick() {
        this.props.dispatchFetchProjects(
            {
                listParameter: this.getPageRequestInfo()
            },
            this.handleApiFetchError.bind(this));
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     *  renders html for add client link
     */
    private renderAddLink() {
        return (
            <ButtonComponent
                type="button"
                displayText="Add Project"
                displayType="link"
                id="btn_project_list_add_project"
                fontIconPrefix="fa fa-plus"
                className="btn-primary"
                clickHandler={this.onAddProjectClick.bind(this)}
            >
            </ButtonComponent>
        );
    }

    //#endregion private methods
}