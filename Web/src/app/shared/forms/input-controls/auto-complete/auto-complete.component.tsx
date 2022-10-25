//#region react imports

import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

//#endregion react imports

//#region application imports

import './auto-complete.scss';
import { AutoCompletePropModel } from './models/auto-complete-prop.model';

//#endregion application imports

export class AutoCompleteComponent extends React.Component<AutoCompletePropModel> {

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
        return this.renderControl();
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion event callbacks/public methods

    //#region private methods


    /**
     * renders html for control html 
     */
    private renderControl() {
        return (
            <Autocomplete
                id={this.props.id}
                options={this.props.options}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
            />
        );
    }

    //#endregion private methods
}