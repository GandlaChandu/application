//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import {
    PageRequestModel,
    PopupComponent,
    ButtonComponent,
    ListComponentBase,
    DivisionModel,
    Helper,
    GridActionFieldType,
    CardComponent,

    GridRowModel
} from '../../../../shared';
import { Constant } from '../../../../utilities';

import { DivisionSectionPropModel } from './models';
import { DivisionForm } from './division-form';
import { DivisionSectionConstant } from './division-section.constant';

//#endregion application imports

export class DivisionSectionComponent extends ListComponentBase<DivisionSectionPropModel, DivisionModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * renders html for component 
     */
    render() {
        if (this.props.showDivisionTab) {
            return (
                <CardComponent
                    content={this.renderDivisionPanelContent()}
                />
            );
        }
        return (null);
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * sets grid props 
     */
    public setGridInfo() {
        this.gridPropModel.headerCells = [
            DivisionSectionConstant.headers.divisionName,
            {
                ...DivisionSectionConstant.headers.isActive,
                format: (row: GridRowModel<DivisionModel>) => Helper.toString(row.rowData.isActive)
            }
        ];
        this.gridPropModel.actionElements = [
            {
                type: GridActionFieldType.Edit,
                onClick: this.onDivisionEditClick.bind(this)
            }
        ];
    }

    /**
     * gets data for grid 
     * @param pageRequest
     */
    public fetchGridResult(pageRequest: PageRequestModel) {
        this.props.dispatchFetchDivisions(this.props.client?.id, pageRequest, this.handleApiFetchError.bind(this));
    }

    /**
     * on add division link click
     */
    public onAddDivisionClick() {
        this.props.dispacthDivisionPopupState(true, new DivisionModel());
    }

    /**
     * on edit link click callback
     * @param rowData
     */
    public onDivisionEditClick(rowData: DivisionModel) {
        this.props.dispacthDivisionPopupState(true, rowData);
    }

    /**
     * on division save click
     * @param divisionInfo
     */
    public onDivisionSave(divisionInfo: DivisionModel) {
        divisionInfo.clientId = this.props.client.id;

        this.props.dispatchSaveDivision(divisionInfo,
            (response) => {
                this.handleApiSaveSuccess(response);
                this.props.dispacthDivisionPopupState(false);
                if (this.isApiResponseSuccess(response)) {
                    this.fetchGridResult(this.getPageRequestInfo());
                }
            },
            this.handleApiSaveError.bind(this)
        );
    }

    /**
     * on division popup close
     * @param divisionInfo
     */
    public onDivisionPopupClose() {
        this.props.dispacthDivisionPopupState(false);
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders division panel content 
     */
    private renderDivisionPanelContent() {
        return (
            <>
                {this.renderAddDivisionLink()}
                {this.renderTable()}
                {this.renderDivisionPopup()}

            </>
        );
    }

    /**
     *  renders html for add/hide division grid
     */
    private renderAddDivisionLink() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <ButtonComponent
                        className="float-right mr-0 pr-0"
                        type="button"
                        displayText="Add Division"
                        displayType="link"
                        id="btn_add_edit_add_division"
                        fontIconPrefix="fa fa-plus"
                        clickHandler={this.onAddDivisionClick.bind(this)}
                    >
                    </ButtonComponent>
                </div>
            </div>
        );
    }

    /**
     * renders division popup 
     */
    private renderDivisionPopup() {
        let title: string = Constant.pageTitle.addDivisionPage;
        if (this.props.selectedDivision) {
            title = Constant.pageTitle.editDivisionPage;
        }
        return (
            <PopupComponent open={this.props.showDivisionPopup}
                closeHandler={this.onDivisionPopupClose.bind(this)}
                popupHeader={title}
                popupContent={this.getPopupContent()}
            >
            </PopupComponent >
        );
    }

    /**
     * gets popup content
     */
    private getPopupContent() {
        return (
            <DivisionForm onSubmit={this.onDivisionSave.bind(this)} />
        );
    }

    //#endregion private methods
}
