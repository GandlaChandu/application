//#region react imports

import React from 'react';
import { FieldArray, change, unregisterField, touch } from 'redux-form';

//#endregion react imports

//#region application imports

import { Constant } from '../../../utilities';
import { IAppActionModel } from '../../../core';

import { ComponentBase } from '../component.base';
import { PageRequestModel } from '../../models';
import { FormGridComponent, GridComponent, GridOwnPropModel, GridPaginationPropModel, GridRowModel, GridActionFieldType, FormGridOwnPropModel, GridActionElementModel } from '../../controls';
import { Helper } from '../../helpers';
import { ListPageBasePropModel } from './list-page-prop.model';
import { FormListActionType, FormListState } from './form-list-store';

//#endregion application imports

export abstract class ListComponentBase<PropModel extends ListPageBasePropModel<any>, DataListModel> extends ComponentBase<PropModel> {

    //#region model properties

    protected readonly gridPropModel?: GridOwnPropModel<DataListModel> | FormGridOwnPropModel<DataListModel> = this.getGridPropModel();
    protected readonly formName?: string;

    //#endregion model properties

    //#region constructor

    constructor(props, form?: string) {
        super(props);
        this.formName = form;
        this.setGridDefaults();
    }

    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook 
     */
    componentDidMount() {
        super.componentDidMount();
        this.fetchGridResult(this.getPageRequestInfo());
    }

    //#endregion life cycle hooks

    //#region abstract methods

    /**
     * sets grid props 
     */
    public abstract setGridInfo();

    /**
     * fetches grid results 
     * @param pageRequestModel
     */
    public abstract fetchGridResult(pageRequestModel: PageRequestModel);

    //#endregion abstract methods

    //#region event callbacks/public methods

    /**
     * on refresh will be invoked on page change, page size change and sort change
     * @param pageRequestModel
     */
    public onRefresh(pageModel: PageRequestModel) {
        if (pageModel.pagination) {
            this.gridPropModel.paginationInfo.page = pageModel.pagination.pageNumber;
            this.gridPropModel.paginationInfo.rowsPerPage = pageModel.pagination.pageSize;
            pageModel.filter = this.gridPropModel.filterInfo;
        }
        if (pageModel.filter) {
            this.gridPropModel.filterInfo = pageModel.filter;
            pageModel.pagination = this.getPaginationInfo();
        }
        this.fetchGridResult(pageModel);
    }

    /**
     * on form grid edit link click callback
     * @param gridRow
     */
    public onFormRowEdit(gridRow: GridRowModel<any>) {
        this.props.dispatch(change(this.formName, `${gridRow.index}.${Constant.grid.actionTypeField}`, GridActionFieldType.Edit, true));
        this.refreshGrid(gridRow);
    }

    /**
     * on form grid cancel link click callback
     * @param gridRow
     */
    public onFormRowCancel(gridRow: GridRowModel<any>) {
        this.props.dispatch(change(this.formName, `${gridRow.index}.${Constant.grid.actionTypeField}`, GridActionFieldType.None, true));
        this.refreshGrid(gridRow);
    }

    /**
     * on form grid row save event
     * @param handler
     * @param gridRow
     */
    public onFormRowSave(handler: (row: GridRowModel<any>) => void, gridRow: GridRowModel<any>) {
        this.props.dispatch(unregisterField(this.formName, `${gridRow.index}.${Constant.grid.actionTypeField}`));
        this.props.dispatch(touch(this.formName));
        this.refreshGrid(gridRow, handler);

    }

    //#endregion events callbacks/public methods

    //#region protected methods

    /**
     * refreshes grid component
     * @param gridRow
     * @param handler
     */
    protected refreshGrid(gridRow: GridRowModel<any>, handler?: (row: GridRowModel<any>) => void) {
        let listCopy = [...this.props.gridResultData.items];
        //get grid form data
        gridRow = {
            ...this.props.gridFormData.find(x => gridRow.index === x.index),
            actionType: gridRow.actionType,
            index: gridRow.index
        };
        listCopy[gridRow.index] = { ...gridRow };
        let actionModel: IAppActionModel<FormListState<any>> = {
            type: FormListActionType.RefreshGridInfo,
            payload: { formlist: listCopy }
        }
        this.props.dispatch(actionModel);
        if (handler) {
            handler(gridRow);
        }
    }

    /**
     * gets page request model 
     */
    protected getPageRequestInfo(): PageRequestModel {
        return {
            pagination: {
                pageNumber: this.gridPropModel.paginationInfo.page,
                pageSize: this.gridPropModel.paginationInfo.rowsPerPage
            }
        };
    }

    /**
     * gets page request pagination specific model 
     */
    protected getPaginationInfo() {
        return {
            pageNumber: this.gridPropModel.paginationInfo.page,
            pageSize: this.gridPropModel.paginationInfo.rowsPerPage

        };
    }

    /**
     * gets page request filter specific model 
     */
    protected getFilterInfo() {
        return { ...this.gridPropModel.filterInfo };
    }

    /**
     * sets grid edit and save action model
     * @param onSaveHandler
     */
    protected getGridEditSaveActionModel(onSaveHandler): GridActionElementModel[] {
        return [
            {
                type: GridActionFieldType.Edit,
                onClick: this.onFormRowEdit.bind(this),
                canDisplay: (row: GridRowModel<any>) => {
                    return (row.actionType !== GridActionFieldType.Edit)
                }
            },
            {
                type: GridActionFieldType.Save,
                onClick: (row) => {
                    this.onFormRowSave(onSaveHandler, row);
                },
                canDisplay: (row: GridRowModel<any>) => {
                    return (row.actionType === GridActionFieldType.Edit)
                }
            },
            {
                type: GridActionFieldType.Undo,
                onClick: this.onFormRowCancel.bind(this),
                canDisplay: (row: GridRowModel<any>) => {
                    return (row.actionType === GridActionFieldType.Edit)
                }
            }
        ];
    }

    /**
     * renders table html 
     */
    protected renderTable() {
        if (this.props.gridResultData) {
            this.gridPropModel.data = this.props.gridResultData.items.map((x, i) => Helper.toGridRowModel(x, i));
            this.gridPropModel.paginationInfo.totalRows = this.props.gridResultData.total;
        }
        return (
            <div className="grid-row" >
                <GridComponent {...this.gridPropModel}> </GridComponent>
            </div>
        );
    }

    /**
     * renders form table html 
     */
    protected renderFormTable() {
        if (this.props.gridResultData) {
            this.gridPropModel.data = this.props.gridResultData.items;
            this.gridPropModel.paginationInfo.totalRows = this.props.gridResultData.total;
        }
        return (
            <form>
                <FieldArray component={FormGridComponent} {...this.gridPropModel} name="gridResultData.items" />
            </form>
        );
    }

    //#endregion protected methods

    //#region private methods

    /**
     * gets grid prop model 
     */
    private getGridPropModel() {
        let model: GridOwnPropModel<DataListModel> = {
            headerCells: [],
            data: [],
            actionElements: [],
            paginationInfo: new GridPaginationPropModel(),
            title: ''
        }
        return model;
    }

    /**
     * sets grid props 
     */
    private setGridDefaults() {
        this.gridPropModel.onRefresh = this.onRefresh.bind(this);
        this.setGridInfo();
    }

    //#endregion private methods
}