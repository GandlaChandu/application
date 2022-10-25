//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { ComponentBase } from '../../shared';
import {
    FormFieldComponent,
    ValidatorType,
    ButtonComponent,
    TextboxComponent,
    TextareaComponent,
    MultiSelectDropDownPropModel,
    MultiSelectDropDownComponent
} from '../../shared';

import { TicketingIssuePropModel, TicketingIssueModel } from './models';
import { TicketingIssueConstant } from './ticketing-issue.constant';

//#endregion application imports

export class TicketingIssueComponent extends ComponentBase<TicketingIssuePropModel, TicketingIssueModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook
     */
    componentDidMount() {
        super.componentDidMount();
        this.props.dispatchGetIssuesInfo(
            this.props.ticketSystemInfo.ticketSystemStatus?.id,
            this.props.ticketSystemInfo.projectId,
            this.props.ticketSystemInfo.type,
            this.handleApiFetchError.bind(this));
    }

    /** 
     * renders html for component 
     */
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label>Ticket System Type: <b>{this.props.ticketingType}</b></label>
                        </div>
                    </div>
                </div>
                <div className="row space-row">
                    <div className="col-sm-12 col-md-12">
                        <div className="form-group">
                            <div className="form-group">
                                <FormFieldComponent
                                    name="title"
                                    component={TextboxComponent}
                                    props={
                                        {
                                            id: 'txt_ticketing_issue_title',
                                            label: 'Title',
                                            validations: [
                                                {
                                                    validatorType: ValidatorType.Required,
                                                    config: true,
                                                    errorMessage: TicketingIssueConstant.errorMessage.titleRequired
                                                },
                                            ]
                                        }
                                    }
                                >
                                </FormFieldComponent>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row space-row">
                    <div className="col-sm-12 col-md-12">
                        <div className="form-group">
                            <div className="form-group">
                                <FormFieldComponent
                                    name="body"
                                    component={TextareaComponent}
                                    props={
                                        {
                                            id: 'txt_ticketing_issue_body',
                                            label: 'Body',
                                            validations: [
                                                {
                                                    validatorType: ValidatorType.Required,
                                                    config: true,
                                                    errorMessage: TicketingIssueConstant.errorMessage.bodyRequired
                                                },
                                            ]
                                        }
                                    }
                                >
                                </FormFieldComponent>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row space-row">
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <FormFieldComponent<MultiSelectDropDownPropModel>
                                name="labels"
                                component={MultiSelectDropDownComponent}
                                props={
                                    {
                                        id: 'drpdwn_ticketing_issue_labels',
                                        label: 'Labels',
                                        options: this.props.labels
                                    }
                                }
                            >
                            </FormFieldComponent>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <FormFieldComponent<MultiSelectDropDownPropModel>
                                name="milestone"
                                component={MultiSelectDropDownComponent}
                                props={
                                    {
                                        id: 'drpdwn_ticketing_issue_milestones',
                                        label: 'Milestones',
                                        options: this.props.milestones
                                    }
                                }
                            >
                            </FormFieldComponent>
                        </div>
                    </div>
                </div>
                <div className="row space-row">
                    <div className="col-sm-12 col-md-12">
                        <div className="form-group">
                            <FormFieldComponent<MultiSelectDropDownPropModel>
                                name="assignees"
                                component={MultiSelectDropDownComponent}
                                props={
                                    {
                                        id: 'drpdwn_ticketing_issue_assignees',
                                        label: 'Assignees',
                                        options: this.props.assignees
                                    }
                                }
                            >
                            </FormFieldComponent>
                        </div>
                    </div>

                </div>
                <div className="row space-row">
                    <div className="col-sm-12 col-md-4"></div>
                    <div className="col-sm-12 col-md-4">
                        <ButtonComponent
                            type="submit"
                            disabled={this.props.pristine || this.props.submitting}
                            displayText="Save"
                            id="btn_save_issue"
                            fontIconPrefix="fa fa-save">
                        </ButtonComponent>
                    </div>
                </div>
            </form>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion public methods

}