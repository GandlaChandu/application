//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import './card.scss';
import { CardPropModel } from './models/card-prop.model';

//#endregion application imports

export class CardComponent extends React.Component<CardPropModel> {

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
            <div className="card">
                {this.renderHeaderHtml()}
                {this.renderContentHtml()}
                {this.renderFooterHtml()}
            </div>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion event callbacks/public methods

    //#region private methods

    /**
     * render header html 
     */
    private renderHeaderHtml() {
        if (this.props.title) {
            return (
                <div className="card-header card-header-padding">
                    <h5 className="card-title text-white">{this.props.title}</h5>
                </div>
            );
        }
        return (null);
    }

    /**
     * render content html 
     */
    private renderContentHtml() {
        return (
            <div className="card-body">
                {this.props.content}
            </div>
        );
    }

    /**
     * render footer html 
     */
    private renderFooterHtml() {
        if (this.props.footer) {
            return (
                <div className="card-footer text-muted">
                    {this.props.footer}
                </div>
            );
        }
        return (null);
    }

    //#endregion private methods
}