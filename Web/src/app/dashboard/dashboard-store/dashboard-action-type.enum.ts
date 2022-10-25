export enum DashboardActionType {
    FetchRecentScans = 'FETCH_RECENT_SCANS',
    FetchScanSummary = 'FETCH_SCAN_SUMMARY',
    FetchulnerabilitiesBySeverity = 'FETCH_VULNERABILITIES_BY_SEVERITY',
    FetchLastScannedOn = 'FETCH_LAST_SCANNED_ON',
    FetchTopVulnerabilityTypes = 'FETCH_TOP_VULNERABILITY_TYPES',
    FetchVulnerabilityTrend = 'FETCH_VULNERABILITY_TREND',
    SetFiltersInfo = 'SET_FILTERS_INFO',
    FetchTrendPeriod = 'FETCH_TREND_PERIOD',
    SetFilterState = 'SET_FILTER_STATE',
    FetchProjects = 'FETCH_DASHOARD_PROJECTS'
}