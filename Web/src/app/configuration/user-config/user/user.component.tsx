//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { FunctionalCode } from '../../../utilities';
import {
    CardComponent,
    ComponentBase
} from '../../../shared';

import { UserPropModel } from './models';
import './user.scss';
import { UserForm } from './user-form';
import { UserModel } from '../models';

//#endregion application imports

export class UserComponent extends ComponentBase<UserPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        if (this.hasLocationInfo &&
            this.locationInfo.isEdit) {
            this.setComponentInfo(FunctionalCode.EditUser);
        }
        else {
            this.setComponentInfo(FunctionalCode.AddUser);
        }
    }

    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        super.componentDidMount();
        if (this.componentInfo.code === FunctionalCode.EditUser) {
            this.setEditStateDefaults();
        }
        else {
            this.props.dispatchSetEditMode(false);
            this.props.dispatchSetUser(new UserModel());
        }
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                {this.renderPrevButton()}
                {this.renderUserForm()}
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * sets edit state default values
     */
    public setEditStateDefaults() {
        this.props.dispatchSetUser(this.props.history.location.state.user);
        super.setEditStateDefaults(FunctionalCode.EditUser);
    }

    /**
     * on save btn click callback
     * @param formData
     */
    public onFormSubmit(formData: UserModel) {

        let user: UserModel = { ...formData, id: this.props.user.id };
        this.props.dispatchSaveUser(
            user,
            (response) => {
                user.id = response.data;
                this.onFormSubmitSuccess(response, { user: user, isEdit: true });
                this.props.dispatchSetUser(user);
            },
            this.handleApiSaveError.bind(this)
        );
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders client form html 
     */
    private renderUserForm() {
        if (this.props.user) {
            return (
                <div className="row">
                    <div className="col-12">
                        <CardComponent content=
                            {
                                <UserForm onSubmit={this.onFormSubmit.bind(this)} />
                            }
                        >
                        </CardComponent>
                    </div>
                </div>
            );
        }
        return (null);
    }

    //#endregion private methods
}