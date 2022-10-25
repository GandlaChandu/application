//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { FunctionalCode } from '../../../utilities';
import { ComponentBase, CardComponent } from '../../../shared';

import { DynamicScanPolicyModel } from '../models';
import { DynamicPolicyCategoryPropModel } from './models';
import { DynamicScannerManagerForm } from './dynamic-scanner-manager';
import { DynamicPolicyCategoryForm } from './dynamic-policy-category-form';

//#endregion application imports

export class DynamicPolicyCategoryComponent extends ComponentBase<DynamicPolicyCategoryPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.DynamicEditScanner);
    }

    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook
     */
    componentDidMount() {
        super.componentDidMount();
        let categoryData: DynamicScanPolicyModel = new DynamicScanPolicyModel();
        if (this.hasLocationInfo) {
            categoryData = this.locationInfo.categoryInfo || categoryData;
        }
        this.props.dispatchSetCategoryInfo(categoryData);
        this.props.dispatchFetchAlertShresholdTypes(this.handleApiFetchError.bind(this));
        this.props.dispatchFetchAttackStrengthTypes(this.handleApiFetchError.bind(this));
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                {this.renderPrevButton()}
                {this.renderForm()}
                {this.renderScannerGrid()}
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on back button click go to previous page
     */
    public onPrevButtonClick() {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: this.componentInfo.prevPageUrl,
                    state: { scanPolicyInfo: this.locationInfo.scanPolicyInfo, isEdit: true }
                }
            );
        }
    }

    //#endregion event public methods

    //#region private methods


    /**
     * renders form html 
     */
    private renderForm() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <CardComponent content=
                        {
                            <DynamicPolicyCategoryForm history={this.props.history} />
                        }
                    >
                    </CardComponent>
                </div>
            </div>
        );
    }

    /**
     * renders grid control 
     */
    private renderScannerGrid() {
        if (this.props.dynamicCategoryInfo) {
            return (
                <div className="row">
                    <div className="col-12">
                        <CardComponent content=
                            {
                                <DynamicScannerManagerForm history={this.props.history} />
                            }
                        >
                        </CardComponent>
                    </div>
                </div>
            );
        }
        return (null);
    }


    //#endregion private methods

}