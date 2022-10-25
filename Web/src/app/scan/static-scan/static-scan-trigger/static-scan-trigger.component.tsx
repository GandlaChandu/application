//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { Constant, Url, ScanTypeEnum, FunctionalCode } from '../../../utilities';
import { ComponentBase, ScanCascadeForm, ScanCascadeFormModel } from '../../../shared';

import './static-scan-trigger.scss';
import { StaticScanTriggerPropModel } from './models/static-scan-trigger-prop.model';

//#endregion application imports

export class StaticScanTriggerComponent extends ComponentBase<StaticScanTriggerPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.StaticNewScan);
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
                    namespace={Constant.reducerKey.staticScanTriggerReducer}
                    scanType={ScanTypeEnum.StaticScan}
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
                                pathname: Url.pageUrl.staticScanListPage
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
                    pathname: Url.pageUrl.staticScanListPage
                }
            );
        }
    }

    //#endregion events callbacks/public methods

    //#region private methods
    //#endregion private methods
}