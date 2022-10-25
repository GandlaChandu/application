//#region react imports

import React from 'react';
import fileDownload from 'js-file-download';

//#endregion react imports

//#region application imports

import { ListComponentBase, PageRequestModel, ButtonComponent, PopupComponent, GridActionFieldType, GridRowModel } from '../../../shared';
import { Constant, ScanTypeEnum, TicketModes, FunctionalCode } from '../../../utilities';

import { StaticScanReportPropModel, StaticScanReportModel } from './models';
import { StaticScanSummaryContainer } from './static-scan-summary';
import { StaticScanReportConstant } from './static-scan-report.constant';
import { TicketingIssueContainer } from '../../ticketing-issue';
import { ScanReportSummaryComponent, ScanReportSummaryModel } from '../../scan-report-summary';
import { StaticScanListModel } from '../static-scan-list/models';

//#endregion application imports

export class StaticScanReportComponent extends ListComponentBase<StaticScanReportPropModel, StaticScanReportModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.StaticViewReport);
    }

    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook 
     */
    componentDidMount() {
        super.componentDidMount();
        let projectId = (this.hasLocationInfo && this.locationInfo.resultInfo?.projectId) || 0;
        this.props.dispatchFetchIssueMetaData(projectId, this.handleApiFetchError.bind(this));
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <div>
                {this.renderPrevButton()}
                <div className="row space-row">
                    <div className="col-sm-12 text-right">
                        {this.renderDownloadLink()}
                        {this.renderExcelLink()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <ScanReportSummaryComponent {...this.getScanReportSummaryInfo()} />
                    </div>
                </div>
                <StaticScanSummaryContainer scanId={this.props.history?.location?.state?.resultInfo?.id} />
                <div className="row space-row mt-5">
                </div>
                <div className="row space-row mt-5">
                </div>
                {this.renderTable()}
                {this.renderPopup()}
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
            StaticScanReportConstant.headers.type,
            StaticScanReportConstant.headers.vulnerability,
            StaticScanReportConstant.headers.description,
            StaticScanReportConstant.headers.risk,
            StaticScanReportConstant.headers.solution,
            StaticScanReportConstant.headers.reference
        ];
        this.gridPropModel.actionElements = [
            {
                type: GridActionFieldType.Add,
                title: TicketModes.Add,
                onClick: this.onRaiseUpdateIssue.bind(this),
                canDisplay: (row: GridRowModel<StaticScanReportModel>) => {
                    if (this.props.ticketTypeId) {
                        if (row.rowData.ticketSystemStatus) {
                            return false;
                        }
                        return true;
                    }
                    return false;

                },

            },
            {
                type: GridActionFieldType.Edit,
                title: TicketModes.Edit,
                onClick: this.onRaiseUpdateIssue.bind(this),
                canDisplay: (row: GridRowModel<StaticScanReportModel>) => {
                    if (this.props.ticketTypeId) {
                        if (row.rowData.ticketSystemStatus) {
                            return true;
                        }
                        return false;
                    }
                    return false;

                },

            }
        ];

    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult(pageRequest: PageRequestModel) {
        this.props.dispatchFetchStaticScanReport(this.props.history?.location?.state?.resultInfo?.id, pageRequest, this.handleApiFetchError.bind(this));
    }

    /**
     * on trigger download link click callback
     */
    public onTriggerDownloadLinkClick() {
        let fileName: string = `${Constant.file.staticReportFileName}${new Date().toISOString()}${Constant.file.pdfExt}`;
        this.props.dispatchDownloadScanReport(this.locationInfo.resultInfo?.id,
            (response) => {
                if (this.isApiResponseSuccess(response)) {
                    fileDownload(response.data, fileName, Constant.file.excelMime);
                }
                else {
                    this.props.dispatchShowAlert({
                        open: true,
                        messages: [response.errorMessage]
                    });
                }
            },
            this.handleApiSaveError.bind(this),
            fileName
        );
    }

    /**
     * on excel link click callback
     */
    public onExcelLinkClick() {
        let fileName: string = `${Constant.file.staticReportFileName}${new Date().toISOString()}${Constant.file.excelExt}`;
        this.props.dispatchExcelDownloadScanReport(this.locationInfo.resultInfo?.id,
            (response) => {
                if (this.isApiResponseSuccess(response)) {
                    fileDownload(response.data, fileName, Constant.file.excelMime);
                }
                else {
                    this.props.dispatchShowAlert({
                        open: true,
                        messages: [response.errorMessage]
                    });
                }
            },
            this.handleApiSaveError.bind(this),
            fileName
        );
    }
    /**
     * on clicking raise/update issue button
     */
    public onRaiseUpdateIssue(rowData) {
        let issueData: StaticScanReportModel = new StaticScanReportModel();
        issueData.scanIssueId = rowData.key;
        issueData.projectId = this.props?.history?.location?.state?.resultInfo?.projectId;
        issueData.id = this.props?.history?.location?.state?.resultInfo?.id;
        issueData.ticketSystemStatus = rowData.ticketSystemStatus;
        this.props.dispatchShowPopup(true, issueData);
    }

    /**
     * on popup close
     */
    public onPopupClose() {
        this.props.dispatchShowPopup(false, null);
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * returns scan report summary info 
     */
    private getScanReportSummaryInfo(): ScanReportSummaryModel {
        if (this.hasLocationInfo && this.locationInfo.resultInfo) {
            let dynamicInfo: StaticScanListModel = this.locationInfo.resultInfo;
            return {
                project: dynamicInfo.projectName,
                startDate: dynamicInfo.startTime,
                endDate: dynamicInfo.endTime,
                ticketType: this.props.ticketingType,
                projectUrl: dynamicInfo.url
            }
        }
        return {};
    }

    /**
     *  renders html for add client link
     */
    private renderDownloadLink() {
        return (
            <ButtonComponent
                className="pr-0 mr-0"
                type="button"
                displayText="Download"
                displayType="link"
                id="btn_download_dynamic_scan_report"
                fontIconPrefix="fa fa-download"
                clickHandler={this.onTriggerDownloadLinkClick.bind(this)}
            >
            </ButtonComponent>

        );
    }

    /**
     *  renders html for excel link
     */
    private renderExcelLink() {
        return (
            <ButtonComponent
                className="pr-0 mr-0"
                type="button"
                displayText="Download as Excel"
                displayType="link"
                id="btn_download_dynamic_scan_report"
                fontIconPrefix="fa fa-download"
                clickHandler={this.onExcelLinkClick.bind(this)}
            >
            </ButtonComponent>

        );
    }

    /**
     * renders popup 
     */
    private renderPopup() {
        let title: string = Constant.pageTitle.raiseIssue;
        if (this.props.ticketIssueInfo && this.props.ticketIssueInfo.ticketSystemStatus) {
            title = Constant.pageTitle.updateIssue;
        }
        return (
            <PopupComponent open={this.props.showPopup}
                closeHandler={this.onPopupClose.bind(this)}
                popupHeader={title}
                popupContent={this.getPopupContent()}
            >
            </PopupComponent >
        );
    }

    /**
     * gets popup content
     */
    private getPopupContent() {
        return (
            <TicketingIssueContainer
                ticketSystemInfo={this.props?.ticketIssueInfo}
                isEdit={this.props.ticketIssueInfo && this.props.ticketIssueInfo.ticketSystemStatus ? true : false}
                history={this.props.history}
                namespace={Constant.reducerKey.staticScanReportReducer}
                onSubmit={this.onIssueSave.bind(this)}
            />
        );
    }

    //#endregion private methods

    //#region event callbacks/public methods

    /**
     * save issue button click event
     * @param formData
     */
    public onIssueSave(data) {
        let issueData: StaticScanReportModel = new StaticScanReportModel();
        issueData.projectId = this.props.ticketIssueInfo.projectId;
        issueData.scanIssueId = this.props.ticketIssueInfo.scanIssueId;
        issueData.scanId = this.props.ticketIssueInfo.id;
        issueData.issueInformation = data;
        issueData.issueInformation.ticketSystemType = this.props.ticketIssueInfo.ticketSystemType;
        issueData.id = this.props.ticketIssueInfo.ticketSystemStatus?.id;
        issueData.scanType = ScanTypeEnum.StaticScan;
        issueData.issueInformation.type = this.props.ticketTypeId;
        this.props.dispatchSaveIssue(
            issueData
            , (response) => {
                this.handleApiSaveSuccess(response);
                if (this.isApiResponseSuccess(response)) {
                    this.props.dispatchShowPopup(false, null);
                    this.props.dispatchFetchStaticScanReport(this.props.history?.location?.state?.resultInfo?.id,
                        this.getPageRequestInfo(),
                        this.handleApiFetchError.bind(this));
                }
            },
            this.handleApiSaveError.bind(this));
    }

    //#endregion public methods
}
