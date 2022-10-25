//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import './error.scss';
import { ErrorPropModel } from './models/error-prop.model';
import { ButtonComponent } from '../controls';
import { Url } from '../../utilities';

//#endregion application imports

export class ErrorComponent extends React.Component<ErrorPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
    }

    componentWillUnmount() {
        if (this.props.dispatchClearError) {
            this.props.dispatchClearError();
        }
    }

    /**
    * renders html for component 
    */
    render() {
        return this.getErrorHtml();
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on redirect link click 
     */
    public onRedirectClick() {
        this.props.dispatchClearError();
        this.props.history?.push(Url.pageUrl.landingPage);
    }

    //#endregion event callbacks/public methods

    //#region private methods

    /**
     * gets error page markup 
     */
    private getErrorHtml() {
        switch (this.props.errorInfo.errorCode) {
            case 404:
                return this.renderNotFound();
            case 400:
                return this.renderServerError();
            case 500:
                return this.renderServerError();
            case 401:
                return this.renderUnauthorisedError();
            default:
                return this.renderNotFound();
        }
    }

    /**
     * renders html for not found error 
     */
    private renderNotFound() {
        return (
            <div className="center">
                <h3 className="font-bold">Ooops!!!</h3>
                <div className="error-desc">
                    <p>Sorry, but the page you are looking for has not been found </p>
                    <p>Try checking the URL or
                        <ButtonComponent
                            displayText="click here"
                            className="pl-0 ml-0"
                            displayType="link"
                            clickHandler={this.onRedirectClick.bind(this)} />
                        to navigate to home page </p>
                </div>
            </div>
        );
    }

    /**
     * renders html for internal server error 
     */
    private renderServerError() {
        return (
            <div className="center">
                <h3 className="font-bold">Ooops!!!</h3>
                <div className="error-desc">
                    <p>An error has occurred while processing the request! Please try again.</p>
                    <p>You can contact the Help Center at <label>{process.env.REACT_APP_HELP_DESK_EMAIL}</label> for further queries or
                        <ButtonComponent
                            displayText="click here"
                            className="pl-0 ml-0"
                            displayType="link"
                            clickHandler={this.onRedirectClick.bind(this)} />
                        to navigate to home page
                    </p>
                </div>
            </div>
        );
    }

    /**
     * renders html for unauthorised user error
     */
    private renderUnauthorisedError() {
        return (
            <div className="center">
                <h3 className="font-bold">Unauthorised Error</h3>
                <div className="error-desc">
                    You are not authorised to access this page
                </div>
            </div>
        );
    }

    //#endregion private methods
}