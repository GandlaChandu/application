//#region react imports

import React from 'react';
import { Redirect } from 'react-router';

//#endregion react imports

//#region application imports

import { Url, Constant } from '../utilities';
import { BoolHelper, StringHelper, StorageHelper } from '../core';
import { LoaderContainer, ToasterComponent, Helper, ErrorContainer } from '../shared';

import './app-root.scss';
import { AppRootPropModel } from './models/app-root-prop.model';
import routeConfig from './app-root.router';
import { AppFooterComponent, AppHeaderContainer, NavbarContainer } from '../layout';

//#endregion application imports

export class AppRootComponent extends React.Component<AppRootPropModel> {

    //#region model properties

    private unListen: any;

    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.props.dispatchPageLoadingState(true);
    }

    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        if (this.props && this.props.history) {
            this.unListen = this.props.history.listen((location, action) => {
                this.handleRouterEvent(location, action);
            });
        }
        const access_token = new URLSearchParams(Helper.getSearchURL()).get(Constant.ssoParams.accessToken);
        if (access_token) {
            StorageHelper.setLocal(Constant.ssoParams.accessToken, access_token);
            this.setAuthProps();
            this.props.dispatchSSORedirectState(true);
        }
        else if (StorageHelper.getLocal(Constant.ssoParams.accessToken)) {
            this.setAuthProps();
        }
        else {
            this.props.dispatchAuthenticatedUser(false);
            StorageHelper.setSession(Constant.ssoParams.redirectURL, Helper.getCurrentURL());
        }
    }

    componentWillUnmount() {
        if (this.unListen) {
            this.unListen();
        }
    }

    /**
    * renders html for component 
    */
    render() {
        if (this.props?.isAutheticated === true) {
            return (
                <>
                    <LoaderContainer />
                    <div className="wrapper">
                        <AppHeaderContainer />
                        <div className="body-content">
                            {this.renderBody()}
                        </div>
                        <AppFooterComponent />
                    </div>
                </>
            );
        }
        // Explicitly checking for false condition to avoid undefined condition
        else if (this.props?.isAutheticated === false) {
            return (
                Helper.redirectToApp(Url.getSSOAcceleratorUrl((`${Url.apiUrl.SSOAcceleratorLoginApi}?${Constant.ssoParams.returnUrl}=${Helper.getOriginURL()}`)))
            )
        }
        return (null);
    }

    //#endregion life cycle hooks

    //#region events/public methods

    /**
     * on toaster close event
     */
    public onToasterClose() {
        this.props.dispatchCloseToaster();
    }

    //#endregion events/public methods

    //#region private methods

    /**
     * sets authentication properties 
     */
    private setAuthProps() {
        this.props.dispatchAuthenticatedUser(true);
        this.props.dispatchFetchLoggedInUserInfo(
            () => {
                this.props.dispatchPageLoadingState(false);
            },
            () => {
                this.props.dispatchPageLoadingState(false);
            }
        );
    }

    /**
     * renders body html content
     */
    private renderBody() {
        if (this.props.isLoading) {
            return (null);
        }
        let hasMenu: boolean = !this.props.isGlobalError && this.props.history.location.pathname !== Url.pageUrl.errorPage && BoolHelper.toBool(this.props.showMenu, true);
        if (this.props.userProfile) {
            return (
                <div className="main-content">
                    {this.renderNav(hasMenu)}
                    {this.renderContentBody(hasMenu)}
                </div>
            );
        }
        return (
            <ErrorContainer />
        );
    }

    /**
     * renders nav menu html
     * @param hasMenu
     */
    private renderNav(hasMenu: boolean) {
        return (
            <div className={hasMenu ? 'show-side-nav' : 'hide-side-nav'}>
                <NavbarContainer history={this.props.history} />
            </div>
        );
    }

    /**
     * renders page place holder html
     * @param hasMenu
     */
    private renderContentBody(hasMenu: boolean) {
        return (
            <div className="has-side-nav">
                <div className="container-fluid right-wrapper" >
                    <div>
                        {this.renderPageTitle()}
                        {routeConfig}
                        {this.renderAlertHtml()}
                        {this.renderRedirectionHtml()}
                        {this.renderToasterHtml()}
                        <div className="space-row"></div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * renders page title html
     */
    private renderPageTitle() {
        if (this.props.pageTitle) {
            return (
                <h1>{this.props.pageTitle}</h1>
            );
        }
        return (null);
    }

    /**
     * renders alert html
     */
    private renderAlertHtml() {
        if (this.props.alertInfo && this.props.alertInfo.open && !this.props.isGlobalError) {
            return (
                <div className="alert alert-danger" role="alert">
                    Correct the following errors:
                    <ul>
                        {
                            this.props.alertInfo.messages.map((x, i) =>
                                <li key={i}>{x}</li>
                            )
                        }
                    </ul>
                </div>
            );
        }
        return (null);
    }

    /**
     * renders redirection html
     */
    private renderRedirectionHtml() {
        if (this.props.isGlobalError) {
            return (
                <Redirect to='/error' />
            );
        }
        else if (this.props.isSSORedirect) {
            return (
                <>
                    <Redirect to={`${StorageHelper.getSession(Constant.ssoParams.redirectURL)}`} />
                </>
            );
        }
        return (null);
    }

    /**
     * renders toaster html
     */
    private renderToasterHtml() {
        if (this.props.toasterInfo) {
            return (
                <ToasterComponent
                    open={this.props.toasterInfo.open}
                    message={this.props.toasterInfo.message}
                    messageType={this.props.toasterInfo.messageType}
                    handleClose={this.onToasterClose.bind(this)}
                >
                </ToasterComponent>
            );
        }
        return (null);
    }

    /**
     * route event handler
     * @param location
     * @param action
     */
    private handleRouterEvent(location, action) {
        if (location.pathname === Url.pageUrl.emptyPath) {
            this.props.history.push(Url.pageUrl.manageDashboardPage);
        }
        else if (Object.values(Url.pageUrl).findIndex(x => StringHelper.areEqual(x, location.pathname)) < 0) {
            if (this.props.dispatchSetError) {
                this.props.dispatchSetError({ isGlobalError: true });
            }
        }
    }

    //#endregion private methods
}

