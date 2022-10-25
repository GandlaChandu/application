//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { Url, FunctionalCode } from '../../../utilities';
import { GridActionFieldType, ButtonComponent, ClientModel, ListComponentBase, Helper, PageRequestModel, GridRowModel } from '../../../shared';

import { ClientManagerPropModel } from './models/client-manager-prop.model';
import './client-manager.scss';
import { ClientManagerConstant } from './client-manager.constant';

//#endregion application imports

export class ClientManagerComponent extends ListComponentBase<ClientManagerPropModel, ClientModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(FunctionalCode.ClientViewList);

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
                        {this.renderAddClientLink()}
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
            ClientManagerConstant.headers.clientName,
            {
                ...ClientManagerConstant.headers.isActive,
                format: (row: GridRowModel<ClientModel>) => Helper.toString(row.rowData.isActive)
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
        this.props.dispatchFetchClients(pageRequest, this.handleApiFetchError.bind(this));
    }

    /**
     * on edit link click callback
     * @param rowData
     */
    public onEditLinkClick(rowData) {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.addEditCientPage,
                    state: { client: rowData, isEdit: true }
                }
            );
        }
    }

    /**
     * on add client link click
     */
    public onAddClientClick() {
        if (this.props.history) {
            this.props.history.push(
                {
                    pathname: Url.pageUrl.addEditCientPage,
                    state: { client: new ClientModel(), isEdit: false }
                }
            );
        }
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     *  renders html for add client link
     */
    private renderAddClientLink() {
        return (
            <ButtonComponent
                type="button"
                displayText="Add Client"
                displayType="link"
                id="btn_add_edit_add_client"
                fontIconPrefix="fa fa-plus"
                className="btn-primary"
                clickHandler={this.onAddClientClick.bind(this)}
            >
            </ButtonComponent>
        );
    }

    //#endregion private methods
}