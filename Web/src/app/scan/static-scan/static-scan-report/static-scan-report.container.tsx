//#region react imports

import { connect } from 'react-redux';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../core';
import { containerHelper, GlobalState, injectReducer, PageRequestModel, StaticScanDetailModel, SuccessFn, ErrorFn } from '../../../shared';
import { Constant } from '../../../utilities';

import { staticScanReportReducer, StaticScanReportState, StaticScanReportActionCreator, staticScanReportSelector } from './static-scan-report-store';
import { StaticScanReportComponent } from './static-scan-report.component';
import { StaticScanReportDispatchPropModel, StaticScanReportOwnPropModel, StaticScanReportModel } from './models';
import { TicketingIssueActionCreator } from '../../ticketing-issue/ticketing-issue-store'

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, StaticScanReportOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            gridResultData: (state) => staticScanReportSelector.getStaticScanResults(state),
            showPopup: (state) => staticScanReportSelector.getPopupState(state),
            ticketIssueInfo: (state) => staticScanReportSelector.getTicketIssueInfo(state),
            ticketTypeId: (state) => staticScanReportSelector.getTicketTypeId(state),
            ticketingType: (state) => staticScanReportSelector.getTicketType(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<StaticScanReportState>>): StaticScanReportDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchStaticScanReport: (staticScanId: number, pageRequest: PageRequestModel, errorCallback: ErrorFn) =>
            dispatch(StaticScanReportActionCreator.fetchStaticScanResults(staticScanId, pageRequest, errorCallback)),

        dispatchDownloadScanReport: (staticScanId: number, successCallback: SuccessFn, errorCallback: ErrorFn, fileName: string) =>
            dispatch(StaticScanReportActionCreator.getPdfFile(staticScanId, successCallback, errorCallback, fileName)),

        dispatchSaveIssue: (issueInfo: StaticScanDetailModel, successCallback: SuccessFn, errorCallback: ErrorFn) =>
            dispatch(StaticScanReportActionCreator.saveIssueInfo(issueInfo, successCallback, errorCallback)),

        dispatchFetchIssueMetaData: (projectId: number, errorCallback: ErrorFn) =>
            dispatch(TicketingIssueActionCreator.fetchIssueMetaData(projectId, errorCallback)),

        dispatchShowPopup: (show: boolean, staticIssueInfo: StaticScanReportModel) =>
            dispatch(StaticScanReportActionCreator.setPopupState(show, staticIssueInfo)),

        dispatchExcelDownloadScanReport: (staticScanId: number, successCallback: SuccessFn, errorCallback: ErrorFn, fileName: string) =>
            dispatch(StaticScanReportActionCreator.getExcelFile(staticScanId, successCallback, errorCallback, fileName)),

    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(StaticScanReportComponent);
export const StaticScanReportContainer = injectReducer(Constant.reducerKey.staticScanReportReducer, staticScanReportReducer)(withConnect);
