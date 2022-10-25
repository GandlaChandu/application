//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { StringHelper } from '../../../core';

import './button.scss';
import { ButtonConstant } from './button.constant';
import { ButtonFieldModel } from './models/button-field.model';

//#endregion application imports

export class ButtonComponent extends React.Component<ButtonFieldModel> {

    //#region model properties

    private btnType: any;
    private color: any;
    private size: any;
    private displayType: any;

    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    /**
    * renders html for component 
    */
    render() {
        this.setDefaults();

        return (
            <>
                <button
                    id={this.props.id}
                    type={this.btnType}
                    disabled={this.props.disabled}
                    className={`${this.displayType} ${this.color} ${this.props.className || ''}`}
                    onMouseOver={this.props.mouseEnterHandler}
                    onMouseOut={this.props.mouseLeaveHandler}
                    onClick={this.props.clickHandler}>
                    {this.renderIcon(this.props.fontIconPrefix)}
                    {StringHelper.toString(this.props.displayText)}
                    {this.renderIcon(this.props.fontIconSuffix, false)}
                </button>
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion event callbacks/public methods

    //#region private methods

    /**
     * sets button defaults 
     */
    private setDefaults() {
        this.btnType = this.props.type ? this.props.type : ButtonConstant.btntype;
        this.size = this.props.size ? this.props.size : ButtonConstant.mdBtn;
        this.setDisplayType();
        this.setColor();
    }

    /**
     * gets button color 
     */
    private setColor() {
        this.color = '';
        if (this.props.displayType !== ButtonConstant.linkType &&
            this.props.displayType !== ButtonConstant.helpType) {
            switch (this.btnType) {
                case ButtonConstant.smtType:
                    this.color = ButtonConstant.smtColor;
                    break;
                case ButtonConstant.resetType:
                    this.color = ButtonConstant.resetColor;
                    break;
                case ButtonConstant.btntype:
                    this.color = ButtonConstant.btnColor;
                    break;
            }
        }
    }

    /**
     * sets button display type 
     */
    private setDisplayType() {
        switch (this.props.displayType) {
            case ButtonConstant.linkType:
                this.displayType = ButtonConstant.linkBtn;
                break;
            case ButtonConstant.ghostType:
                this.displayType = ButtonConstant.ghostBtn;
                break;
            case ButtonConstant.defaultDisplayType:
                this.displayType = ButtonConstant.defaultBtn;
                break;
            case ButtonConstant.helpType:
                this.displayType = ButtonConstant.helpType;
                break;
            default:
                this.displayType = ButtonConstant.defaultBtn;
                break;
        }
    }

    /**
     * renders icon html 
     * @param icon
     * @param isLeft
     */
    private renderIcon(icon: string, isLeft: boolean = true) {
        if (icon) {
            return (
                <span className={isLeft ? 'font-icon-left' : 'font-icon-right'}><i className={icon}></i></span>
            );
        }
        return (null);
    }

    //#endregion private methods
}