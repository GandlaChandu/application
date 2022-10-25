//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { ApiResponseModel } from '../../core';
import { MessageType, Constant, FunctionalCode } from '../../utilities';
import { ButtonComponent } from '../../shared';

import { PageBasePropModel, ComponentInfoModel } from '../models';
import { Helper } from '../helpers';

//#endregion application imports

export class ComponentBase<T extends PageBasePropModel, S = any> extends React.Component<T, S> {

    //#region model properties

    protected componentInfo: ComponentInfoModel = new ComponentInfoModel();

    protected get isEditScreen(): boolean {
        if (this.props.isEditMode ||
            (this.props.isSaveAndContinue && this.props.isEditMode)) {
            return true;
        }
        return false;
    }

    protected get hasLocationInfo(): boolean {
        if (this.props &&
            this.props.history &&
            this.props.history.location &&
            this.props.history.location.state) {
            return true;
        }
        return false;
    }

    protected get locationInfo(): any {
        if (this.hasLocationInfo) {
            return this.props.history.location.state;
        }
        return {};
    }

    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook 
     */
    componentDidMount() {
        if (this.componentInfo.code) {
            if (this.componentInfo.isScreen && this.props.dispatchSetTitle) {
                this.props.dispatchSetTitle(this.componentInfo.pageTitle);
            }

            if (!this.componentInfo.hasPermission && this.props.dispatchSetError) {
                this.props.dispatchSetError({ errorCode: 401, isGlobalError: true });
            }
        }
    }

    /**
     * component unmount life cycle hook 
     */
    componentWillUnmount() {
        if (this.componentInfo.isScreen) {
            if (this.props.dispatchSetTitle) {
                this.props.dispatchSetTitle('');
            }
            if (this.props.dispatchHideAlert) {
                this.props.dispatchHideAlert();
            }
            if (this.props.dispatchSetEditMode) {
                this.props.dispatchSetEditMode(false);
            }
        }

    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * sets component info
     * @param code
     */
    public setComponentInfo(code: FunctionalCode) {
        this.componentInfo = Helper.getScreenInfo(code, this.props.userRoles);
    }

    /**
     * handles api succes
     * @param response
     */
    public handleApiSaveSuccess(response: ApiResponseModel<any>) {
        if (this.isApiResponseSuccess(response)) {
            this.props.dispatchOpenToaster(
                {
                    open: true,
                    messageType: MessageType.Success,
                    message: Constant.message.apiSuccessMessage
                }
            );
        }
        else {
            this.props.dispatchShowAlert({
                open: true,
                messages: [response.errorMessage]
            });

        }
    }

    /**
     * handles api error 
     * @param response
     */
    public handleApiSaveError(response: ApiResponseModel<any>) {
        this.props.dispatchOpenToaster(
            {
                open: true,
                messageType: MessageType.Error,
                message: Constant.message.apiErrorMessage
            }
        );
    }

    /**
     * handles api errors for fetch/get calls
     * @param response
     */
    public handleApiFetchError(response: ApiResponseModel<any>) {
        this.props.dispatchSetError({
            isGlobalError: true,
            errorCode: response.status,
            errorMessage: response.errorMessage
        });
    }

    /**
     * determines if api response is successful
     * @param response
     */
    public isApiResponseSuccess(response: ApiResponseModel<any>): boolean {
        if (response && response.isSuccess) {
            return true;
        }
        return false;
    }

    /**
     * sets edit state default values
     * @param editCode
     */
    public setEditStateDefaults(editCode?: FunctionalCode) {
        //For Save and continue case
        if (editCode && this.componentInfo.code !== editCode) {
            this.setComponentInfo(editCode);
        }
        this.props.dispatchSetTitle(this.componentInfo.pageTitle);
        this.props.dispatchSetEditMode(true);
    }

    /**
     * on save click
     * @param isContinue
     * @param handler
     */
    public onSave(isContinue, handler?: (...args: any[]) => void) {
        //Clear previous alerts if any
        this.props.dispatchHideAlert();
        this.props.dispatchSubmitBtnState(isContinue);
        if (handler) {
            handler();
        }
    }

    /**
     * on back button click go to previous page
     */
    public onPrevButtonClick() {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: this.componentInfo.prevPageUrl
                }
            );
        }
    }

    /**
     * form submit success callback handler
     * @param response
     * @param locationInfo
     */
    public onFormSubmitSuccess(response: ApiResponseModel<any>, locationInfo?: any) {
        this.handleApiSaveSuccess(response);
        if (this.isApiResponseSuccess(response)) {
            if (this.props.isSaveAndContinue) {
                if (locationInfo) {
                    this.props.history.replace(
                        {
                            state: locationInfo
                        }
                    );
                }
                this.setEditStateDefaults();
            }
            else {
                if (this.props.history) {
                    this.props.history.push(
                        {
                            pathname: this.componentInfo.prevPageUrl
                        }
                    );
                }
            }
        }
    }

    /**
     * on reset click 
     */
    public onResetClick() {
        if ((this.props as any).reset)
            (this.props as any).reset();
        if ((this.props as any).onReset) {
            (this.props as any).onReset();
        }
        if (this.props.dispatchHideAlert) {
            this.props.dispatchHideAlert();
        }
    }

    /**
     * renders previous button
     */
    public renderPrevButton() {
        return (
            <>
                <div className="row space-row">
                    <div className="col-sm-12 text-left">
                        <div className="">
                            <ButtonComponent
                                type="button"
                                displayText={`Back to ${Helper.getPageTitleByUrl(this.componentInfo.prevPageUrl)}`}
                                id="btn_back"
                                fontIconPrefix="fa fa-long-arrow-left"
                                clickHandler={this.onPrevButtonClick.bind(this)}
                            >
                            </ButtonComponent>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    /**
     * render save button ribbon
     * @param isDisabled
     * @param id
     * @param handler
     * @param isSaveAndResetOnly
     */
    public renderSaveButtons(isDisabled?: boolean, id?: string, handler?: (...args: any[]) => void, isSaveAndResetOnly?: boolean) {
        return (
            <>
                <div className="row">
                    <div className="col-sm-12 col-md-12 text-right">
                        <div className="">
                            {this.renderSaveContinueButton(isDisabled, id, handler, isSaveAndResetOnly)}
                            {this.renderSaveExitButton(isDisabled, id, handler, isSaveAndResetOnly)}
                            {this.renderResetButton(isDisabled, id)}
                        </div>
                    </div>
                </div>

            </>
        )
    }

    /**
     * renders save and continue button
     * @param isDisabled
     * @param id
     * @param handler
     * @param isSaveAndResetOnly
     */
    public renderSaveContinueButton(isDisabled?: boolean, id?: string, handler?: (...args: any[]) => void, isSaveAndResetOnly?: boolean) {
        if (!isSaveAndResetOnly) {
            return (
                <ButtonComponent
                    type="submit"
                    displayText="Save & continue"
                    id={`${id}_save_continue`}
                    fontIconPrefix=""
                    className="ml-1 mr-sm-4 mb-2 mb-sm-0"
                    disabled={isDisabled}
                    clickHandler={this.onSave.bind(this, true, handler)}
                >
                </ButtonComponent>
            );
        }
        return (null);
    }

    /**
     * renders save and exit button
     * @param isDisabled
     * @param id
     * @param handler
     * @param isSaveAndResetOnly
     */
    public renderSaveExitButton(isDisabled?: boolean, id?: string, handler?: (...args: any[]) => void, isSaveAndResetOnly?: boolean) {
        return (
            <ButtonComponent
                type="submit"
                displayText={isSaveAndResetOnly ? 'Save' : 'Save & Exit'}
                id={`${id}_save_exit`}
                fontIconPrefix=""
                disabled={isDisabled}
                className="ml-1 mr-sm-4 mb-2 mb-sm-0"
                clickHandler={this.onSave.bind(this, false, handler)}
            >
            </ButtonComponent>
        );

    }

    /**
     * renders reset button
     * @param isDisabled
     * @param id
     * @param handler
     */
    public renderResetButton(isDisabled?: boolean, id?: string, handler?: (...args: any[]) => void) {
        return (
            <>
                <ButtonComponent
                    type="reset"
                    displayText="Reset"
                    id={`${id}_reset`}
                    fontIconPrefix=""
                    className="ml-1 mb-2 mb-sm-0"
                    clickHandler={this.onResetClick.bind(this, true, handler)}
                >
                </ButtonComponent>
            </>
        )

    }

    //#endregion events callbacks/public methods

    //#region private methods

    //#endregion private methods
}