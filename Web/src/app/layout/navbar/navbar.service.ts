//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { Url, Role } from '../../utilities';
import { IAppActionModel } from '../../core';

import { MenuItemModel } from './models/menu-item.model';
import { NavbarState } from './navbar.state';

//#endregion application imports

class NavbarService {

    private path: string;

    //#region public functions

    /**
     * gets nav menu items 
     * @param userRole
     * @param dispatch
     * @param path
     */
    public getNavItems(userRole: number, dispatch: ThunkDispatch<NavbarState, IAppActionModel<NavbarState>, any>, path: string): Promise<NavbarState> {
        let dataModel: MenuItemModel[] = this.roleBasedNavItems(userRole, path);
        let observable = Promise.resolve({ menus: dataModel });
        return observable;

    }

    //#endregion public functions

    //#region private functions

    /**
     * gets role based nav menu items 
     * @param userRole
     * @param path
     */
    private roleBasedNavItems(userRole, path) {
        this.path = path;
        let menus: MenuItemModel[] = [];

        this.addChild(menus, this.getDashboardItem());
        this.addChild(menus, this.getConfigurationItems(userRole));
        this.addChild(menus, this.getDynamicScanItems(userRole));
        this.addChild(menus, this.getStaticScanItems(userRole));

        return menus;
    }

    /**
    * gets dashboard item
    */
    private getDashboardItem() {
        return {
            code: 'p1',
            displayText: 'Dashboard',
            url: Url.pageUrl.manageDashboardPage,
            childNodes: [],
            icon: 'fa fa-tachometer',
            isActive: this.path && (this.path === Url.pageUrl.manageDashboardPage || this.path === Url.pageUrl.emptyPath) ? true : false
        };
    }

    /**
     * gets configuration items
     * @param userRole
     */
    private getConfigurationItems(userRole: Role) {
        let item: MenuItemModel = {
            code: 'p2',
            displayText: 'Configuration',
            icon: 'fa fa-cog',
            childNodes: []
        };
        this.addChild(item.childNodes, this.getClientConfigItem(userRole));
        this.addChild(item.childNodes, this.getProjectConfigItem(userRole));
        this.addChild(item.childNodes, this.getUserConfigItem(userRole));
        this.addChild(item.childNodes, this.getScheduleConfigItem(userRole));
        item.isActive = item.childNodes?.findIndex(x => x.isActive) > -1 ? true : false;

        return item.childNodes.length > 0 ? item : null;
    }

    /**
     * gets dynamic scan items
     * @param userRole
     */
    private getDynamicScanItems(userRole: Role) {
        let item: MenuItemModel = {
            code: 'p3',
            displayText: 'Dynamic Scan',
            icon: 'fa fa-list',
            childNodes: []
        };
        this.addChild(item.childNodes, this.getDynamicScanListItem(userRole));
        this.addChild(item.childNodes, this.getDynamicConfigItem(userRole));
        item.isActive = item.childNodes?.findIndex(x => x.isActive) > -1 ? true : false;
        return item.childNodes.length > 0 ? item : null;
    }

    /**
     * gets static scan items
     * @param userRole
     */
    private getStaticScanItems(userRole: Role) {

        let item: MenuItemModel = {
            code: 'p4',
            displayText: 'Static Scan',
            icon: 'fa fa-list',
            childNodes: []
        };
        this.addChild(item.childNodes, this.getStaticScanListItem(userRole));
        this.addChild(item.childNodes, this.getStaticConfigItem(userRole));
        item.isActive = item.childNodes?.findIndex(x => x.isActive) > -1 ? true : false;
        return item.childNodes.length > 0 ? item : null;
    }

    /**
    * gets dynamic scan list item
    * @param userRole
    */
    private getDynamicScanListItem(userRole: Role) {
        if (userRole === Role.Admin ||
            userRole === Role.ClientAdmin ||
            userRole === Role.ProjectAdmin ||
            userRole === Role.DynamicViewList) {
            return {
                code: 'p3c1',
                displayText: 'Results',
                url: Url.pageUrl.dynamicScanListPage,
                childNodes: [],
                icon: 'fa fa-history',
                isActive: this.path && this.path === Url.pageUrl.dynamicScanListPage ? true : false

            };
        }
    }

    /**
     * gets dynamic rule config config item
     * @param userRole
     */
    private getDynamicConfigItem(userRole: Role) {
        if (userRole === Role.Admin ||
            userRole === Role.ClientAdmin) {
            return {
                code: 'p3c2',
                displayText: 'Rule Config',
                url: Url.pageUrl.dynamicScanRuleConfigPage,
                childNodes: [],
                icon: 'fa fa-wrench',
                isActive: this.path && this.path === Url.pageUrl.dynamicScanRuleConfigPage ? true : false

            };
        }
    }

    /**
    * gets static scan list item
    * @param userRole
    */
    private getStaticScanListItem(userRole: Role) {
        if (userRole === Role.Admin ||
            userRole === Role.ClientAdmin ||
            userRole === Role.ProjectAdmin ||
            userRole === Role.StaticViewList) {
            return {
                code: 'p4c1',
                displayText: 'Results',
                url: Url.pageUrl.staticScanListPage,
                childNodes: [],
                icon: 'fa fa-history',
                isActive: this.path && this.path === Url.pageUrl.staticScanListPage ? true : false

            };
        }
    }

    /**
     * gets static rule config item
     * @param userRole
     */
    private getStaticConfigItem(userRole: Role) {
        if (userRole === Role.Admin ||
            userRole === Role.ClientAdmin) {
            return {
                code: 'p4c2',
                displayText: 'Rule Config',
                url: Url.pageUrl.staticScanRuleConfigPage,
                childNodes: [],
                icon: 'fa fa-wrench',
                isActive: this.path && this.path === Url.pageUrl.staticScanRuleConfigPage ? true : false

            };
        }
    }

    /**
     * gets client config item
     * @param userRole
     */
    private getClientConfigItem(userRole: Role) {
        if (userRole === Role.Admin ||
            userRole === Role.ClientAdmin) {
            return {
                code: 'p2c1',
                displayText: 'Clients',
                url: Url.pageUrl.manageClientPage,
                childNodes: [],
                icon: 'fa fa-users',
                isActive: this.path && this.path === Url.pageUrl.manageClientPage ? true : false
            };
        }
    }

    /**
     * gets project config item
     * @param userRole
     */
    private getProjectConfigItem(userRole: Role) {
        if (userRole === Role.Admin ||
            userRole === Role.ClientAdmin ||
            userRole === Role.ProjectAdmin ||
            userRole === Role.EditProject) {
            return {
                code: 'p2c2',
                displayText: 'Projects',
                url: Url.pageUrl.projectListPage,
                childNodes: [],
                icon: 'fa fa-desktop',
                isActive: this.path && this.path === Url.pageUrl.projectListPage ? true : false

            };
        }
    }

    /**
     * gets user config item
     * @param userRole
     */
    private getUserConfigItem(userRole: Role) {
        if (userRole === Role.Admin) {
            return {
                code: 'p2c3',
                displayText: 'Users',
                url: Url.pageUrl.manageUserPage,
                childNodes: [],
                icon: 'fa fa-user-circle',
                isActive: this.path && this.path === Url.pageUrl.manageUserPage ? true : false

            };
        }
    }

    /**
     * gets schedule config item
     * @param userRole
     */
    private getScheduleConfigItem(userRole: Role) {
        if (userRole === Role.Admin ||
            userRole === Role.ClientAdmin ||
            userRole === Role.ProjectAdmin ||
            userRole === Role.ScheduleAdmin ||
            userRole === Role.ViewScheduleList) {
            return {
                code: 'p2c4',
                displayText: 'Schedules',
                url: Url.pageUrl.manageSchedulePage,
                childNodes: [],
                icon: 'fa fa-calendar',
                isActive: this.path && this.path === Url.pageUrl.manageSchedulePage ? true : false

            };
        }
    }

    /**
     * adds child node to item
     * @param childNodes
     * @param child
     */
    private addChild(childNodes: MenuItemModel[], child: MenuItemModel) {
        if (childNodes && child) {
            childNodes.push(child);
        }
    }

    //#endregion private functions

}

export const navbarService = new NavbarService();
