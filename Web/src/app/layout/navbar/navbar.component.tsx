//#region react imports

import React from 'react';
import { Link } from 'react-router-dom';

//#endregion react imports

//#region application imports

import { ComponentBase } from '../../shared';

import './navbar.scss';
import { NavbarPropModel } from './models/navbar-prop.model';
import { MenuItemModel } from './models/menu-item.model';

//#endregion application imports

export class NavbarComponent extends ComponentBase<NavbarPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook 
     */
    componentDidMount() {
        this.props.fetchMenus(this.props.userProfile?.role, this.props.history?.location?.pathname);
    }

    /**
     * component unmount life cycle hook 
     */
    componentWillUnmount() {

    }

    /**
    * renders html for component 
    */
    render() {
        const hasMenuItems = (this.props.menus && this.props.menus.length > 0);
        if (hasMenuItems) {
            return (
                <div className="side-nav">
                    <ul className="menu-item-group">
                        {this.renderMenuItems()}
                    </ul>
                </div>
            );
        }
        return (null);
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on nav link click
     * @param item
     * @param parent
     */
    public onLinkClick(item: MenuItemModel, parent?: MenuItemModel) {
        let activeMenu = { ...item };

        //reset other menu active status
        let newMenus = [...this.props.menus];

        //if parent level, check if child nodes present. If yes, set expansion toggle. Else set isactive
        if (!parent) {
            if (item.childNodes && item.childNodes.length > 0) {
                //If parent, then expand/collapse
                activeMenu.isExapand = activeMenu.isExapand ? false : true;
            }
            else {
                activeMenu.isActive = true;
            }
        }
        else {
            activeMenu.isActive = true;
        }
        this.resetMenus(newMenus, activeMenu, parent);
        if (parent) {
            let parentIndex = newMenus.findIndex(x => x.code === parent.code);
            newMenus[parentIndex].isActive = activeMenu.isActive;
            newMenus[parentIndex].isExapand = activeMenu.isActive;
        }
        this.props.setActiveMenu(activeMenu, newMenus);
    }

    //#endregion event callbacks/public methods

    //#region private methods

    /**
     * finds and sets menu element with search menu values
     * @param menus
     * @param searchMenu
     * @param parent
     */
    private resetMenus(menus: MenuItemModel[], searchMenu: MenuItemModel, parent?: MenuItemModel) {
        if (menus && menus.length > 0) {
            for (let i = 0; i < menus.length; i++) {
                menus[i].isExapand = false;

                if (searchMenu.isActive &&
                    (!searchMenu.childNodes || searchMenu.childNodes.findIndex(x => x.isActive) < 0)) {
                    menus[i].isActive = false;
                }
                if (menus[i].code === searchMenu.code) {
                    this.setMenuState(menus[i], searchMenu);
                }
                this.resetMenus(menus[i].childNodes, searchMenu, menus[i]);
            }

        }

    }

    /**
     * sets menu state 
     * @param menu
     * @param selectedMenu
     */
    private setMenuState(menu: MenuItemModel, selectedMenu: MenuItemModel) {
        menu.isExapand = selectedMenu.isExapand;
        menu.isActive = selectedMenu.isActive;
    }

    /**
     * renders menu items
     */
    private renderMenuItems() {
        if (this.props.menus && this.props.menus.length > 0) {
            return this.props.menus.map((item, index) => {
                return this.renderChildMenus(item, index)
            });
        }
        return (null);
    }

    /**
     * renders child menus 
     * @param item
     * @param index
     * @param parent
     */
    private renderChildMenus(item: MenuItemModel, index: number, parent?: MenuItemModel) {
        return (
            <>
                <li key={index} className={`menu-item ${item.isActive ? 'active' : ''}`} onClick={this.onLinkClick.bind(this, item, parent)}>
                    <Link to={item.url}
                        className="menu-item-link d-flex"
                    >
                        <i className={`menu-item-link-icon align-self-center ${item.icon}`}></i>
                        <div className="nav-link-text align-self-center">{item.displayText}</div>
                    </Link>
                    {
                        item.childNodes && item.childNodes.length > 0 ?
                            item.isExapand ? <i className="fa fa-angle-up toggle"></i> : <i className="fa fa-angle-down toggle"></i>
                            : null
                    }
                </li>
                {
                    item.childNodes && item.childNodes.length > 0 && item.isExapand ?
                        <ul className="menu-item-group child">
                            {item.childNodes.map((x, i) => this.renderChildMenus(x, i, item))}
                        </ul> :
                        null
                }
            </>);
    }

    //#endregion private methods
}


