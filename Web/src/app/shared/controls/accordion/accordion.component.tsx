//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import './accordion.scss';
import { AccordionPropModel } from './models/accordion-prop.model';
import { AccordionState } from './accordion.state';

//#endregion application imports

export class AccordionComponent extends React.Component<AccordionPropModel, AccordionState> {

    //#region model properties

    public readonly state: AccordionState = new AccordionState();

    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        this.setState({
            canExpand: this.props.canExpand
        });
    }

    componentWillUnmount() {
    }

    /**
    * renders html for component 
    */
    render() {
        return (
            <div className="accordion mt-1 full-height" id={this.props.uniqueKey}>
                <div className="card bg-light border-light mb-3">
                    <div className="card-header bg-info text-white " id={`${this.props.uniqueKey}_header`}>
                        <h5 className="mb-0 accordion-header" onClick={this.onPanelClick.bind(this)}>
                            {this.props.title}
                            <i className={`pull-right ${this.state.canExpand ? 'fa fa-angle-up' : 'fa fa-angle-down'}`}></i>
                        </h5>
                    </div>

                    <div id={`${this.props.uniqueKey} _collapse_content`}
                        className={`collapse ${this.state.canExpand ? 'show' : ''}`}
                        aria-labelledby={`${this.props.uniqueKey}_header`}>
                        <div className="card-body pt-1">
                            {this.props.content}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on panel click
     */
    public onPanelClick() {
        this.setState({
            canExpand: !this.state.canExpand
        });
    }

    //#endregion event callbacks/public methods

    //#region private methods
    //#endregion private methods
}