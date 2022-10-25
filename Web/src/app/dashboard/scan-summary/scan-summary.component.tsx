//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { ComponentBase, Helper, TooltipComponent } from '../../shared';

import { ScanSummaryPropModel } from './models';

import './scan-summary.scss';
import { Constant } from '../../utilities';

//#endregion application imports

export class ScanSummaryComponent extends ComponentBase<ScanSummaryPropModel, any> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        super.componentDidMount();
        this.props.dispatchFetchScanSummary(this.props.filtersInfo, this.handleApiFetchError.bind(this));
        this.props.dispatchFetchLastScannedOn(this.props.filtersInfo, this.handleApiFetchError.bind(this));
    }

    /**
     * renders html for component 
     */
    render() {
        if (!this.props.scanSummary) {
            return (null);
        }
        return (
            <>
                {this.renderClientMetadata()}
                <div className="d-flex flex-xl-column client-metadata flex-wrap">
                    <div className="min-width-150 mr-sm-3 mr-xl-3 mr-0 mb-3 mb-lg-2">
                        <h3>{this.props.scanSummary?.totalStaticScans + this.props.scanSummary?.totalDynamicScans}</h3>
                        <TooltipComponent message={
                            <>
                                <div className="d-flex flex-lg-column flex-wrap">
                                    <div className="min-width-150 mr-sm-3 mr-xl-3 mr-0 mb-3 mb-lg-2 pr-3">
                                        <label className="title-label">Scans Completed</label>
                                        <label>{this.props.scanSummary?.scansCompleted}</label>
                                    </div>
                                    <div className="min-width-150 mr-sm-3 mr-xl-3 mr-0 mb-3 mb-lg-2 pr-3">
                                        <label className="title-label">Scans Queued</label>
                                        <label>{this.props.scanSummary?.scansQueued}</label>
                                    </div>
                                    <div className="min-width-150 mr-sm-3 mr-xl-3 mr-0 mb-3 mb-lg-2 pr-3">
                                        <label className="title-label">Total Static Scans</label>
                                        <label>{this.props.scanSummary?.totalStaticScans}</label>
                                    </div>
                                    <div className="min-width-150 mr-sm-3 mr-xl-3 mr-0 mb-3 mb-lg-2 pr-3">
                                        <label className="title-label">Total Dynamic Scans</label>
                                        <label>{this.props.scanSummary?.totalDynamicScans}</label>
                                    </div>
                                </div>
                            </>
                        }
                            styleClass="scan-summary-tooltip"
                            target="scansTotal"
                            args={
                                {
                                    displayType: 'link',
                                    fontIconSuffix: 'fa fa-info',
                                    className: 'mr-0 pl-0 pr-0'
                                }
                            }
                        />
                        <label id="scansTotal" className="title-label">Total Scans</label>
                    </div>
                    <div className="min-width-150 mr-sm-3 mr-xl-3 mr-0 mb-3 mb-lg-2 pr-3">
                        <h3>{this.props.scanSummary?.scansScheduled}</h3>
                        <label className="field-label">Scans Scheduled</label>
                    </div>
                    <div className="min-width-150 mr-sm-3 mr-xl-3 mr-0 mb-3 mb-lg-2 pr-3">
                        <h4>{Helper.dateFormat(this.props.lastScannedOn) || Constant.text.na}</h4>
                        <label className="field-label">Last Scanned On</label>
                    </div>
                </div>
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    //#endregion events callbacks/public methods

    //#region private methods

    private renderClientMetadata() {
        if (this.props.namespace === Constant.reducerKey.dashboardReducer) {
            return (
                <>
                    <div className="d-flex flex-xl-column client-metadata flex-wrap">
                        <div className="min-width-150 mr-sm-3 mr-xl-3 mr-0 mb-3 mb-lg-2 pr-3">
                            <h3>{this.props.scanSummary?.totalClients}</h3>
                            <label className="field-label">Clients</label>
                        </div>
                        <div className="min-width-150 mr-sm-3 mr-xl-3 mr-0 mb-3 mb-lg-2 pr-3">
                            <h3>{this.props.scanSummary?.totalProjects}</h3>
                            <label className="field-label">Projects</label>
                        </div>

                    </div>
                </>
            );
        }
        return (null);
    }

    //#endregion private methods
}