//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import {
    FormFieldComponent,
    ButtonComponent,
    DropDownComponent,
    DropDownPropModel,
    ComponentBase
} from '../../../../shared';

import { ImportRuleFormPropModel } from './models';
import './import-rule-form.scss';

//#endregion application imports

export class ImportRuleFormComponent extends ComponentBase<ImportRuleFormPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * renders html for component 
     */
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label>Language: <b>{this.props.selectedLanguage}</b></label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <div className="form-group">
                            <FormFieldComponent<DropDownPropModel>
                                name="severities"
                                component={DropDownComponent}
                                props={
                                    {
                                        id: 'txt_project_form_severity',
                                        label: 'Severity',
                                        options: this.props.severityTypes
                                    }
                                }
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <div className="form-group">
                            <FormFieldComponent<DropDownPropModel>
                                name="sonarSourceSecurities"
                                component={DropDownComponent}
                                props={
                                    {
                                        id: 'txt_project_form_vulnerebility',
                                        label: 'Vulnerebility',
                                        options: this.props.vulnerabilityTypes
                                    }
                                }
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <div className="space-row"></div>
                        <div className="space-row"></div>
                        <div className="space-row"></div>
                        <ButtonComponent
                            className="float-right"
                            type="submit"
                            displayText="Search"
                            id="btn_save_division"
                            fontIconPrefix="">
                        </ButtonComponent>
                    </div>
                </div>
            </form>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion private methods
}
