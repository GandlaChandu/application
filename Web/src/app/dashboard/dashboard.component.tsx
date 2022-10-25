//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { Constant, FunctionalCode } from '../utilities';

import './dashboard.scss';
import { DashboardBase } from './base/dashboard.base';
import { ProjectListSectionContainer } from './project-list-section';
import { CardComponent } from '../shared';
import { DashboardRequestModel } from './models';

//#endregion application imports

export class DashboardComponent extends DashboardBase {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.Dashboard);
    }

    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        super.componentDidMount();
        this.props.dispatchFetchTopVulnerabilityTypes(new DashboardRequestModel(), this.handleApiFetchError.bind(this));
        this.props.dispatchPageLoadingState(false);
    }

    /**
     * renders html for component 
     */
    render() {
        if (this.props.isLoading || !this.props.filtersInfo || this.props.filtersInfo.projectId > 0) {
            return (<></>);
        }
        return (
            <>
                {this.renderFilterSection(Constant.reducerKey.dashboardReducer)}
                <div className="d-flex flex-lg-row flex-column mt-3">
                    <div className="flex-summary left d-flex">
                        {this.renderScanSummarySection(Constant.reducerKey.dashboardReducer)}
                    </div>
                    <div className="flex-summary">
                        <div className="d-flex flex-lg-row flex-column">
                            <div className="flex-half project-list-section mr-md-3 mb-3">
                                {this.renderProjectListSection()}
                            </div>
                            <div className="flex-half project-list-severity mb-3">
                                {this.renderSeveritySection(Constant.reducerKey.dashboardReducer)}
                            </div>
                        </div>
                        <div className="row row-section space-row">
                            <div className="col-sm-12 pie-chart-section mb-3">
                                {this.renderPieChartSection()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row row-section space-row last-row">
                    {this.renderRecentScanSection(Constant.reducerKey.dashboardReducer)}
                </div>
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on filter submit call back 
     */
    public onFilter(data) {
        let requestData: DashboardRequestModel = new DashboardRequestModel();
        requestData.clientId = 0;
        requestData.divisionId = 0;
        requestData.projectId = 0;
        requestData.scanType = data.scanTypeId ? data.scanTypeId : 0;
        requestData.startDate = data.startDate;
        requestData.endDate = data.endDate;
        this.dispatchMethods(requestData);
        this.props.dispatchSetFilterState(false);
    }


    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders project list section 
     */
    private renderProjectListSection() {
        return (
            <CardComponent
                content={
                    <>
                        <h4 className="field-label">My Projects</h4>
                        <ProjectListSectionContainer history={this.props.history} />
                    </>
                }
            />
        );
    }

    //#endregion private methods
}