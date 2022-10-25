//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { Constant, Url, ScanTypeEnum, FunctionalCode } from '../../../utilities';
import { ComponentBase, ButtonComponent, ScanCascadeForm, ScanCascadeFormModel } from '../../../shared';

import './dynamic-scan-trigger.scss';
import { DynamicScanTriggerPropModel } from './models/dynamic-scan-trigger-prop.model';

//#endregion application imports

export class DynamicScanTriggerComponent extends ComponentBase<DynamicScanTriggerPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.DynamicNewScan);

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
                {this.renderPrevButton()}
                <ScanCascadeForm
                    onSubmit={this.onTriggerScanClick.bind(this)}
                    namespace={Constant.reducerKey.dynamicScanTriggerReducer}
                    scanType={ScanTypeEnum.DynamicScan}
                    submitBtnText="Trigger Scan"
                    submitBtnIcon="fa fa-clock-o"
                />
            </>
        )
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on trigger scan button click
     */
    public onTriggerScanClick(model: ScanCascadeFormModel) {
        if (!model.projectId) {
            return;
        }

        this.props.dispatchInitiateScan(model.projectId,
            (response) => {
                this.handleApiSaveSuccess(response);
                if (this.isApiResponseSuccess(response)) {
                    if (this.props.history) {
                        this.props.history.push(
                            {
                                pathname: Url.pageUrl.dynamicScanListPage
                            }
                        );
                    }
                }

            },
            this.handleApiSaveError.bind(this)
        );
    }

    /**
     * on back button click go to previous page
     */
    public onPreviousClick() {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.dynamicScanListPage
                }
            );
        }
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     *  button to go to previous page link
     */
    private renderPreviousPageLink() {
        return (
            <ButtonComponent
                type="button"
                displayText="Back"
                displayType="link"
                id="btn_previous_page"
                fontIconPrefix="fa fa-angle-double-left"
                clickHandler={this.onPreviousClick.bind(this)}
            >
            </ButtonComponent>
        );
    }

    //#endregion private methods
}