//#region react imports
//#endregion react imports

//#region application imports

import { ProjectStaticScanTypeModel } from './project-static-scan-type.model';

//#endregion application imports

export class StaticScanDetailModel {
	public id: number;
	public projectId: number;
	public codeOrCodeURL: string;
	public userName: string;
	public password: string;
	public sourceCodeType:number;
	public sourceControlType: number;
	public staticScanPreferences?: ProjectStaticScanTypeModel[];
	public ticketSystemStatus?: string;
	public scanIssueId?: string;
	public ticketSystemType?: number;
	public value?: any;
	public isTokenBased?: boolean;
	public projectPath: string;
}
