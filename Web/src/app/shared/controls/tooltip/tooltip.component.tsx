//#region react imports

import React from 'react';
import { Tooltip } from 'reactstrap';

//#endregion react imports

//#region application imports

import './tooltip.scss';
import { TooltipPropModel } from './models/tooltip-prop.model';
import { ButtonComponent } from '../button';

//#endregion application imports

export class TooltipComponent extends React.Component<TooltipPropModel, { open }> {

    //#region model properties

    public readonly state = { open: false };

    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
    * renders html for component 
    */
    render() {
        return (
            <>
                <ButtonComponent
                    {...this.props.args}
                    id={`btn_tooltip_${this.props.target}`}
                    mouseEnterHandler={this.onHelpClick.bind(this)}
                    mouseLeaveHandler={this.onHelpClick.bind(this)}
                />
                <Tooltip
                    placement="top"
                    isOpen={this.state.open}
                    className={this.props.styleClass}
                    target={`btn_tooltip_${this.props.target}`}
                >
                    {this.props.message}
                </Tooltip>
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on help link click 
     */
    public onHelpClick() {
        this.setState({
            open: this.state.open ? false : true
        });
    }

    //#endregion event callbacks/public methods

    //#region private methods
    //#endregion private methods
}