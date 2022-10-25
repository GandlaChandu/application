//#region react imports

import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

//#endregion react imports

//#region application imports

import './toaster.scss';
import { ToasterPropModel } from './models/toaster-prop.model';
import { MessageType } from '../../../utilities';


//#endregion application imports

export class ToasterComponent extends React.Component<ToasterPropModel> {

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
            <Snackbar
                open={this.props.open}
                autoHideDuration={1500}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                key="top center"
                onClose={this.onClose.bind(this)} >
                {this.renderMessage()}
            </Snackbar>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on close event 
     */
    public onClose() {
        if (this.props.handleClose) {
            this.props.handleClose();
        }
    }

    //#endregion event callbacks/public methods

    //#region private methods

    /**
     * renders message html 
     */
    private renderMessage() {
        switch (this.props.messageType) {
            case MessageType.Error:
                return this.renderErrorMessage();
            case MessageType.Info:
                return this.renderInfoMessage();
            case MessageType.Success:
                return this.renderSuccessMessage();
            case MessageType.Warning:
                return this.renderWarningMessage();
            default:
                return this.renderInfoMessage();
        }
    }

    /**
     * renders success message html 
     */
    private renderSuccessMessage() {
        return (
            <Alert severity="success">{this.props.message}</Alert>
        );
    }

    /**
     * renders warning message html 
     */
    private renderWarningMessage() {
        return (
            <Alert severity="warning">{this.props.message}</Alert>
        );
    }

    /**
     * renders error message html 
     */
    private renderErrorMessage() {
        return (
            <Alert severity="error">{this.props.message}</Alert>
        );
    }

    /**
     * renders info message html 
     */
    private renderInfoMessage() {
        return (
            <Alert severity="info">{this.props.message}</Alert>
        );
    }

    //#endregion private methods
}