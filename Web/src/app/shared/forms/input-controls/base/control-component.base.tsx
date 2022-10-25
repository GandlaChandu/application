//#region react imports

import React from 'react';
import { WrappedFieldProps } from 'redux-form';

//#endregion react imports

//#region application imports

import { FieldPropModel } from './field-prop.model';
import { ValidatorType } from '../../validators';
import { TooltipComponent } from '../../../controls';

//#endregion application imports

export class ControlComponentBase<T extends FieldPropModel> extends React.Component<T & (WrappedFieldProps | any)> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks
    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion events callbacks/public methods

    //#region protected methods

    /**
     * renders label html 
     */
    protected renderLabel(): JSX.Element {
        if (this.props.label) {
            return (
                <label className="field-label">
                    {this.props.label}
                    {this.renderRequiredMark()}
                    {this.renderHelpIcon()}
                </label>
            );
        }
        return (null);
    }

    /**
     * renders validation error html 
     */
    protected renderValidationError(): JSX.Element {
        let message = this.props.meta.touched ? this.props.meta.error : '';
        return (
            <div className="text-danger">{message}</div>
        );
    }

	/**
	 * renders required mark html 
	 */
    protected renderRequiredMark() {
        if (this.props.required ||
            (this.props.validations && this.props.validations.findIndex(x => x.validatorType === ValidatorType.Required && x.config !== false) > -1)) {
            return (<span className="text-danger">*</span>);
        }
        return (null);
    }

	/**
	 * renders help icon html 
	 */
    protected renderHelpIcon() {
        if ((this.props as T).helpText) {
            return (
                <>
                    <TooltipComponent
                        message={this.props.helpText}
                        target={this.props.id}
                        args={
                            {
                                displayType: 'help',
                                fontIconPrefix:'fa fa-info-circle'
                            }
                        }
                    />
                </>
            );
        }
        return (null);
    }

    //#endregion protected methods

    //#region private methods

    //#endregion private methods
}