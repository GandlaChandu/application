//#region react imports

import React from 'react';
import { Route } from 'react-router-dom';

//#endregion react imports

//#region application imports

import { Url } from '../../utilities';
import { ErrorContainer, Helper } from '../../shared';
import { PrivateRoutePropModel } from './models';

//#endregion application imports

export class PrivateRouteComponent extends React.Component<PrivateRoutePropModel> {
    //#region model properties
    //#endregion model properties

    //#region life cycle hooks

    componentDidMount() {
        //Check if path is defined
        if (!this.isPathDefined()) {
            this.props.dispatchSetErrorStatusCode({ isGlobalError: true, errorCode: 404 });
        }
        else {
            //check for role
            if (!this.hasAccess()) {
                this.props.dispatchSetErrorStatusCode({ isGlobalError: true, errorCode: 401 });
            }
        }
    }

    /**
     * renders html for component 
     */
    render() {
        if (this.props?.isGlobalError || !this.isPathDefined() || !this.hasAccess()) {
            return <Route component={ErrorContainer} exact path={this.props.path} />
        }
        else {
            return <Route component={this.props.component} exact path={this.props.path} />
        }
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion events callbacks/public methods

    //#region private methods  

    /**
     * determines if the path is defined 
     */
    private isPathDefined() {
        let paths: string[] = Object.values(Url.pageUrl);
        if (paths.indexOf(this.props.location?.pathname) > -1) {
            return true;
        }
        return false;
    }

    /**
     * determines if user has access to the route 
     */
    private hasAccess() {
        if (!this.props.code) {
            return false;
        }
        return Helper.getScreenInfo(this.props.code, this.props.userRoles).hasPermission;
    }

    //#endregion private methods
}


