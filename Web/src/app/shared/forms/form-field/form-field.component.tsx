//#region react imports

import React from 'react';
import { Field, BaseFieldProps, Validator } from 'redux-form';

//#endregion react imports

//#region application imports

import './form-field.scss';
import { StringHelper } from '../../../core';
import { ValidationConfigModel } from '../models';
import { ValidatorType } from '../validators';
import { FieldPropModel } from '../input-controls';

//#endregion application imports

export class FormFieldComponent<T extends FieldPropModel> extends React.Component<BaseFieldProps<T>> {

    //#region model properties

    private validators: Validator[] = [];

    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        this.setValidators();
    }

    /**
    * renders html for component 
    */
    render() {
        return (
            <>
                <Field
                    {...this.props}
                    validate={this.validators}
                />
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion event callbacks/public methods

    //#region private methods

    /**
     * required vaidation rule
     * @param model
     * @param value
     */
    private requiredRule(model: ValidationConfigModel, value: any) {
        return model.config && !StringHelper.trim(value) ? model.errorMessage : undefined;
    }

    /**
     * min length validation rule
     * @param model
     * @param value
     */
    private minLengthRule(model: ValidationConfigModel, value: any) {
        if (StringHelper.trim(value) &&
            model.config &&
            model.config > 0 &&
            value.length < model.config) {
            return model.errorMessage;
        }
    }

    /**
     * max length vaidation rule
     * @param model
     * @param value    
     */
    private maxLengthRule(model: ValidationConfigModel, value: any) {
        if (StringHelper.trim(value) &&
            model.config &&
            model.config > 0 &&
            value.length > model.config) {
            return model.errorMessage;
        }
    }

    /**
     * pattern validation rule
     * @param model
     * @param value     
     */
    private patternRule(model: ValidationConfigModel, value: any) {
        if (StringHelper.trim(value) &&
            model.config &&
            !model.config.test(value)) {
            return model.errorMessage;
        }
    }

    /**
     * sets field validators 
     */
    private setValidators() {
        this.validators = [];

        //set generic validations
        if (this.props.props &&
            this.props.props.validations &&
            this.props.props.validations.length > 0) {
            this.props.props.validations.forEach(x => {
                switch (x.validatorType) {
                    case ValidatorType.Required:
                        if (x.config !== false) {
                            this.validators.push(this.requiredRule.bind(this, x));
                        }
                        break;
                    case ValidatorType.MinLength:
                        this.validators.push(this.minLengthRule.bind(this, x));
                        break;
                    case ValidatorType.MaxLength:
                        this.validators.push(this.maxLengthRule.bind(this, x));
                        break;
                    case ValidatorType.Pattern:
                        this.validators.push(this.patternRule.bind(this, x));
                        break;
                }
            });
        }

        if (this.props.validate) {
            if (this.props.validate.length) {
                for (let i = 0; i < this.props.validate.length; i++) {
                    this.validators.push(this.props.validate[i]);
                }
            }
            else {
                this.validators.push(this.props.validate as Validator);
            }
        }
    }

    //#endregion private methods
}
