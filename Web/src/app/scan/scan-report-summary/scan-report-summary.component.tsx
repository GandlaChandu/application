//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { ComponentBase, CardComponent, Helper } from '../../shared';
import { Constant } from '../../utilities';

import { ScanReportSummaryModel } from './models';

//#endregion application imports

export class ScanReportSummaryComponent extends ComponentBase<ScanReportSummaryModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook
     */
    componentDidMount() {
        super.componentDidMount();
    }

    /** 
     * renders html for component 
     */
    render() {
        return (
            <>
                <CardComponent
                    content={
                        <>
                            <div className="row">
                                <div className="col-sm-12 col-md-4 col-lg-2">
                                    <label className="field-label header-label">Project</label>
                                    <label>{this.props.project}</label>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <label className="field-label header-label">Project Url</label>
                                    <label>{this.props.projectUrl}</label>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-2">
                                    <label className="field-label header-label">TicketType</label>
                                    <label>{this.props.ticketType ? this.props.ticketType : 'N/A'}</label>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-2">
                                    <label className="field-label header-label">Scan Start Time</label>
                                    <label>{Helper.dateFormat(this.props.startDate, Constant.format.dateTimeFormat)}</label>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-2">
                                    <label className="field-label header-label">Scan End Time</label>
                                    <label>{Helper.dateFormat(this.props.endDate, Constant.format.dateTimeFormat)}</label>
                                </div>
                            </div>
                        </>
                    }
                />
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion public methods

}