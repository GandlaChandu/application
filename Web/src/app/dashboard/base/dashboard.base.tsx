//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { ScanCascadeForm, ComponentBase, PieChartComponent, LineChartComponent, Helper, CardComponent, ButtonComponent } from '../../shared';
import { Constant } from '../../utilities';

import { DashboardPropModel } from '../models';
import { VulnerabilitySummaryContainer } from '../vulnerability-summary/vulnerability-summary.container';
import { RecentScanContainer } from '../recent-scans/recent-scan.container';
import { ScanSummaryContainer } from '../scan-summary/scan-summary.container';
import { DashboardRequestModel } from '../models';
import '../dashboard.scss';
import { DashboardConstant } from '../dashboard.constant';

//#endregion application imports

export abstract class DashboardBase extends ComponentBase<DashboardPropModel> {

    //#region model properties

    protected trendPeriod: any;

    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.props.dispatchPageLoadingState(true);
    }

    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        super.componentDidMount();
        this.props.dispatchSetFiltersInfo(new DashboardRequestModel());
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on filter submit call back 
     */
    public abstract onFilter(data);

    /**
     * on filters reset call back 
     */
    public onResetFilters() {
        let requestData: DashboardRequestModel = new DashboardRequestModel();
        requestData.vulnerabilityTrendPeriod = this.trendPeriod ?
            this.trendPeriod :
            this.props.trendPeriod ? this.props.trendPeriod[0].value : 7;

        this.dispatchMethods(requestData);
    }

    /**
     * on filter click button 
     */
    public onFilterClick() {
        this.props.dispatchSetFilterState(this.props.isFilterOpen ? false : true);
    }

    //#endregion events callbacks/public methods

    //#region protected methods

    /**
     * methods to dispatch dashboard api's
     */
    protected dispatchMethods(requestData) {
        this.props.dispatchSetFiltersInfo(requestData);
        this.props.dispatchFetchVulnerabilityBySeverity(requestData, this.handleApiFetchError.bind(this));
        this.props.dispatchFetchScanSummary(requestData, this.handleApiFetchError.bind(this));
        this.props.dispatchFetchLastScannedOn(requestData, this.handleApiFetchError.bind(this));
        this.props.dispatchFetchRecentScans(requestData, this.handleApiFetchError.bind(this));
        this.props.dispatchFetchTopVulnerabilityTypes(requestData, this.handleApiFetchError.bind(this));
        this.props.dispatchFetchVulnerabilityTrend(requestData, this.handleApiFetchError.bind(this));
    }

    /**
     * determines if any filter is applied 
     */
    protected isFilterApplied() {
        return this.props.filtersInfo &&
            (this.props.filtersInfo.endDate ||
                this.props.filtersInfo.startDate ||
                this.props.filtersInfo.scanType);
    }

    /**
     * renders filter section 
     * @param namespace
     */
    protected renderFilterSection(namespace) {
        return (
            <>
                {this.renderFilterToggleButton()}
                <div className="row space-row collpasable-wrapper">
                    {this.renderFilters(namespace)}
                    {this.renderFilterSummarySection()}
                </div>
            </>
        );
    }

    /**
     * renders filter 
     * @param namespace
     */
    protected renderFilters(namespace) {
        return (
            <>
                <div className={this.props.isFilterOpen ? 'col-sm-12 open-filter my-3' : 'col-sm-12 close-filter mb-3'}>
                    <ScanCascadeForm
                        onSubmit={this.onFilter.bind(this)}
                        onReset={this.onResetFilters.bind(this)}
                        namespace={namespace}
                        showScanTypeOptions
                        submitBtnText="Search"
                        submitBtnIcon=""
                        removeValidation
                        includeDateRange
                        excludeClientCascade
                    />
                </div>
            </>
        );
    }

    /**
     * renders filter toggle button 
     */
    protected renderFilterToggleButton() {
        return (
            <ButtonComponent
                className="btn-primary mt-4 ml-0"
                clickHandler={this.onFilterClick.bind(this)}
                displayText={`${this.props.isFilterOpen ? 'Hide Filter' : 'Show Filter'}`}
            />
        );
    }

    /**
     * renders filter summary when filters are applied 
     */
    protected renderFilterSummarySection() {
        if (!this.props.isFilterOpen && this.isFilterApplied()) {
            return (
                <div className="col-sm-12 mb-3">
                    <CardComponent
                        content={
                            <>
                                <div className="row">

                                    <div className="col-sm-12 col-md-4">
                                        <label className="field-label">Start Date</label>
                                        <div>{this.props.filtersInfo?.startDate ?
                                            Helper.dateFormat(this.props.filtersInfo.startDate) :
                                            Constant.text.na}
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <label className="field-label">End Date</label>
                                        <div>{this.props.filtersInfo?.endDate ?
                                            Helper.dateFormat(this.props.filtersInfo.endDate) :
                                            Constant.text.na}
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <label className="field-label">Scan Type</label>
                                        <div>{this.props.filtersInfo?.scanType ?
                                            this.props.scanTypes.find(x => x.value === this.props.filtersInfo.scanType)?.label :
                                            Constant.text.na}
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    />
                </div>
            );
        }
        return (null);
    }

    /**
     * renders scan summary section 
     * @param namespace
     */
    protected renderScanSummarySection(namespace: string) {
        return (
            <div className="d-flex w-100 flex-column">
                <ScanSummaryContainer namespace={namespace} filtersInfo={this.props.filtersInfo} />
            </div>
        );
    }

    /**
     * renders pie chart section 
     */
    protected renderPieChartSection() {
        return (
            <CardComponent
                content={
                    <>
                        <h4 className="field-label">Critical Vulnerability Types</h4>
                        {this.renderVulnerabilityTypes()}
                    </>
                }
            />

        );
    }

    /**
     * renders recent scans section 
     * @param namespace
     */
    protected renderRecentScanSection(namespace: string) {
        return (
            <>

                <div className="col-sm-12 last-row-section">
                    <CardComponent
                        content={
                            <>
                                <h4 className="field-label mb-3">Recent Scans</h4>
                                <RecentScanContainer namespace={namespace} filtersInfo={this.props.filtersInfo} />
                            </>
                        }
                    />
                </div>
            </>
        );
    }

    /**
     * renders vulnerability by severity section 
     * @param namespace
     */
    protected renderSeveritySection(namespace: string) {
        return (
            <CardComponent
                content={
                    <VulnerabilitySummaryContainer namespace={namespace} filtersInfo={this.props.filtersInfo} />
                }
            />

        );
    }

    /**
     * renders vulnerability types component
     */
    protected renderVulnerabilityTypes() {
        let labels = [];
        let dataSet = [];
        if (this.props.topVulnerabilityTypes) {
            if (this.props.topVulnerabilityTypes.length > 0) {
                this.props.topVulnerabilityTypes.forEach(x => {
                    labels.push(`${x.text} (${x.value})`);
                    dataSet.push(x.value);
                });
                return (
                    <PieChartComponent label={labels} dataSet={dataSet} />
                )
            }
            else {
                return (
                    <div className="pie-nodata">{DashboardConstant.noData}</div>
                )
            }
        }
        return (null);
    }

    /**
     * render vulnerability trend component
     */
    protected renderVulnerabilityTrend() {
        if (this.props.vulnerabilityTrend) {
            return (
                <LineChartComponent
                    low={this.props.vulnerabilityTrend[3]}
                    high={this.props.vulnerabilityTrend[1]}
                    medium={this.props.vulnerabilityTrend[2]}
                    scanDates={this.props.vulnerabilityTrend[0]?.filter(Helper.unique)}
                    trendPeriod={this.props.vulnerabilityTrend[4]}
                />
            )
        }
        return (null);
    }

    //#endregion protected methods
}