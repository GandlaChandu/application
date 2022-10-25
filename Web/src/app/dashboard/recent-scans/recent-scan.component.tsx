//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { ListComponentBase, PageRequestModel, GridRowModel, ControlConstant, TextValuePairModel, Helper } from '../../shared';

import { RecentScanPropModel, RecentScanModel } from './models';
import { ResultInfoComponent } from './resultInfo';
import { DashboardRequestModel } from '../models';
import { RecentScanConstant } from './recent-scan.constant';
import { SeverityType } from '../../utilities';

//#endregion application imports

export class RecentScanComponent extends ListComponentBase<RecentScanPropModel, RecentScanModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        super.componentDidMount();
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <div className='recent-scan-table'>
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
        this.gridPropModel.paginationInfo.isDisabled = true;
        this.gridPropModel.headerCells = [
            {
                ...RecentScanConstant.headers.date,
                format: (row: GridRowModel<RecentScanModel>) => Helper.dateFormat(row.rowData.scanDate)
            },
            RecentScanConstant.headers.projectName,
            RecentScanConstant.headers.url,
            {
                ...RecentScanConstant.headers.stats,
                format: (row: GridRowModel<RecentScanModel>) =>
                    <p className="counts">
                        {this.renderSeverityList(row.rowData.vulnerabilities)}
                    </p>
            }
        ];

    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult(pageRequest: PageRequestModel) {
        let dashboardRequest: DashboardRequestModel = {
            ...this.props.filtersInfo,
            listParameter: pageRequest
        };
        this.props.dispatchFetchRecentScans(dashboardRequest, this.handleApiFetchError.bind(this));
    }

    //#endregion events callbacks/public methods

    //#region private methods


    /**
     * renders html for severity list 
     * @param vulnerabilities
     */
    private renderSeverityList(vulnerabilities: TextValuePairModel[]) {
        return (
            <>
                {vulnerabilities.sort((a, b) => ControlConstant.severity.indexOf(a.text) - ControlConstant.severity.indexOf(b.text))
                    .map(function (list) {
                        switch (list.text) {
                            case SeverityType.High:
                                return (
                                    <label className={`${ControlConstant.color.danger}`}>{list.value}</label>
                                )
                            case SeverityType.Medium:
                                return (
                                    <label className={`${ControlConstant.color.warning}`}>{list.value}</label>
                                )
                            case SeverityType.Low:
                                return (
                                    <label className={`${ControlConstant.color.info}`}>{list.value}</label>
                                )
                            default:
                                return (
                                    <label className={`${ControlConstant.color.info}`}>{list.value}</label>
                                )
                        }
                    })}
            </>
        )
    }

    /** 
     * render recent scan html component
     */
    private renderRecentScans() {
        if (this.props.recentScans) {
            return (
                <>
                    <div className="table-responsive recent-scan-table">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" className="border-0 date-width">Date</th>
                                    <th scope="col" className="border-0 p-name-width">Project Name</th>
                                    <th scope="col" className="border-0 link-width">Link</th>
                                    <th scope="col" className="border-0">Vulnerability Counts</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.props.recentScans.map(function (x) {
                                    return <ResultInfoComponent
                                        date={x.scanDate}
                                        projectName={x.projectName}
                                        url={x.url}
                                        vulnerabilities={x.vulnerabilities}
                                    />
                                        ;
                                })}
                            </tbody>
                        </table>
                    </div>

                </>
            )
        }
        return (null);
    }


    //#endregion private methods
}