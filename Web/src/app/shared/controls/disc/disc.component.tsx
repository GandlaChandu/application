//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { SeverityType } from '../../../utilities';

import './disc.scss';
import { DiscPropModel } from './models/disc-prop.model';
import { ControlConstant } from '../control.constant';

//#endregion application imports

export class DiscComponent extends React.Component<DiscPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    /**
    * renders html for component 
    */
    render() {
        return (
            <div className="disc-container">
                <div className={`disc ${this.getDiscColor()}`}>
                    <div>
                        <p>{this.props.innerText}</p>
                    </div>
                </div>
                <div className="space-row"></div>
                <div className="disc-label">{this.props.displayText}</div>

            </div>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion event callbacks/public methods

    //#region private methods

    /**
     * gets disc color 
     */
    private getDiscColor() {
        switch (this.props.type) {
            case SeverityType.Low:
                return ControlConstant.color.info;
            case SeverityType.High:
                return ControlConstant.color.danger;
            case SeverityType.Medium:
                return ControlConstant.color.warning;
            default:
                return ControlConstant.color.info
        }
    }

    //#endregion private methods
}