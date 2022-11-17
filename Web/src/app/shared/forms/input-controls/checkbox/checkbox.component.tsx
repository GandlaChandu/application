//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import './checkbox.scss';
import { ControlComponentBase } from '../base';
import { CheckcboxPropModel } from './models/checkbox-prop.model';

//#endregion application imports

export class CheckboxComponent extends ControlComponentBase<CheckcboxPropModel> {

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
            <>
                <label></label>
                <div className="form-check">
                    {this.renderCheckboxLabel(this.props.isLabelLeft, true)}
                    <input type="checkbox"
                        className="form-check-input chb-lg"
                        name={this.props.input.name}
                        id={this.props.id}
                        onChange={this.onCheckChange.bind(this)}
                        disabled={this.props.disabled}
                        value={this.props.input.value}
                        checked={this.props.input.value ? true : false}
                    />
                    {this.renderCheckboxLabel(!this.props.isLabelLeft)}
                </div>
                {this.renderValidationError()}
            </>
        );

    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on checkbox selection change
     * @param event
     */
    public onCheckChange(event) {
        if (this.props.input.onChange) {
            this.props.input.onChange(event.target.checked);
        }
    }       

    //#endregion event callbacks/public methods

    //#region private methods

    /**
     * renders checkbox label
     * @param show
     * @param isLeft
     */
    private renderCheckboxLabel(show: boolean, isLeft: boolean = false) {
        if (show && this.props.label) {
            return (
                <label className={isLeft ? 'field-label chb-label-left' : 'field-label chb-label-right'} htmlFor={this.props.id}>
                    {this.props.label}
                    {this.renderRequiredMark()}
                </label>
            );
        }
        return (null);
    }

    //#endregion private methods
}