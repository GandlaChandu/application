//#region react imports

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//#endregion react imports

//#region application imports

import './datepicker.scss';
import { DatepickerPropModel } from './models/datepicker-prop.model';
import { ControlComponentBase } from '../base';

//#endregion application imports

export class DatepickerComponent extends ControlComponentBase<DatepickerPropModel> {

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
                <DatePicker
                    showMonthDropdown
                    showYearDropdown
                    className="form-control"
                    selected={this.props.input.value}
                    onChange={this.props.input.onChange}
                    disabled={this.props.disabled}
                    selectsStart={this.props.selectsStart}
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    selectsEnd={this.props.selectsEnd}
                    minDate={this.props.minDate}
                    maxDate={this.getMaxDate()}
                />
                {this.renderValidationError()}
            </>
        );
    }


    //#endregion life cycle hooks

    //#region event callbacks/public methods

    //#endregion event callbacks/public methods

    //#region private methods

    /**
     * gets max date 
     */
    private getMaxDate() {
        if (this.props.maxDate) {
            return this.props.maxDate;
        }
        if (this.props.endDate) {
            return this.props.endDate;
        }
    }

    //#endregion private methods
}