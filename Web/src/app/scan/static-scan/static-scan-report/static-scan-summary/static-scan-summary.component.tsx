//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { DiscComponent } from '../../../../shared';

import './static-scan-summary.scss';
import { StaticScanSummaryPropModel } from './models/static-scan-summary-prop.model';

//#endregion application imports

export class StaticScanSummaryComponent extends React.Component<StaticScanSummaryPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook 
     */
    componentDidMount() {
        if (this.props.scanId) {
            this.props.dispatchFetchStaticScanSummary(this.props.scanId, () => this.props.dispatchError());
        }
    }

    /**
     * renders html for component 
     */
    render() {
        if (this.props.scanId && this.props.summary) {
            return (
                <div className="row space-row">
                    {this.renderBlock('Coverage', this.props.summary.coverage)}
                    {this.renderBlock('Tests Success', `${this.props.summary.testSuccessPercentage}%`)}
                    {this.renderBlock('Duplicated Lines', `${this.props.summary.duplicatedLinesPercentage}%`)}
                    {this.renderBlock('Cyclomatic Complexity', this.props.summary.cyclomaticComplexicity)}
                </div>
            )
        }
        return (null);
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders block html
     * @param title
     * @param content
     */
    private renderBlock(title: string, content) {
        return (
            <>
                <div className="col-sm-12 col-md-3 mt-4">
                    <DiscComponent displayText={title} innerText={content} />
                </div>
            </>
        )
    }

    //#endregion private methods
}