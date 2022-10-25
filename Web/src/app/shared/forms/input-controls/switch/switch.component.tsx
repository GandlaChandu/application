//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import './switch.scss';
import { ControlComponentBase } from '../base';
import { SwitchPropModel } from './models/switch-prop.model';

//#endregion application imports

export class SwitchComponent extends ControlComponentBase<SwitchPropModel> {

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
        const value = this.props.input.value ? true : false;
        return (
            <>
                <div className="form-check d-flex switch-wrapper pl-0 mb-0">
                    {this.renderLabel()}
                    <div>
                        <label className="switch">
                            <input type="checkbox"
                                className="form-check-input"
                                name={this.props.input.name}
                                value={this.props.input.value ? 'true' : 'false'}
                                disabled={this.props.disabled}
                                checked={value}
                                onChange={this.onChange.bind(this)}
                            />
                            <span className={this.props.disabled ? 'slider round inactive' : 'slider round'}></span>
                        </label>
                    </div>
                    {this.renderValidationError()}
                </div>
            </>
        );

    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on change event
     * @param event
     */
    public onChange(event) {
        let checked = event.target.checked;
        if (this.props.input.onChange) {
            this.props.input.onChange(checked);
        }
    }

    //#endregion event callbacks/public methods

    //#region private methods

    //#endregion private methods
}