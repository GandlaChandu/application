//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { ListComponentBase, GridActionFieldType, PageRequestModel, ButtonComponent } from '../../../shared';
import { Url, FunctionalCode } from '../../../utilities';

import { QualityProfileManagerPropModel } from './models';
import './quality-profile-manager.scss';
import { LanguageProfileMapModel } from '../models';
import { QualityProfileManagerConstant } from './quality-profile-manager.constants';

//#endregion application imports

export class QualityProfileManagerComponent extends ListComponentBase<QualityProfileManagerPropModel, LanguageProfileMapModel>{

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.StaticViewRuleList);
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
        )
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * sets grid props 
     */
    public setGridInfo() {
        this.gridPropModel.headerCells = [
            QualityProfileManagerConstant.headers.profileName,
            QualityProfileManagerConstant.headers.languageName
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
        this.props.dispatchFetchStaticScanRules(pageRequest, this.handleApiFetchError.bind(this));
    }

    /**
     * on add/edit quality profile link
     */
    public onAddQualityProfileClick() {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.addEditStaticScanRule,
                    state: { isEdit: false, profileInfo: null }
                }
            );
        }
    }

    /**
     * on edit link click callback
     * @param rowData
     */
    public onEditLinkClick(rowData: LanguageProfileMapModel) {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.addEditStaticScanRule,
                    state: {
                        isEdit: true,
                        profileInfo: rowData
                    }
                }
            );
        }
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     *  html for adding  link
     */
    private renderAddLink() {
        return (
            <ButtonComponent
                className="btn-primary"
                type="button"
                displayText="Add Quality Profile"
                displayType="link"
                id="btn_staticscanrules_list_add_qualityprofile"
                fontIconPrefix="fa fa-plus"
                clickHandler={this.onAddQualityProfileClick.bind(this)}
            >
            </ButtonComponent>
        );
    }

    //#endregion private methods
}
