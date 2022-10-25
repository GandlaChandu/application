//#region react imports

import React from 'react';

//#endregion react imports
//#region application imports

import { DropDownComponent, FormFieldComponent, DropDownPropModel, ButtonComponent } from '../../../../shared';

import './project-filter.scss';
import { ProjectFilterPropModel } from './models';
import { ProjectFilterConstant } from './project-filter.constant';

//#endregion application imports

export class ProjectFilterFormComponent extends React.Component<ProjectFilterPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook 
     */
    componentDidMount() {
        this.props.dispatchFetchClients();
    }

    /**
     * renders html for component 
     */
    render() {
        return (

            <form onSubmit={this.props.handleSubmit} onReset={this.onReset.bind(this)}>
                <div className="row space-row">
                    <div className="col-sm-12 col-md-3">
                        {this.renderClientControl()}
                    </div>
                    <div className="col-sm-12 col-md-3">
                        {this.renderDivisionControl()}
                    </div>
                    <div className="col-sm-12 col-md-6 align-button">
                        <ButtonComponent
                            type="reset"
                            displayText="Clear"
                            className="pull-right"
                            id="btn_project_filter_reset"
                            fontIconPrefix="">
                        </ButtonComponent>
                        <ButtonComponent
                            type="submit"
                            displayText="Search"
                            className="pull-right mr-4"
                            id="btn_project_filter_search"
                            fontIconPrefix="">
                        </ButtonComponent>
                       
                    </div>
                </div>
            </form>

        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on client click call back, loads divisions based on selected client.
     * @param value
     */
    public onClientChange(value) {
        if (this.props.formData.clientId !== value) {
            this.props.formData.divisionId = null;
            this.props.dispatchResetControl(this.props.formData, this.props.form, ProjectFilterConstant.formField.division);
            this.props.dispatchFetchDivisions(value);
            this.props.dispatchShowDivision((value > 0));
        }

    }

    /**
     * on reset click 
     */
    public onReset() {
        this.props.reset();
        this.props.dispatchShowDivision(false);
        this.props.onReset();
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders division control html 
     */
    private renderClientControl() {

        return (
            <div className="form-group">

                <FormFieldComponent<DropDownPropModel>
                    name="clientId"
                    component={DropDownComponent}
                    props={
                        {
                            id: 'ddl_scan_cascade_form_client',
                            label: 'Client',
                            options: this.props.clients
                        }
                    }
                    onChange={this.onClientChange.bind(this)}
                />

            </div>
        );
    }

    /**
     * renders division control html 
     */
    private renderDivisionControl() {
        if (this.props.showDivision) {
            return (
                <div className="form-group">
                    <FormFieldComponent<DropDownPropModel>
                        name="divisionId"
                        component={DropDownComponent}
                        props={
                            {
                                id: 'ddl_scan_cascade_form_division',
                                label: 'Division',
                                options: this.props.divisions
                            }
                        }
                    />

                </div>
            );
        }
        return (null);
    }

    //#endregion private methods
}