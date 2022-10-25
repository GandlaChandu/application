//#region react imports

import Moment from 'moment';

//#endregion react imports

//#region application imports

import { Constant, Url, FunctionalCode, Role } from '../../utilities';
import { StorageHelper } from '../../core';

import { KeyNamePairModel, KeyValuePairModel, TextValuePairModel, PagedResult, ComponentInfoModel, UserRoleModel } from '../models';
import { SelectListItemModel } from '../forms';
import { GridRowModel, GridActionFieldType } from '../controls';

//#endregion application imports

export class Helper {

    //#region public methods

    /**
     * returns 'Yes' if value is true, otherwise 'No'
     * @param value 
     */
    public static toString(value: boolean): string {
        return value ? Constant.text.yesText : Constant.text.noText;
    }

    /**
     * gets select list item model from keyNamePairModel
     * @param model
     */
    public static toSelectListItem(model: KeyNamePairModel): SelectListItemModel {
        if (model) {
            return {
                label: model.name,
                value: model.id
            }
        }
    }

    /**
    * gets select list item model from keyNamePairModel
    * @param model
    */
    public static toSelectKeyValueItem(model: KeyValuePairModel): SelectListItemModel {
        if (model) {
            return {
                label: model.value,
                value: model.key
            }
        }
    }

    /**
     * gets keyNamePairModel from select list item model
     * @param model
     */
    public static toKeyNamePair(model: SelectListItemModel): KeyNamePairModel {
        if (model) {
            return {
                id: model.value,
                name: model.label
            }
        }
    }

    /**
     * gets keyNamePairModel array from select list item model array
     * @param model
     */
    public static toKeyNamePairList(model: SelectListItemModel[]): KeyNamePairModel[] {
        if (model) {
            return model.map(x => Helper.toKeyNamePair(x));
        }
        return [];
    }

    /**
     * gets select list item model from TextNamePairModel
     * @param model
     */
    public static toSelectTextValueItem(model: TextValuePairModel): SelectListItemModel {
        if (model) {
            return {
                label: model.text,
                value: model.value
            }
        }
    }

    /** gets grid row model
     * @param model
     */
    public static toGridRowModel(model: any, index: number): GridRowModel<any> {
        if (model) {
            return {
                rowData: model,
                index: index,
                actionType: GridActionFieldType.None
            };
        }
    }

    /**
     * to paged row model for grid
     * @param modelArr
     * @param total
     */
    public static toPagedGridRowModelFromGridRowArr<T>(modelArr: GridRowModel<T>[], total?: number): PagedResult<GridRowModel<T>> {
        let pageResult: PagedResult<GridRowModel<T>> = new PagedResult<GridRowModel<T>>();
        if (modelArr && modelArr.length > 0) {
            pageResult.items = modelArr;
            pageResult.total = total && total >= 0 ? total : pageResult.items.length;
        }
        return pageResult;
    }

    /**
     * to paged row model for grid
     * @param modelArr
     */
    public static toPagedGridRowModel<T>(modelArr: T[]): PagedResult<GridRowModel<T>> {
        let pageResult: PagedResult<GridRowModel<T>> = new PagedResult<GridRowModel<T>>();
        if (modelArr && modelArr.length > 0) {
            pageResult.items = modelArr.map((x, i) => Helper.toGridRowModel(x, i));
            pageResult.total = pageResult.items.length;
        }
        return pageResult;
    }

    /**
     * gets a deep copy new object of given info
     * @param model
     */
    public static getDeepClone(model: any) {
        return { ...model };
    }

    /**
     * gets a deep copy new object arr of given info arr
     * @param modelArr
     */
    public static getDeepCloneArr(modelArr: any[]) {
        let newArr = [];
        modelArr.forEach(x => {
            newArr.push({ ...x });
        });
        return newArr;
    }

    /**
     *  get current screen origin url
     * @param key
     * @param value
     */
    public static getOriginURL() {
        return window.location.origin;
    }

    /**
     *  get current screen search url
     * @param key
     * @param value
     */
    public static getSearchURL() {
        return window.location.search;
    }

    /**
     * get current screen url
     * @param key
     * @param value
     */
    public static getCurrentURL() {
        return window.location.pathname;
    }

    /**
     * redirect page to sso accelerator
     * @param url
     */
    public static redirectToApp(url: string) {
        return window.location.href = url
    }

    /**
     * redirect page to sso accelerator
     */
    public static setHeaderAuthToken() {
        let tokenHeader = {
            [Constant.header.authToken]: `${StorageHelper.getLocal(Constant.ssoParams.accessToken)}`
        };
        return tokenHeader;
    }

    /**
     * sorting with respect to dates
     */
    public static sortingWithDate(a, b) {
        return (Number(new Date(a)) - Number(new Date(b)))
    }

    /**
     * setting empty values for null severity types
     */
    public static setNullToEmptyData(arr1, arr2) {
        let results;
        if (arr2) {
            results = arr1.filter((id1) => !arr2.some(({ text: id2 }) => id2 === id1));
        } else {
            results = arr1;
            arr2 = [];
        }
        Object.keys(results).forEach(function (i) {
            arr2.push({ text: results[i], value: 0 })
        });
        return arr2;
    }

    /**
     * method to find unique value
     */
    public static unique(value, index, self) {
        return self.indexOf(value) === index
    }

    /**
     * method to format the date 
     * @param date
     * @param format
     */
    public static dateFormat(date, format?: string) {
        if (!format) {
            format = Constant.format.dateFormat;
        }
        if (!date) {
            return null;
        }
        return Moment(date).format(`${format}`);
    }

    /**
     * method to get the date 
     * @param date
     * @param defaultDate
     */
    public static toDate(date: any, defaultDate?: Date) {
        if (!date || !this.isValidDate(date)) {
            return defaultDate;
        }
        return new Date(this.dateFormat(date));
    }

    /**
     * returns if given input is valid date
     * @param date
     */
    public static isValidDate(date) {
        if (date) {
            let dateVal = new Date(date);
            return dateVal.getFullYear() > 1900;
        }
        return false;
    }

    /**
     * gets page title by URL 
     * @param url
     */
    public static getPageTitleByUrl(url: string) {
        switch (url) {
            case Url.pageUrl.manageClientPage:
                return Constant.pageTitle.manageClientPage;
            case Url.pageUrl.projectListPage:
                return Constant.pageTitle.manageProjectPage;
            case Url.pageUrl.manageUserPage:
                return Constant.pageTitle.manageUserPage;
            case Url.pageUrl.manageSchedulePage:
                return Constant.pageTitle.manageSchedulePage;
            case Url.pageUrl.addEditCientPage:
                return Constant.pageTitle.editClientPage;
            case Url.pageUrl.registerProjectPage:
                return Constant.pageTitle.editProjectPage;
            case Url.pageUrl.dynamicScanListPage:
                return Constant.pageTitle.dynamicScanListPage;
            case Url.pageUrl.staticScanListPage:
                return Constant.pageTitle.staticScanListPage;
            case Url.pageUrl.dynamicScanRuleConfigPage:
                return Constant.pageTitle.dynamicScanRuleConfigListPage;
            case Url.pageUrl.addEditDynamicScanRule:
                return Constant.pageTitle.editDynamicScanRule;
            case Url.pageUrl.staticScanRuleConfigPage:
                return Constant.pageTitle.staticScanRuleConfigListPage;
            case Url.pageUrl.addEditStaticScanRule:
                return Constant.pageTitle.editQualityProfilePage;
            default:
                return '';
        }
    }

    /**
     * sets screen related information
     * @param code
     * @param roles
     */
    public static getScreenInfo(code: FunctionalCode, roles?: UserRoleModel[]) {
        let screenInfo: ComponentInfoModel = new ComponentInfoModel();
        screenInfo.isScreen = true;
        screenInfo.userRoles = roles || [];
        screenInfo.code = code;
        switch (code) {
            case FunctionalCode.Dashboard:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Any]);
                screenInfo.pageTitle = Constant.pageTitle.manageDashboardPage;
                break;

            case FunctionalCode.ProjectDashboard:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Any]);
                screenInfo.prevPageUrl = Url.pageUrl.manageDashboardPage;
                screenInfo.pageTitle = Constant.pageTitle.manageProjectDashboardPage;
                break;

            case FunctionalCode.ClientViewList:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin]);
                screenInfo.pageTitle = Constant.pageTitle.manageClientPage;
                break;

            case FunctionalCode.AddClient:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin]);
                screenInfo.prevPageUrl = Url.pageUrl.manageClientPage;
                screenInfo.pageTitle = Constant.pageTitle.addClientPage;
                break;

            case FunctionalCode.EditClient:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin]);
                screenInfo.prevPageUrl = Url.pageUrl.manageClientPage;
                screenInfo.pageTitle = Constant.pageTitle.editClientPage;
                break;

            case FunctionalCode.ProjectViewList:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin]);
                screenInfo.pageTitle = Constant.pageTitle.manageProjectPage;
                break;

            case FunctionalCode.AddProject:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin]);
                screenInfo.prevPageUrl = Url.pageUrl.projectListPage;
                screenInfo.pageTitle = Constant.pageTitle.addProjectPage;
                break;

            case FunctionalCode.EditProject:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin]);
                screenInfo.prevPageUrl = Url.pageUrl.projectListPage;
                screenInfo.pageTitle = Constant.pageTitle.editProjectPage;
                break;

            case FunctionalCode.ScheduleViewLlist:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin, Role.ScheduleAdmin, Role.ViewScheduleList]);
                screenInfo.pageTitle = Constant.pageTitle.manageSchedulePage;
                break;

            case FunctionalCode.AddSchedule:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin, Role.ScheduleAdmin, Role.AddSchedule]);
                screenInfo.prevPageUrl = Url.pageUrl.manageSchedulePage;
                screenInfo.pageTitle = Constant.pageTitle.addSchedulePage;
                break;

            case FunctionalCode.EditSchedule:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin, Role.ScheduleAdmin, Role.EditSchedule]);
                screenInfo.prevPageUrl = Url.pageUrl.manageSchedulePage;
                screenInfo.pageTitle = Constant.pageTitle.editSchedulePage;
                break;

            case FunctionalCode.UserViewList:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin]);
                screenInfo.pageTitle = Constant.pageTitle.manageUserPage;
                break;

            case FunctionalCode.AddUser:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin]);
                screenInfo.prevPageUrl = Url.pageUrl.manageUserPage;
                screenInfo.pageTitle = Constant.pageTitle.addUserPage;
                break;

            case FunctionalCode.EditUser:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin]);
                screenInfo.prevPageUrl = Url.pageUrl.manageUserPage;
                screenInfo.pageTitle = Constant.pageTitle.editUserPage;
                break;

            case FunctionalCode.DynamicViewList:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin, Role.DynamicScanAdmin, Role.DynamicViewList]);
                screenInfo.pageTitle = Constant.pageTitle.dynamicScanListPage;
                break;

            case FunctionalCode.DynamicNewScan:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin, Role.DynamicScanAdmin, Role.DynamicNewScan]);
                screenInfo.prevPageUrl = Url.pageUrl.dynamicScanListPage;
                screenInfo.pageTitle = Constant.pageTitle.dynamicScanTriggerPage;
                break;

            case FunctionalCode.DynamicViewReport:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin, Role.DynamicScanAdmin, Role.DynamicViewReport]);
                screenInfo.prevPageUrl = Url.pageUrl.dynamicScanListPage;
                screenInfo.pageTitle = Constant.pageTitle.dynamicScanReportPage;
                break;

            case FunctionalCode.DynamicDownloadReport:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin, Role.DynamicScanAdmin, Role.DynamicDownloadReport]);
                screenInfo.isScreen = false;
                break;

            case FunctionalCode.DynamicViewRuleList:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin]);
                screenInfo.pageTitle = Constant.pageTitle.dynamicScanRuleConfigListPage;
                break;

            case FunctionalCode.DynamicAddRule:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin]);
                screenInfo.prevPageUrl = Url.pageUrl.dynamicScanRuleConfigPage;
                screenInfo.pageTitle = Constant.pageTitle.addDynamicScanRule;
                break;

            case FunctionalCode.DynamicEditRule:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin]);
                screenInfo.prevPageUrl = Url.pageUrl.dynamicScanRuleConfigPage;
                screenInfo.pageTitle = Constant.pageTitle.editDynamicScanRule;
                break;

            case FunctionalCode.DynamicEditPolicy:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin]);
                screenInfo.isScreen = false;
                break;

            case FunctionalCode.DynamicEditScanner:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin]);
                screenInfo.prevPageUrl = Url.pageUrl.addEditDynamicScanRule;
                screenInfo.pageTitle = Constant.pageTitle.dynamicScannerPage;
                break;

            case FunctionalCode.StaticViewList:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin, Role.StaticScanAdmin, Role.StaticViewList]);
                screenInfo.pageTitle = Constant.pageTitle.staticScanListPage;
                break;

            case FunctionalCode.StaticNewScan:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin, Role.StaticScanAdmin, Role.StaticNewScan]);
                screenInfo.prevPageUrl = Url.pageUrl.staticScanListPage;
                screenInfo.pageTitle = Constant.pageTitle.staticScanTriggerPage;
                break;

            case FunctionalCode.StaticViewReport:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin, Role.StaticScanAdmin, Role.StaticViewReport]);
                screenInfo.prevPageUrl = Url.pageUrl.staticScanListPage;
                screenInfo.pageTitle = Constant.pageTitle.staticScanReportPage;
                break;

            case FunctionalCode.StaticDownloadReport:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin, Role.StaticScanAdmin, Role.StaticDownloadReport]);
                screenInfo.isScreen = false;
                break;

            case FunctionalCode.StaticViewRuleList:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin]);
                screenInfo.pageTitle = Constant.pageTitle.staticScanRuleConfigListPage;
                break;

            case FunctionalCode.StaticAddRule:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin]);
                screenInfo.prevPageUrl = Url.pageUrl.staticScanRuleConfigPage;
                screenInfo.pageTitle = Constant.pageTitle.addQualityProfilePage;
                break;

            case FunctionalCode.StaticEditRule:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin]);
                screenInfo.prevPageUrl = Url.pageUrl.staticScanRuleConfigPage;
                screenInfo.pageTitle = Constant.pageTitle.editQualityProfilePage;
                break;

            case FunctionalCode.StaticImportRule:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin]);
                screenInfo.prevPageUrl = Url.pageUrl.addEditStaticScanRule;
                screenInfo.pageTitle = Constant.pageTitle.staticScanImportRulePage;
                break;

            case FunctionalCode.UserMap:
                screenInfo.hasPermission = this.hasRole(screenInfo.userRoles, [Role.Admin, Role.ClientAdmin, Role.ProjectAdmin]);
                screenInfo.pageTitle = Constant.pageTitle.manageUserMapsPage;
                break;

            case FunctionalCode.Error:
                screenInfo.hasPermission = true;
                break;

            default:
                screenInfo.hasPermission = false;
                break;
        }
        return screenInfo;
    }

    /**
     * determines if user roles as matching roles
     * @param userRoles
     * @param matchingRoles
     */
    public static hasRole(userRoles: UserRoleModel[], matchingRoles: any[]): boolean {
        let hasAccess = false
        for (let i = 0; i < matchingRoles.length; i++) {
            if (matchingRoles[i] === Role.Any) {
                hasAccess = true;
                break;
            }
            if (userRoles.map(x => x.roleId).includes(matchingRoles[i])) {
                hasAccess = true;
                break;
            }
        };
        return hasAccess;
    }

    //#endregion public methods

    //#region private methods
    //#endregion Private methods
}