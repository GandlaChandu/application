//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { ListComponentBase, Helper, GridActionFieldType, PageRequestModel, ButtonComponent, GridRowModel } from '../../../shared';
import { Constant, Url, FunctionalCode } from '../../../utilities';

import { DynamicScanPolicyModel } from '../models';
import { DynamicScanPolicyManagerPropModel } from './models';
import { DynamicScanPolicyManagerConstant } from './dynamic-scan-policy-manager.constant';

//#endregion application imports

export class DynamicScanPolicyManagerComponent extends ListComponentBase<DynamicScanPolicyManagerPropModel, DynamicScanPolicyModel>{

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props, Constant.pageTitle.dynamicScanRuleConfigListPage);
        this.setComponentInfo(FunctionalCode.DynamicViewRuleList);

    }

    //#endregion constructor

    //#region life cycle hooks

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                <div>
                    <div className="row">
                        <div className="col-sm-12 text-right">
                            {this.renderAddLink()}
                        </div>
                    </div>
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
            DynamicScanPolicyManagerConstant.headers.scanPolicyName,
            DynamicScanPolicyManagerConstant.headers.attackStrength,
            DynamicScanPolicyManagerConstant.headers.alertThreshold,
            {
                ...DynamicScanPolicyManagerConstant.headers.isActive,
                format: (row: GridRowModel<DynamicScanPolicyModel>) => <>{Helper.toString(!row.rowData.isDeleted)}</>
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
    public fetchGridResult(pageRequest: PageRequestModel) {
        this.props.dispatchFetchDynamicScanRules(pageRequest, this.handleApiFetchError.bind(this));
    }

    /**
     * on add link click callback
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
    public onEditLinkClick(rowData: DynamicScanPolicyModel) {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.addEditDynamicScanRule,
                    state: { scanPolicyInfo : rowData }
                }
            );
        }
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     *  renders html for add client link
     */
    private renderAddLink() {
        return (
            <ButtonComponent
                type="button"
                displayText="Add Scan Policy"
                displayType="link"
                id="btn_dynamicscanrules_list_add_scanpolicy"
                fontIconPrefix="fa fa-plus"
                className="btn-primary"
                clickHandler={this.onAddScanPolicyClick.bind(this)}
            >
            </ButtonComponent>
        );
    }

    //#endregion private methods
}