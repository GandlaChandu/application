//#region react imports

import React from 'react';
import { Switch } from 'react-router-dom';

//#endregion react imports

//#region application imports

import { Url, FunctionalCode } from '../utilities';
import { ErrorContainer } from '../shared';

import { DashboardContainer, ProjectDashboardContainer } from '../dashboard';

import {
    ClientManagerContainer,
    ClientContainer,
    ProjectContainer,
    ProjectManagerContainer,
    DynamicScanPolicyManagerContainer,
    ImportRuleContainer,
    DynamicPolicyCategoryContainer,
    DynamicScanPolicyContainer,
    QualityProfileManagerContainer,
    QualityProfileConfigContainer,
    UserContainer,
    UserManagerContainer,
    UserMapManagerForm,
    ScheduleManagerContainer,
    ScheduleContainer
} from '../configuration';
import {
    DynamicScanTriggerContainer,
    DynamicScanListContainer,
    DynamicScanReportContainer,
    StaticScanTriggerContainer,
    StaticScanListContainer,
    StaticScanReportContainer
} from '../scan';
import { PrivateRouteContainer } from './private-route/private-route.container';

//#endregion application imports

const routeConfig = (
    <Switch>

        <PrivateRouteContainer code={FunctionalCode.Dashboard} path={Url.pageUrl.manageDashboardPage} component={DashboardContainer} />
        <PrivateRouteContainer code={FunctionalCode.ProjectDashboard} path={Url.pageUrl.manageProjectDashboardPage} component={ProjectDashboardContainer} />

        <PrivateRouteContainer code={FunctionalCode.ClientViewList} path={Url.pageUrl.manageClientPage} component={ClientManagerContainer} />
        <PrivateRouteContainer code={FunctionalCode.EditClient} path={Url.pageUrl.addEditCientPage} component={ClientContainer} />

        <PrivateRouteContainer code={FunctionalCode.ProjectViewList} path={Url.pageUrl.projectListPage} component={ProjectManagerContainer} />
        <PrivateRouteContainer code={FunctionalCode.EditProject} path={Url.pageUrl.registerProjectPage} component={ProjectContainer} />

        <PrivateRouteContainer code={FunctionalCode.DynamicViewList} path={Url.pageUrl.dynamicScanListPage} component={DynamicScanListContainer} />
        <PrivateRouteContainer code={FunctionalCode.DynamicViewReport} path={Url.pageUrl.dynamicScanResultsPage} component={DynamicScanReportContainer} />
        <PrivateRouteContainer code={FunctionalCode.DynamicNewScan} path={Url.pageUrl.dynamicScanTriggerPage} component={DynamicScanTriggerContainer} />

        <PrivateRouteContainer code={FunctionalCode.StaticViewList} path={Url.pageUrl.staticScanListPage} component={StaticScanListContainer} />
        <PrivateRouteContainer code={FunctionalCode.StaticViewReport} path={Url.pageUrl.staticScanResultsPage} component={StaticScanReportContainer} />
        <PrivateRouteContainer code={FunctionalCode.StaticNewScan} path={Url.pageUrl.staticScanTriggerPage} component={StaticScanTriggerContainer} />

        <PrivateRouteContainer code={FunctionalCode.DynamicViewRuleList} path={Url.pageUrl.dynamicScanRuleConfigPage} component={DynamicScanPolicyManagerContainer} />
        <PrivateRouteContainer code={FunctionalCode.DynamicEditRule} path={Url.pageUrl.addEditDynamicScanRule} component={DynamicScanPolicyContainer} />
        <PrivateRouteContainer code={FunctionalCode.DynamicEditScanner} path={Url.pageUrl.dynamicScanPolicyScanner} component={DynamicPolicyCategoryContainer} />


        <PrivateRouteContainer code={FunctionalCode.StaticViewRuleList} path={Url.pageUrl.staticScanRuleConfigPage} component={QualityProfileManagerContainer} />
        <PrivateRouteContainer code={FunctionalCode.StaticEditRule} path={Url.pageUrl.addEditStaticScanRule} component={QualityProfileConfigContainer} />
        <PrivateRouteContainer code={FunctionalCode.StaticImportRule} path={Url.pageUrl.ImportStaticScanRulePage} component={ImportRuleContainer} />

        <PrivateRouteContainer code={FunctionalCode.UserViewList} path={Url.pageUrl.manageUserPage} component={UserManagerContainer} />
        <PrivateRouteContainer code={FunctionalCode.EditUser} path={Url.pageUrl.addEditUserPage} component={UserContainer} />
        <PrivateRouteContainer code={FunctionalCode.UserMap} path={Url.pageUrl.manageUserMapsPage} component={UserMapManagerForm} />

        <PrivateRouteContainer code={FunctionalCode.ScheduleViewLlist} path={Url.pageUrl.manageSchedulePage} component={ScheduleManagerContainer} />
        <PrivateRouteContainer code={FunctionalCode.EditSchedule} path={Url.pageUrl.addEditSchedulePage} component={ScheduleContainer} />

        <PrivateRouteContainer code={FunctionalCode.Error} path={Url.pageUrl.errorPage} component={ErrorContainer} />

        <PrivateRouteContainer code={FunctionalCode.Dashboard} path="/" component={DashboardContainer} />

        <PrivateRouteContainer code={FunctionalCode.Error} path="**" component={ErrorContainer} />
    </Switch>
);

export default routeConfig;
