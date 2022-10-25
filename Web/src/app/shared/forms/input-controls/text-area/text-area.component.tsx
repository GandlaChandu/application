//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import './text-area.scss';
import { TextareaPropModel } from './models/text-area-prop.model';
import { ControlComponentBase } from '../base';

//#endregion application imports

export class TextareaComponent extends ControlComponentBase<TextareaPropModel> {

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
                <textarea
                    className="form-control"
                    {...this.props.input}
                    placeholder={this.props.placeHolder}
                    disabled={this.props.disabled}
                />
                {this.renderValidationError()}
            </>
        );
    }


    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion event callbacks/public methods

    //#region private methods
    //#endregion private methods
}