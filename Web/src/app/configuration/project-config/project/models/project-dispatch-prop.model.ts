//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel, ProjectModel, StaticScanDetailModel, DynamicScanDetailModel } from '../../../../shared';

import { ProjectStaticScanTypeModel } from './project-static-scan-type.model';
import { TicketingSystemInfoFormModel } from '../ticketing-system-info';

//#endregion application imports

export interface ProjectDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchFetchClients: (errorCallback: (error?: any) => void) => void;
    dispatchFetchDivisions: (clientId: number, errorCallback: (error?: any) => void) => void;
    dispatchFetchTicketSystemTypes: (errorCallback: (error?: any) => void) => void;
    dispatchFetchProjectInfo: (projectId: number, errorCallback: (error?: any) => void) => void;
    dispatchSaveProject: (projectRequest: ProjectModel, successCallback: (response) => void, errorCallback: (error) => void) => void;
    dispacthTabState?: (tabeName: string) => void;
    dispatchFetchTicketingSystemInfo: (projectId: number, errorCallback: (error?: any) => void) => void;
    dispatchSaveTicketSystemInfo: (ticketSystemRequest: TicketingSystemInfoFormModel, successCallback: (response) => void, errorCallback: (error) => void) => void;
    dispatchFetchCodeAnalysisInfo: (projectId: number, errorCallback: (error?: any) => void) => void;
    dispatchSaveCodeAnalysis: (staticScanRequest: StaticScanDetailModel, successCallback: (response) => void, errorCallback: (error) => void) => void;
    dispatchFetchAppAnalysisInfo: (projectId: number, errorCallback: (error?: any) => void) => void;
    dispatchSaveAppAnalysis: (dynamicScanRequest: DynamicScanDetailModel, successCallback: (response) => void, errorCallback: (error) => void) => void;
    dispatchSaveScanPolicy: (projectStaticScanRequest: ProjectStaticScanTypeModel, errorCallback: (error) => void) => void;
    dispatchUserMapTabState?: (show: boolean) => void;
    dispatchFetchRoleOptions?: () => void;
    dispatchSetProject?: (projectInfo) => void;

}