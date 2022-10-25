//#region react imports

import React from 'react';
import Select from 'react-select';

//#endregion react imports

//#region application imports

import './multi-select-dropdown.scss';
import { ControlComponentBase } from '../base';
import { MultiSelectDropDownPropModel } from './models/multi-select-dropdown-prop.model';

//#endregion application imports

export class MultiSelectDropDownComponent extends ControlComponentBase<MultiSelectDropDownPropModel> {

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
                {this.renderLabel()}
                <Select
                    isMulti
                    valueKey="value"
                    name={this.props.input.name}
                    value={this.transformValue(this.props.input.value)}
                    options={this.props.options}
                    onChange={this.onChange(this.props.input.onChange)}
                    onBlur={this.onFocusOut.bind(this)}
                    onFocus={this.props.input.onFocus}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
                {this.renderValidationError()}

            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on change event
     * @param func
     */
    public onChange(func) {
        return function handleMultiHandler(values) {
            if (values && values.map) {
                func(values.map(value => value.value));
            }
            else {
                func(values);
            }
        };
    }

    /**
     * on focus out 
     */
    public onFocusOut() {
        if (this.props.input.onBlur) {
            this.props.input.onBlur(this.props.input.value)
        }
    }

    /**
     * For multi select, Redux Form keeps the value as array of strings, while React Select 
     * wants the array of values in the form [{ value: "grape", label: "Grape" }]
     * @param value
     */
    public transformValue(value) {

        if (!this.props.options ||
            value === undefined ||
            value === null ||
            value === '') {
            return null;
        }
        if (typeof value === 'string') {
            return [];
        };

        if (!value.length) {
            value = [value];
        }

        const filteredOptions = this.props.options.filter(option => {
            return value.indexOf(option.value) !== -1;
        });

        return filteredOptions;

    }

    //#endregion event callbacks/public methods

    //#region private methods
    //#endregion private methods
}