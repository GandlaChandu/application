//#region react imports

import React from 'react';
import { ReCron } from '@sbzen/re-cron';

//#endregion react imports

//#region application imports

import './cron-config.scss';
import { CronConfigPropModel } from './models/cron-config-prop.model';

//#endregion application imports

export class CronConfigComponent extends React.Component<CronConfigPropModel> {

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
            <ReCron
                value={this.props.config}
                onChange={this.props.onChange}>
            </ReCron>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion event callbacks/public methods

    //#region private methods

    //#endregion private methods
}