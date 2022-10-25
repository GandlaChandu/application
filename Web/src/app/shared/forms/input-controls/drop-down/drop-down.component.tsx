//#region react imports

import React, { ElementRef } from 'react';
import Select from 'react-select';

//#endregion react imports

//#region application imports

import './drop-down.scss';
import { DropDownPropModel } from './models';
import { ControlComponentBase } from '../base';

//#endregion application imports

export class DropDownComponent extends ControlComponentBase<DropDownPropModel> {

    //#region model properties

    private elementRef: ElementRef<any>;

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
            <div onMouseLeave={this.onMouseOut.bind(this)}>
                {this.renderLabel()}
                <Select
                    valueKey="value"
                    name={this.props.input.name}
                    value={this.transformValue(this.props.input.value)}
                    options={this.props.options}
                    onChange={this.singleChangeHandler(this.props.input.onChange)}
                    onBlur={this.onFocusOut.bind(this)}
                    onFocus={this.props.input.onFocus}
                    className="basic-select form-drop-down"
                    classNamePrefix="select"
                    isClearable={!this.props.removeClear}
                    menuPosition="fixed"
                    menuShouldScrollIntoView
                    isDisabled={this.props.disabled}
                    ref={ref => {
                        this.elementRef = ref;
                    }}
                />
                {this.renderValidationError()}

            </div>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on mouse out event 
     */
    public onMouseOut() {
        if (!this.elementRef.state.menuIsOpen) {
            this.elementRef.blur();
        }
    }

    /**
     * onChange from Redux Form Field has to be called explicity.
     */
    public singleChangeHandler(func) {
        let self = this;
        return function handleSingleChange(value) {
            func(value ? value.value : '');
            self.onMouseOut();
        };
    }

    /**
     * For single select, Redux Form keeps the value as a string, while React Select 
     * wants the value in the form { value: "grape", label: "Grape" }
     * @param value
     */
    public transformValue(value) {
        if (!this.props.options || value === undefined || value === null || value === '') {
            return null;
        }
        const filteredOptions = this.props.options.filter(option => {
            return option.value === value;
        });
        return filteredOptions[0];
    }

    /**
     * on focus out 
     */
    public onFocusOut() {
        if (this.props.input.onBlur) {
            this.props.input.onBlur(this.props.input.value)
        }
    }

    //#endregion event callbacks/public methods

    //#region private methods
    //#endregion private methods
}