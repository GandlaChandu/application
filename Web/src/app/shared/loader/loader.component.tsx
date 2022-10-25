//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import './loader.scss';
import { LoaderPropModel } from './models/loader-prop.model';
import { NumberHelper } from '../../core';

//#endregion application imports

export class LoaderComponent extends React.Component<LoaderPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
    * renders html for component 
    */
    render() {
        if (this.props.showLoader || NumberHelper.toNumber(this.props.queueCount, 0) > 0) {
            return this.getLoaderHtml();
        }
        return (null);
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion event callbacks/public methods

    //#region private methods

    /**
     * gets loader markup 
     */
    private getLoaderHtml() {
        return (
            <div className="spinner">
            </div >
        );
    }
    
    //#endregion private methods
}
