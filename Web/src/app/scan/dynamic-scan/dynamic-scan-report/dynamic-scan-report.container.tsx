//#region react imports

import { connect } from 'react-redux';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../core';
import { containerHelper, GlobalState, injectReducer, PageRequestModel, SuccessFn, ErrorFn } from '../../../shared';
import { Constant } from '../../../utilities';

import { dynamicScanReportReducer, DynamicScanReportState, DynamicScanReportActionCreator, dynamicScanReportSelector } from './dynamic-scan-report-store';
import { DynamicScanReportComponent } from './dynamic-scan-report.component';
import { DynamicScanReportDispatchPropModel, DynamicScanReportOwnPropModel, DynamicScanDetailModel } from './models';
import { TicketingIssueActionCreator } from '../../ticketing-issue/ticketing-issue-store';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state, ownprops): Selector<DynamicScanReportState, DynamicScanReportOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            gridResultData: (state) => dynamicScanReportSelector.getDynamicScanResults(state),
            downloadFileName: (state) => dynamicScanReportSelector.getDynamicScanReportFileNameInfo(state),
            showPopup: (state) => dynamicScanReportSelector.getPopupState(state),
            ticketIssueInfo: (state) => dynamicScanReportSelector.getTicketIssueInfo(state),
            ticketTypeId: (state) => dynamicScanReportSelector.getTicketTypeId(state),
            ticketingType: (state) => dynamicScanReportSelector.getTicketType(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<DynamicScanReportState>>): DynamicScanReportDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchDynamicScanReport: (dynamicScanId: number, pageRequest: PageRequestModel, errorCallback: ErrorFn) =>
            dispatch(DynamicScanReportActionCreator.fetchDynamicScanResults(dynamicScanId, pageRequest, errorCallback)),

        dispatchPdfDownload: (dynamicScanId: number, successCallback: SuccessFn, errorCallback: ErrorFn, fileName: string) =>
            dispatch(DynamicScanReportActionCreator.getPdfReport(dynamicScanId, successCallback, errorCallback, fileName)),

        dispatchShowPopup: (show: boolean, ticketInfo: DynamicScanDetailModel) =>
            dispatch(DynamicScanReportActionCreator.setPopupState(show, ticketInfo)),

        dispatchSaveIssue: (issueInfo: DynamicScanDetailModel, successCallback: SuccessFn, errorCallback: ErrorFn) =>
            dispatch(DynamicScanReportActionCreator.saveIssueInfo(issueInfo, successCallback, errorCallback)),

        dispatchFetchIssueMetaData: (projectId: number, errorCallback: ErrorFn) =>
            dispatch(TicketingIssueActionCreator.fetchIssueMetaData(projectId, errorCallback)),

        dispatchExcelDownload: (dynamicScanId: number, successCallback: SuccessFn, errorCallback: ErrorFn, fileName: string) =>
            dispatch(DynamicScanReportActionCreator.getExcelReport(dynamicScanId, successCallback, errorCallback, fileName)),

    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(DynamicScanReportComponent);
export const DynamicScanReportContainer = injectReducer(Constant.reducerKey.dynamicScanReportReducer, dynamicScanReportReducer)(withConnect);
