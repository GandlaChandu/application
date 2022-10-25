﻿namespace Com.ACSCorp.Accelerator.Core.Models.Enums
{
    public enum Role
    {
        Any = 0,
        Admin = 1,
        ClientAdmin = 2,
        ProjectAdmin = 3,
        ProjectUser = 4,
        EditProject,
        ScheduleAdmin,
        AddSchedule,
        EditSchedule,
        ViewScheduleList,
        DynamicScanAdmin,
        DynamicViewList,
        DynamicNewScan,
        DynamicViewReport,
        DynamicDownloadReport,
        StaticScanAdmin,
        StaticViewList,
        StaticNewScan,
        StaticViewReport,
        StaticDownloadReport
    }
}
