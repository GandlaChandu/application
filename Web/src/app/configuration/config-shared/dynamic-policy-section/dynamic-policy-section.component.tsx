//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { FormFieldComponent, DropDownComponent, DropDownPropModel, ComponentBase } from '../../../shared';

import './dynamic-policy-section.scss';
import { DynamicPolicySectionPropModel } from './models';

//#endregion application imports

export class DynamicPolicySectionComponent extends ComponentBase<DynamicPolicySectionPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        this.props.dispatchFetchScanPolicies(this.handleApiFetchError.bind(this));
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                <FormFieldComponent<DropDownPropModel>
                    name={this.props.name}
                    component={DropDownComponent}
                    props={
                        {
                            id: `ddl_${this.props.namespace}_form_dynamic_scan_policy`,
                            label: 'Policy',
                            options: this.props.scanPolicies,
                            helpText: 'Dynamic scan policy which when mapped shall be applied for the entity while running the dynamic scan'
                        }
                    }
                />
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion events callbacks/public methods

    //#region private methods
    //#endregion private methods
}
