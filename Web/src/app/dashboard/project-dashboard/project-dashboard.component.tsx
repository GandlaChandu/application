//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { Constant, FunctionalCode } from '../../utilities';
import { CardComponent, FormFieldComponent, DropDownComponent, DropDownPropModel } from '../../shared';

import { DashboardBase } from '../base/dashboard.base';
import { DashboardRequestModel } from '../models';
import { ProjectListSectionModel } from '../project-list-section/models';
import '../dashboard.scss';

//#endregion application imports

export class ProjectDashboardComponent extends DashboardBase {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.ProjectDashboard);

    }

    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        super.componentDidMount();
        let projectInfo: ProjectListSectionModel = this.getFilterInfo();
        this.props.dispatchSetFiltersInfo(projectInfo);
        this.props.dispatchFetchVulnerabilityTrend(projectInfo, this.handleApiFetchError.bind(this));
        this.props.dispatchFetchTrendPeriod();
        this.props.dispatchFetchTopVulnerabilityTypes(projectInfo, this.handleApiFetchError.bind(this));

        this.props.dispatchPageLoadingState(false);
    }

    /**
     * renders html for component 
     */
    render() {
        if (this.props.isLoading || !this.props.filtersInfo?.projectName) {
            return (<></>);
        }
        return (
            <>
                {this.renderFilterSection(Constant.reducerKey.dashboardProjectReducer)}
                <div className="d-flex flex-xl-row flex-column">
                    <div className="flex-summary left card mr-xl-3 mb-3 d-flex pl-3">
                        <div className="py-3">
                            <h1 className="client-title">{this.props.filtersInfo?.clientName}</h1>
                            <div className="space-row">
                                <label className="metadata-header">Division :</label>
                                <label className="metadata-value">{this.props.filtersInfo?.divisionName}
                                </label>
                            </div>
                            <div className="space-row">
                                <label className="metadata-header">Project :</label>
                                <label className="metadata-value">{this.props.filtersInfo?.projectName}
                                </label>
                            </div>
                        </div>
                        {this.renderScanSummarySection(Constant.reducerKey.dashboardProjectReducer)}
                    </div>
                    <div className="flex-summary">
                        <div className="d-flex flex-xl-row flex-column">
                            <div className="flex-half line-chart mr-md-3 mb-3">
                                {this.renderLineChartSection()}
                            </div>
                            <div className="flex-half line-chart-severity mb-3">
                                {this.renderSeveritySection(Constant.reducerKey.dashboardProjectReducer)}
                            </div>
                        </div>
                        <div className="row-section space-row w-100">
                            {this.renderPieChartSection()}
                        </div>
                    </div>
                </div>

                <div className="row row-section space-row last-row">
                    {this.renderRecentScanSection(Constant.reducerKey.dashboardProjectReducer)}
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
        let requestData: DashboardRequestModel = this.getFilterInfo();
        requestData.scanType = data.scanTypeId ? data.scanTypeId : 0;
        requestData.vulnerabilityTrendPeriod = this.trendPeriod ? this.trendPeriod : this.props.trendPeriod[0].value;
        requestData.startDate = data.startDate;
        requestData.endDate = data.endDate;
        this.dispatchMethods(requestData);
        this.props.dispatchSetFilterState(false);
    }

    /**
     * on filters reset call back 
     */
    public onResetFilters() {
        let requestData: DashboardRequestModel = this.getFilterInfo();
        requestData.vulnerabilityTrendPeriod = this.trendPeriod ? this.trendPeriod : this.props.trendPeriod[0].value;
        this.dispatchMethods(requestData);
    }

    /**
     * filters to change trend period
     */
    public onTrendPeriodChange(trendPeriod) {
        this.trendPeriod = trendPeriod;
        let requestData: DashboardRequestModel = new DashboardRequestModel();
        requestData.vulnerabilityTrendPeriod = trendPeriod ? trendPeriod : this.props.trendPeriod[0].value;
        requestData.clientId = this.props.filtersInfo.clientId;
        requestData.divisionId = this.props.filtersInfo.divisionId;
        requestData.projectId = this.props.filtersInfo.projectId;
        requestData.scanType = this.props.filtersInfo.scanType;
        this.props.dispatchFetchVulnerabilityTrend(requestData, this.handleApiFetchError.bind(this));
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * gets filter info 
     */
    private getFilterInfo() {
        let projectInfo: ProjectListSectionModel = this.locationInfo.projectInfo || {};
        return {
            ...new DashboardRequestModel(),
            clientId: projectInfo.clientId,
            divisionId: projectInfo.divisionId,
            projectId: projectInfo.id,
            clientName: projectInfo.clientName,
            divisionName: projectInfo.divisionName,
            projectName: projectInfo.name
        };
    }

    /**
     * renders line chart section 
     */
    private renderLineChartSection() {
        return (
            <CardComponent
                content={
                    <>
                        <div className="row row-space">
                            <div className="col-sm-12 col-md-8 align-self-center">
                                <h4 className="field-label">Vulnerability Trend</h4>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                {this.renderTrendPeriodDrpdwn()}
                            </div>
                        </div>
                        {this.renderVulnerabilityTrend()}
                    </>
                }
            />
        );
    }

    /**
     * render dropdown for trend period change
     */
    private renderTrendPeriodDrpdwn() {
        return (
            <div className="trend-ddl mb-2">
                <FormFieldComponent<DropDownPropModel>
                    name="vulnerabilityTrendPeriod"
                    component={DropDownComponent}
                    props={
                        {
                            id: 'ddl_vulnerability_trned_period',
                            options: this.props.trendPeriod,
                            removeClear: true
                        }
                    }
                    onChange={this.onTrendPeriodChange.bind(this)}
                />
                {/* <span className="display-text">Days</span> */}
            </div>
        )
    }

    //#endregion private methods
}