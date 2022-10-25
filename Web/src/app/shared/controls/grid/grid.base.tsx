//#region react imports

import React from 'react';
import DataTable, { IDataTableColumn } from 'react-data-table-component';

//#endregion react imports

//#region application imports

import { Constant, Operator, ColType } from '../../../utilities';

import './grid.scss';
import { GridPropModel } from './models/grid-prop.model';
import { GridActionFieldType } from './grid-action-field-type.enum';
import { GridConstant } from './grid.constant';
import { GridRowModel } from './models/grid-row.model';
import { GridActionElementModel } from './models/grid-action-element.model';
import { GridHeaderPropModel } from './models/grid-header-prop.model';
import { FormGridHeaderPropModel } from './models/form-grid-header-prop.model';
import { FormGridPropModel } from './models/form-grid-prop.model';
import { SelectListItemModel, DropDownComponent, TextboxComponent } from '../../forms';
import { GridState } from './models/grid-state.model';
import { ButtonComponent } from '../button';
import { StringHelper } from '../../../core';
import { TooltipComponent } from '../tooltip';

//#endregion application imports

export class GridBase<T, FieldArrayProps = any> extends React.Component<(GridPropModel<T> | FormGridPropModel<T>) & FieldArrayProps> {

    //#region model properties

    public readonly state: GridState = new GridState();

    protected columns: IDataTableColumn<GridRowModel<T>>[] = [];

    private searchOptions: SelectListItemModel[];
    private operatorOptions: SelectListItemModel[];
    private booleanOperatorOptions: SelectListItemModel[];
    private numberOperatorOptions: SelectListItemModel[];

    //#endregion model properties

    //#region constructor

    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        this.setSearchByOptions();
        this.setOperatorOptions();
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
    }

    /**
    * renders html for component 
    */
    render() {
        this.setDataColumns();
        return (
            <>
                {this.renderSearch()}
                <div className="grid-table-div">
                    <DataTable
                        className="grid-data-table"
                        title={this.props.title}
                        columns={this.columns}
                        data={this.props.data}
                        noHeader
                        sortServer
                        defaultSortField={this.props.defaultSortBy}
                        defaultSortAsc={this.props.defaultSortAsc}
                        pagination={!this.props.paginationInfo.isDisabled}
                        paginationServer
                        paginationRowsPerPageOptions={this.props.paginationInfo.rowOptions}
                        paginationTotalRows={this.props.paginationInfo.totalRows}
                        paginationPerPage={this.props.paginationInfo.rowsPerPage}
                        onChangeRowsPerPage={this.onChangeRowsPerPage.bind(this)}
                        onChangePage={this.onPageChange.bind(this)}
                        onSort={this.onSort.bind(this)}
                        responsive
                    />
                </div>
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on page change event
     * @param page
     * @param totalRows
     */
    public onPageChange(page: number, totalRows: number) {
        this.props.onRefresh({
            pagination: {
                pageNumber: page,
                pageSize: this.props.paginationInfo.rowsPerPage
            }
        });
    }

    /**
     * on rows per page change
     * @param currentRowsPerPage
     * @param currentPage
     */
    public onChangeRowsPerPage(currentRowsPerPage: number, currentPage: number) {
        this.props.onRefresh({
            pagination: {
                pageNumber: currentPage,
                pageSize: currentRowsPerPage
            }
        });
    }

    /**
     * on sort event
     * @param column
     * @param sortDirection
     */
    public onSort(column: IDataTableColumn<T>, sortDirection: 'asc' | 'desc') {
        let propertyName: string = '';
        if (column.selector) {
            let selectors: string[] = column.selector.toString().split(Constant.text.dot);
            if (selectors && selectors.length > 0) {
                propertyName = selectors[selectors.length - 1];
            }
        }
        this.props.onRefresh({
            pagination: {
                pageNumber: this.props.paginationInfo.page,
                pageSize: this.props.paginationInfo.rowsPerPage
            },
            sortField: {
                propertyName: propertyName,
                isAscending: sortDirection === 'asc' ? true : false
            }
        });
    }

    /**
     * on action click event
     * @param row
     * @param clickHandler
     */
    public onActionClick(row: GridRowModel<T>, clickHandler: (rowData: any, gridRow?: GridRowModel<any>) => void, actionType: GridActionFieldType) {
        if (clickHandler) {
            clickHandler(row.rowData, row);
        }
    }

    //#endregion event callbacks/public methods

    //#region protected methods

    /**
     * gets header column model for data table
     * @param header
     */
    protected getHeaderColumn(header: GridHeaderPropModel | FormGridHeaderPropModel): IDataTableColumn<GridRowModel<T>> {
        return {
            name: header.title,
            selector: `${Constant.grid.rowDataField}.${header.dataPropertyName}`,
            format: header.format,
            omit: header.hidden,
            sortable: header.canSort,
            maxWidth: GridConstant.style.colMaxWidth,
            wrap: true,
            width: header.width
        };
    }

    /**
     * sets table column info 
     */
    protected setDataColumns() {
        this.columns = [];
        if (this.props.headerCells && this.props.headerCells.length > 0) {
            this.props.headerCells.forEach((x) => {
                this.columns.push(this.getHeaderColumn(x));
            });
            this.setActionElements();
        }
    }

    /**
     * sets action elements 
     */
    protected setActionElements() {
        if (this.props.actionElements && this.props.actionElements.length > 0) {
            this.columns.push({
                name: '',
                cell: (row) => this.renderActionIcons(row),
                wrap: true,
                button: true,
                minWidth: GridConstant.style.actionMinWidth,
                maxWidth: GridConstant.style.actionMaxWidth
            });
        }
    }

    /**
     * renders action icon (s) html
     * @param row
     */
    protected renderActionIcons(row: GridRowModel<T>) {
        return (
            (this.props as FormGridPropModel<T>).actionElements.map((x, index) => {
                if (!x.canDisplay || x.canDisplay(row)) {
                    return this.renderActionButton(row, x, index);
                }
                return (null);
            })
        );
    }

    /**
     * renders action element html control
     * @param row
     * @param action
     * @param index
     */
    protected renderActionElement(row: GridRowModel<T>, action: GridActionElementModel, index: number) {
        return this.renderActionButton(row, action, index);
    }

    /**
     * renders action element button html
     * @param row
     * @param action
     * @param index
     */
    protected renderActionButton(row: GridRowModel<T>, action: GridActionElementModel, index: number) {
        let actionInfo: { icon, tooltip } = this.getActionIcon(action);
        return actionInfo.tooltip ?
            (
                <TooltipComponent
                    message={actionInfo.tooltip}
                    target={`btn_action_icon_${action.id}_${row.index}_${index}`}
                    args={
                        {
                            displayType: 'link',
                            clickHandler: this.onActionClick.bind(this, row, action.onClick.bind(row), action.type),
                            disabled: action.isDisabled && action.isDisabled(row),
                            displayText: action.title,
                            fontIconPrefix: actionInfo.icon,
                            className: 'grid-link'
                        }
                    }
                />
            ) :
            (
                <ButtonComponent
                    displayText={action.title}
                    displayType="link"
                    fontIconPrefix={actionInfo.icon}
                    id={`btn_action_icon_${action.id}_${row.index}_${index}`}
                    type="button"
                    clickHandler={this.onActionClick.bind(this, row, action.onClick.bind(row), action.type)}
                    disabled={action.isDisabled && action.isDisabled(row)}
                    key={`${row.index}_${index}`}
                    className="grid-link"
                />
            );
    }

    /**
     * gets icon for action element
     * @param row
     */
    protected getActionIcon(action: GridActionElementModel) {
        let actionInfo = {
            icon: '',
            tooltip: null
        };
        switch (action.type) {
            case GridActionFieldType.Delete:
                actionInfo.icon = GridConstant.icon.delete;
                actionInfo.tooltip = 'Delete';
                break;
            case GridActionFieldType.View:
                actionInfo.icon = GridConstant.icon.view;
                actionInfo.tooltip = 'View';
                break;
            case GridActionFieldType.Edit:
                actionInfo.icon = GridConstant.icon.edit;
                actionInfo.tooltip = 'Edit';

                break;
            case GridActionFieldType.Add:
                actionInfo.icon = GridConstant.icon.add;
                actionInfo.tooltip = 'Add new';

                break;
            case GridActionFieldType.Remove:
                actionInfo.icon = GridConstant.icon.remove;
                actionInfo.tooltip = 'Remove';

                break;
            case GridActionFieldType.Save:
                actionInfo.icon = GridConstant.icon.save;
                actionInfo.tooltip = 'Save';

                break;
            case GridActionFieldType.Undo:
                actionInfo.icon = GridConstant.icon.undo;
                actionInfo.tooltip = 'Undo';

                break;
            case GridActionFieldType.Redo:
                actionInfo.icon = GridConstant.icon.redo;
                actionInfo.tooltip = 'ReIntialize';
                break;
        }
        //set tooltip only if noTooltip is false
        //if user specifies tooltip then priority is for user message
        actionInfo.tooltip = !action.noTooltip ? action.tooltip ? action.tooltip : actionInfo.tooltip : null;
        return actionInfo;
    }

    /**
     * on search by dropdown value change
     * @param value
     */
    protected onSearchByChangee(value) {
        let newState: GridState = {
            showOperator: (value) ? true : false,
            showFromValue: false,
            filterInfo: {
                name: value
            },
            colType: this.props.headerCells.find(x => x.dataPropertyName === value)?.type,
            enableSearch: false
        };
        this.setState(newState);
    }

    /**
     * on operator dropdown value change
     * @param value
     */
    protected onOperatorChangee(value) {
        let newState: GridState = {
            ...this.state,
            filterInfo: {
                ...this.state.filterInfo,
                operator: value
            },
            showFromValue: (value) ? true : false,
            enableSearch: false
        };
        this.setState(newState);
    }

    /**
     * on from value change 
     */
    protected onFromValueChange(value) {
        let newState: GridState = {
            ...this.state,
            filterInfo: {
                ...this.state.filterInfo,
                fromValue: value.target.value
            },
            enableSearch: value ? true : false
        };
        this.setState(newState);
    }

    /**
     * on search click 
     */
    protected onSearchClick() {
        let filterInfo = { ...this.state.filterInfo };
        if (this.state.colType === ColType.Boolean) {
            if (filterInfo.fromValue) {
                if (StringHelper.areEqual(filterInfo.fromValue, Constant.text.yesText)) {
                    filterInfo.fromValue = true;
                }
                else if (StringHelper.areEqual(filterInfo.fromValue, Constant.text.noText)) {
                    filterInfo.fromValue = false;
                }
            }
        }
        this.props.onRefresh({
            filter: [filterInfo],
            pagination: null
        });
    }

    /**
     * on search reset click 
     */
    protected onSearchResetClick() {
        this.setState(new GridState());
        this.props.onRefresh({
            filter: [],
            pagination: null
        });
    }

    //#endregion protected methods

    //#region private methods

    /**
     * gets options list for search by  
     */
    private setSearchByOptions() {
        this.searchOptions = [];
        if (this.props.headerCells && this.props.headerCells.length > 0) {
            this.props.headerCells.forEach(x => {
                if (x.canFilter) {
                    this.searchOptions.push({
                        label: x.title,
                        value: x.dataPropertyName
                    });
                }
            });
        }
    }

    /**
     * gets options list for operators 
     */
    private setOperatorOptions() {
        this.operatorOptions = [
            { label: Operator[Operator.Contains], value: Operator.Contains },
            { label: Operator[Operator.Equals], value: Operator.Equals },
            { label: Operator[Operator.NotEqual], value: Operator.NotEqual }
        ];
        this.booleanOperatorOptions = [
            { label: Operator[Operator.Equals], value: Operator.Equals },
            { label: Operator[Operator.NotEqual], value: Operator.NotEqual }
        ];
        this.numberOperatorOptions = [
            { label: Operator[Operator.NotEqual], value: Operator.NotEqual },
            { label: Operator[Operator.GreaterThan], value: Operator.GreaterThan },
            { label: Operator[Operator.GreaterThanEqual], value: Operator.GreaterThanEqual },
            { label: Operator[Operator.LessThan], value: Operator.LessThan },
            { label: Operator[Operator.LessThanEqual], value: Operator.LessThanEqual },
            { label: Operator[Operator.NotEqual], value: Operator.NotEqual }
        ];

    }

    /**
     * renders search controls 
     */
    private renderSearch() {
        if (this.searchOptions && this.searchOptions.length > 0) {
            return (
                <>
                    <div className="row space-row mb-4">
                        <div className="col-sm-12 col-md-3 col-lg-3">
                            {this.renderSearchByDdl()}
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3">
                            {this.renderOperatorDdl()}
                        </div>
                        <div className="col-sm-12 col-md-2 col-lg-3">
                            {this.renderFromValue()}
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3 pt-4 mt-1 text-right">


                            <ButtonComponent
                                type="button"
                                displayType="button"
                                displayText="Search"
                                id="btn_grid_search"
                                className="btn-primary mr-sm-4"
                                clickHandler={this.onSearchClick.bind(this)}
                                disabled={!this.state.enableSearch}
                                fontIconPrefix="">
                            </ButtonComponent>

                            <ButtonComponent
                                type="reset"
                                displayText="Reset"
                                displayType="button"
                                id="btn_grid_reset"
                                fontIconPrefix=""
                                className="btn-primary"
                                clickHandler={this.onSearchResetClick.bind(this)}
                            >
                            </ButtonComponent>
                        </div>

                    </div>
                </>
            );
        }
        return (null);
    }

    /**
     * renders search by control 
     */
    private renderSearchByDdl() {
        if (this.searchOptions && this.searchOptions.length > 0) {
            return (
                <DropDownComponent
                    options={this.searchOptions}
                    label="Search By"
                    input={{
                        name: 'search_by',
                        value: this.state.filterInfo.name,
                        onChange: this.onSearchByChangee.bind(this)
                    }}
                    meta={{}}
                />
            );
        }
        return (null);
    }

    /**
    * renders operator control 
    */
    private renderOperatorDdl() {
        if (this.state.showOperator) {
            let options = [];
            switch (this.state.colType) {
                case ColType.Boolean:
                    options = this.booleanOperatorOptions;
                    break;
                case ColType.Number:
                    options = this.numberOperatorOptions;
                    break;
                default:
                    options = this.operatorOptions;
                    break;
            }
            return (
                <DropDownComponent
                    options={options}
                    label="Operator"
                    input={{
                        name: 'operator',
                        value: this.state.filterInfo.operator,
                        onChange: this.onOperatorChangee.bind(this)
                    }}
                    meta={{}}
                />
            );
        }
        return (null);
    }

    /**
    * renders from value control 
    */
    private renderFromValue() {
        if (this.state.showFromValue) {
            return (
                <TextboxComponent
                    label="Value"
                    input={{
                        name: 'fromValue',
                        value: this.state.filterInfo.fromValue,
                        onChange: this.onFromValueChange.bind(this)
                    }}
                    meta={{}}
                />
            );
        }
        return (null);
    }

    //#endregion private methods
}
