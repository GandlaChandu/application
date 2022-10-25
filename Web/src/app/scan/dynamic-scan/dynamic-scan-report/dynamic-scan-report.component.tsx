//#region react imports

import React from 'react';
import fileDownload from 'js-file-download';

//#endregion react imports

//#region application imports

import { ListComponentBase, PageRequestModel, ButtonComponent, PopupComponent, GridRowModel, GridActionFieldType } from '../../../shared';
import { Constant, TicketModes, ScanTypeEnum, FunctionalCode } from '../../../utilities';

import { DynamicScanReportPropModel, DynamicScanDetailModel } from './models';
import { DynamicScanReportConstant } from './dynamic-scan-report.constant';
import { TicketingIssueContainer } from '../../ticketing-issue';
import { ScanReportSummaryComponent, ScanReportSummaryModel } from '../../scan-report-summary';
import { DynamicScanListModel } from '../dynamic-scan-list/models';

//#endregion application imports

export class DynamicScanReportComponent extends ListComponentBase<DynamicScanReportPropModel, DynamicScanDetailModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.DynamicViewReport);
    }

    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook
     */
    componentDidMount() {
        super.componentDidMount();
        this.props.dispatchFetchIssueMetaData(this.props.history.location?.state?.resultInfo?.projectId, this.handleApiFetchError.bind(this));
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <div>
                {this.renderPrevButton()}
                <div className="row">
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
            {
                ...DynamicScanReportConstant.headers.url,
                format: (row: GridRowModel<DynamicScanDetailModel>) =>
                    <a href={row.rowData.url} target="_blank" rel="noopener noreferrer">{row.rowData.url}</a>
            },
            DynamicScanReportConstant.headers.vulnerability,
            DynamicScanReportConstant.headers.description,
            DynamicScanReportConstant.headers.risk,
            DynamicScanReportConstant.headers.solution,
            {
                ...DynamicScanReportConstant.headers.reference,
                format: (row: GridRowModel<DynamicScanDetailModel>) =>
                    <a href={row.rowData.reference} target="_blank" rel="noopener noreferrer">{row.rowData.reference}</a>
            },
        ];

        this.gridPropModel.actionElements = [
            {
                type: GridActionFieldType.Add,
                title: TicketModes.Add,
                onClick: this.onRaiseUpdateIssue.bind(this),
                canDisplay: (row: GridRowModel<DynamicScanDetailModel>) => {
                    if (this.props.ticketTypeId) {
                        if (row.rowData.issueStatus) {
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
                canDisplay: (row: GridRowModel<DynamicScanDetailModel>) => {
                    if (this.props.ticketTypeId &&
                        row.rowData.issueStatus) {
                        return true;
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
        this.props.dispatchFetchDynamicScanReport(this.props.history.location.state.resultInfo.id, pageRequest, this.handleApiFetchError.bind(this));
    }

    /**
     * on trigger download link click callback
     */
    public onTriggerDownloadLinkClick() {
        let fileName: string = `${Constant.file.dynamicReportFileName}${new Date().toISOString()}${Constant.file.pdfExt}`;
        this.props.dispatchPdfDownload(this.props.history.location.state.resultInfo.id,
            (response) => {
                if (this.isApiResponseSuccess(response)) {
                    fileDownload(response.data, fileName, Constant.file.pdfMime);
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
     * on excel download link click callback
     */
    public onExcelLinkClick() {
        let fileName: string = `${Constant.file.dynamicReportFileName}${new Date().toISOString()}${Constant.file.excelExt}`;
        this.props.dispatchExcelDownload(this.locationInfo.resultInfo?.id,
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
        let issueData: DynamicScanDetailModel = new DynamicScanDetailModel();
        issueData.scanIssueId = rowData.id;
        issueData.projectId = this.props?.history?.location?.state?.resultInfo?.projectId;
        issueData.id = this.props?.history?.location?.state?.resultInfo?.id;
        issueData.ticketSystemStatus = rowData.issueStatus;
        this.props.dispatchShowPopup(true, issueData);
    }

    /**
     * on popup close
     */
    public onPopupClose() {
        this.props.dispatchShowPopup(false, null);
    }

    /**
     * save issue button click event
     * @param formData
     */
    public onIssueSave(data) {
        let issueData: DynamicScanDetailModel = new DynamicScanDetailModel();
        issueData.projectId = this.props.ticketIssueInfo.projectId;
        issueData.scanIssueId = this.props.ticketIssueInfo.scanIssueId;
        issueData.scanId = this.props.ticketIssueInfo.id;
        issueData.issueInformation = data;
        issueData.issueInformation.ticketSystemType = this.props.ticketIssueInfo.ticketSystemType;
        issueData.id = this.props.ticketIssueInfo.ticketSystemStatus?.id;
        issueData.scanType = ScanTypeEnum.DynamicScan;
        issueData.issueInformation.type = this.props.ticketTypeId;
        this.props.dispatchSaveIssue(
            issueData
            , (response) => {
                this.handleApiSaveSuccess(response);
                this.props.dispatchShowPopup(false, null);
                if (this.isApiResponseSuccess(response)) {
                    this.props.dispatchFetchDynamicScanReport(this.props.history.location.state.resultInfo.id,
                        this.getPageRequestInfo(),
                        this.handleApiFetchError.bind(this));
                }
            },
            this.handleApiSaveError.bind(this));
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * returns scan report summary info 
     */
    private getScanReportSummaryInfo(): ScanReportSummaryModel {
        if (this.hasLocationInfo && this.locationInfo.resultInfo) {
            let dynamicInfo: DynamicScanListModel = this.locationInfo.resultInfo;
            return {
                project: dynamicInfo.projectName,
                startDate: dynamicInfo.scanStartTime,
                endDate: dynamicInfo.scanEndTime,
                ticketType: this.props.ticketingType,
                projectUrl: dynamicInfo.url
            }
        }
        return {};
    }

    /**
     * renders html for download report link
     */
    private renderDownloadLink() {
        return (
            <ButtonComponent
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
     * renders html for excel report link
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
                namespace={Constant.reducerKey.dynamicScanReportReducer}
                onSubmit={this.onIssueSave.bind(this)}
            />
        );
    }

    //#endregion private methods

}