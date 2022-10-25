//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { ControlConstant, Helper } from '../../../shared';
import { SeverityType } from '../../../utilities';

import { ResultInfoPropModel } from './models/result-info-prop.model';
import './result-info.scss';

//#endregion application imports

export class ResultInfoComponent extends React.Component<ResultInfoPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * renders html for component 
     */
    render() {
        return (

            <tr>
                <td className="border-0">
                    <p>{Helper.dateFormat(this.props.date)}</p>
                </td>
                <td className="border-0">
                    <p>{this.props.projectName}</p>
                </td>
                <td className="border-0">
                    <p>{this.props.url}</p>
                </td>
                <td className="border-0 text-center">
                    <p className="counts">
                        {this.renderSeverityList()}
                    </p>

                </td>
            </tr>

        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders html for severity list 
     */
    private renderSeverityList() {
        return (
            <>
                {this.props.vulnerabilities.sort((a, b) => ControlConstant.severity.indexOf(a.text) - ControlConstant.severity.indexOf(b.text))
                    .map(function (list) {
                        switch (list.text) {
                            case SeverityType.High:
                                return (
                                    <label className={`${ControlConstant.color.danger}`}>{list.value}</label>
                                )
                            case SeverityType.Medium:
                                return (
                                    <label className={`${ControlConstant.color.warning}`}>{list.value}</label>
                                )
                            case SeverityType.Low:
                                return (
                                    <label className={`${ControlConstant.color.info}`}>{list.value}</label>
                                )
                            default:
                                return (
                                    <label className={`${ControlConstant.color.info}`}>{list.value}</label>
                                )
                        }
                    })}
            </>
        )
    }

    //#endregion private methods
}
