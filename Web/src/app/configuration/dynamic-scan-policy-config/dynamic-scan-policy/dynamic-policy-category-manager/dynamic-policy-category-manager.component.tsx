//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { ListComponentBase, Helper, GridActionFieldType, GridRowModel } from '../../../../shared';
import { Url, FunctionalCode } from '../../../../utilities';

import './dynamic-policy-category-manager.scss';
import { DynamicPolicyCategoryManagerConstant } from './dynamic-policy-category-manager.constant';
import { DynamicPolicyCategoryPropModel } from './models';
import { DynamicCategoryModel } from '../../models';

//#endregion application imports

export class DynamicPolicyCategoryManagerComponent extends ListComponentBase<DynamicPolicyCategoryPropModel, DynamicCategoryModel>{

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.DynamicEditPolicy);
    }

    //#endregion constructor

    //#region life cycle hooks

    /**
    * component did mount life cycle hook 
    */
    componentDidMount() {
        super.componentDidMount();
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                <div>
                    {this.renderTable()}
                </div>
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * sets grid props 
     */
    public setGridInfo() {
        this.gridPropModel.headerCells = [
            DynamicPolicyCategoryManagerConstant.headers.policyName,
            DynamicPolicyCategoryManagerConstant.headers.attackStrength,
            DynamicPolicyCategoryManagerConstant.headers.alertThreshold,
            {
                ...DynamicPolicyCategoryManagerConstant.headers.isActive,
                format: (row: GridRowModel<DynamicCategoryModel>) => <>{Helper.toString(row.rowData.enabled)}</>
            }
        ];
        this.gridPropModel.actionElements = [
            {
                type: GridActionFieldType.Edit,
                onClick: this.onEditLinkClick.bind(this)
            }
        ];
    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult() {
        this.props.dispatchFetchDynamicScanPolicies(this.props.dynamicScanPolicyInfo.scanPolicyCode, this.handleApiFetchError.bind(this));
    }

    /**
     * on edit link click callback
     */
    public onAddScanPolicyClick() {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.addEditDynamicScanRule
                }
            );
        }
    }

    /**
     * on edit link click callback
     * @param rowData
     */
    public onEditLinkClick(rowData: DynamicCategoryModel) {
        let category: DynamicCategoryModel = { ...rowData };
        category.scanPolicyCode = this.props.dynamicScanPolicyInfo?.scanPolicyCode;
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.dynamicScanPolicyScanner,
                    state: { categoryInfo: category, scanPolicyInfo: this.props.dynamicScanPolicyInfo}
                }
            );
        }
    }

    //#endregion events callbacks/public methods

    //#region private methods

    //#endregion private methods
}