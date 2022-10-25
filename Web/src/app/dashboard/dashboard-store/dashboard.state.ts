
//#region react imports
//#endregion react imports

//#region application imports

import { ScanCascadeModel, TextValuePairModel, SelectListItemModel, PagedResult } from '../../shared';

import { ScanSummaryModel } from '../scan-summary/models';
import { RecentScanModel } from '../recent-scans/models';
import { DashboardRequestModel } from '../models';
import { ProjectListSectionModel } from '../project-list-section/models';

//#endregion application imports

export class DashboardState extends ScanCascadeModel {
    public recentScans?: RecentScanModel[];
    public scanSummary?: ScanSummaryModel;
    public vulnerabilitiesBySeverity?: TextValuePairModel[];
    public lastScannedOn?: string;
    public topVulnerabilityTypes?: TextValuePairModel[];
    public vulnerabilityTrend?: any[];
    public filtersInfo?: DashboardRequestModel;
    public trendPeriod?: SelectListItemModel[];
    public isFilterOpen?: boolean;
    public projectList?: PagedResult<ProjectListSectionModel>;
}