//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { Url, FunctionalCode } from '../../../utilities';
import { GridActionFieldType, ButtonComponent, ListComponentBase, Helper, PageRequestModel, GridRowModel } from '../../../shared';

import { UserManagerPropModel } from './models/user-manager-prop.model';
import './user-manager.scss';
import { UserManagerConstant } from './user-manager.constant';
import { UserModel } from '../models';

//#endregion application imports

export class UserManagerComponent extends ListComponentBase<UserManagerPropModel, UserModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.UserViewList);
    }

    //#endregion constructor

    //#region life cycle hooks

    /**
     * renders html for component 
     */
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12 text-right">
                        {this.renderAddUserLink()}
                    </div>
                </div>
                {this.renderTable()}
            </div>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * sets grid props 
     */
    public setGridInfo() {
        this.gridPropModel.headerCells = [
            UserManagerConstant.headers.firstName,
            UserManagerConstant.headers.lastName,
            UserManagerConstant.headers.email,
            {
                ...UserManagerConstant.headers.isActive,
                format: (row: GridRowModel<UserModel>) => Helper.toString(row.rowData.isActive)
            }
        ];
        this.gridPropModel.actionElements = [
            {
                type: GridActionFieldType.Edit,
                onClick: this.onEditLinkClick.bind(this)
            }
        ];
    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult(pageRequest: PageRequestModel) {
        this.props.dispatchFetchUsers(pageRequest, this.handleApiFetchError.bind(this));
    }

    /**
     * on edit link click callback
     * @param rowData
     */
    public onEditLinkClick(rowData: UserModel) {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.addEditUserPage,
                    state: { user: rowData, isEdit: true }
                }
            );
        }
    }

    /**
     * on add user link click
     */
    public onAddUserClick() {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.addEditUserPage,
                    state: { isEdit: false }
                }
            );
        }
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     *  renders html for add user link
     */
    private renderAddUserLink() {
        return (
            <ButtonComponent
                type="button"
                displayText="Add User"
                displayType="link"
                id="btn_add_edit_add_user"
                fontIconPrefix="fa fa-plus"
                className="btn-primary"
                clickHandler={this.onAddUserClick.bind(this)}
            >
            </ButtonComponent>
        );
    }

    //#endregion private methods
}