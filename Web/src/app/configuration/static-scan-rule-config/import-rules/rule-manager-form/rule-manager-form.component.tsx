//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { ListComponentBase, FormGridPropModel, GridRowModel } from '../../../../shared';

import { LanguageProfileMapModel } from '../../models';
import { RuleManagerFormPropModel, RuleManagerFormModel } from './models';
import { RuleManagerFormConstant } from './rule-manager-form.constant';
import { ImportRuleFilterFormModel } from '../models';

//#endregion application imports

export class RuleManagerFormComponent extends ListComponentBase<RuleManagerFormPropModel, RuleManagerFormModel> {

    //#region model properties

    private get profileInfo(): LanguageProfileMapModel {
        if (this.props.history?.location?.state?.profileInfo) {
            return this.props.history.location.state.profileInfo;
        }
        return new LanguageProfileMapModel();
    }


    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props, RuleManagerFormConstant.form);
    }

    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook
     */
    componentDidMount() {
        super.componentDidMount();
        this.props.dispatchFetchProfileBasedRules(
            {
                qualityProfileId: this.profileInfo.id
            },
            {
                languageId: this.profileInfo.languageId,
                pagination: this.getPaginationInfo(),
                severities: this.props.filterFormData?.severities,
                sonarSourceSecurities: this.props.filterFormData?.sonarSourceSecurities
            },
            this.handleApiFetchError.bind(this));
    }

    /**
     * component will receive props life cycle hook
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (this.props.filterFormData !== nextProps.filterFormData) {
            this.fetchRules(nextProps.filterFormData);
        }
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                <div>
                    {this.renderFormTable()}
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
        (this.gridPropModel as FormGridPropModel<RuleManagerFormModel>).isEditableDefault = true;
        this.gridPropModel.headerCells = [
            RuleManagerFormConstant.headers.ruleName,
            {
                ...RuleManagerFormConstant.headers.isActive,
                getFieldPropsCallBack: (row: GridRowModel<RuleManagerFormModel>) => {
                    return {
                        onChange: this.onRuleUpdationClick.bind(this, row)
                    };
                }
            }
        ];
        this.gridPropModel.paginationInfo.rowsPerPage = 10;
    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult() {
        this.fetchRules(this.props.filterFormData);
    }

    /**
     * Activate/Deactivate the rule for profile
     * @param row
     * @param value
     */
    public onRuleUpdationClick(row: GridRowModel<RuleManagerFormModel>, value) {
        this.props.dispatchSaveUpdateProfileRules(
            {
                qualityProfileId: this.profileInfo.id,
                ruleKey: row.rowData.key,
                isActive: value
            },
            this.handleApiSaveSuccess.bind(this),
            this.handleApiFetchError.bind(this));
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * fetches rules
     * @param filterInfo
     */
    private fetchRules(filterInfo: ImportRuleFilterFormModel) {
        this.props.dispatchFetchRules(
            {
                languageId: this.profileInfo.languageId,
                pagination: this.getPaginationInfo(),
                severities: filterInfo?.severities,
                sonarSourceSecurities: filterInfo?.sonarSourceSecurities
            },
            this.props.profileBasedRules?.items || [],
            this.handleApiFetchError.bind(this));
    }

    //#endregion private methods

}