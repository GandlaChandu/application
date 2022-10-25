//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { Url, Constant } from '../../utilities';
import { StorageHelper } from '../../core';
import { Helper } from '../../shared';

import './app-header.scss';
import { AppHeaderPropModel } from './models/app-header-prop.model';
import logo from '../../../assets/acs_solutions_logo.png';
import personIcon from '../../../assets/icon_person.png';

//#endregion application imports

export class AppHeaderComponent extends React.Component<AppHeaderPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * renders html for component 
     */
    render() {
        return (
            <header className="custombg">
                {/* <div className="row mr-0 ml-0 h-100"> */}
                <div className="d-flex full-width h-100">
                    {this.renderMenuIcon()}
                    <div className="mr-auto d-flex">
                        <img src={logo}
                            alt=""
                            onClick={this.onTitleClick.bind(this)}
                            className="home-logo logosize align-self-center" />
                        <h1 className="app-title d-none d-sm-block">Application Analyzer</h1>
                    </div>
                    <div className="h-100 mr-4 align-self-center">
                        <button type="button"
                            id="sidebarCollapse"
                            className="btn btn-info h-100 d-flex p-0 my-0 m-0">
                            <i className="fa fa-bell align-self-center"></i>
                        </button>
                    </div>
                    <div className="pl-1 mr-lg-2 align-self-center personDropdown d-flex">
                        <img src={personIcon}
                            alt=""
                            onClick={this.onIconClick.bind(this)}
                            className="loggedinperson" />
                        {this.renderIconDropdown()}
                    </div>
                </div>
                {/* </div> */}
            </header>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on home image click
     */
    public onTitleClick() {
        if (this.props.history) {
            if (this.props.isGlobalError) {
                this.props.dispatchClearError();
            }
            this.props.history.push(Url.pageUrl.landingPage);
        }
    }

    /**
     * on menu icon btn click 
     */
    public menuIconClick() {
        if (this.props.toggleMenu) {
            this.props.toggleMenu(!this.props.showMenu);
        }
    }

    /**
     * on icon btn click 
     */
    public onIconClick() {
        this.props.toggleIconDropdown(!this.props.showUserIconDropdown);
        this.renderIconDropdown();
    }

    /**
     * on logout button click
     */
    public onLogoutClick() {
        StorageHelper.removeLocal(Constant.ssoParams.accessToken);
        StorageHelper.getSession(Constant.ssoParams.redirectURL);
        Helper.redirectToApp(Url.getSSOAcceleratorUrl((`${Url.apiUrl.SSOAcceleratorLogoutApi}?${Constant.ssoParams.returnUrl}=${Helper.getOriginURL()}`)));
    }

    //#endregion events

    //#region private methods

    /**
     *  renders menu icon html
     */
    private renderMenuIcon() {
        if (this.props.isGlobalError) {
            return (null);
        }
        return (
            <div className="mr-3 d-block d-sm-none">
                <button type="button"
                    id="sidebarCollapse"
                    className="btn btn-info p-0 h-100 d-flex m-0"
                    onClick={this.menuIconClick.bind(this)}>
                    <i className="fa fa-align-left align-self-center"></i>
                </button>
            </div>
        );
    }

    /**
     *  renders icon dropdown html
     */
    private renderIconDropdown() {
        if (this.props.showUserIconDropdown) {
            return (
                <div className="dropdown-content">
                    <h4 className="pl-3 mb-2">{this.props?.loggedInUserInfo?.firstName} {this.props?.loggedInUserInfo?.lastName}</h4>
                    <p className="title pl-3">{this.props?.loggedInUserInfo?.emailId}</p>
                    <button className="pl-3" onClick={this.onLogoutClick.bind(this)}><i className="fa fa-sign-out pr-2" aria-hidden="true"></i>Logout</button>
                </div>
            );
        }
    }

    //#endregion private methods
}