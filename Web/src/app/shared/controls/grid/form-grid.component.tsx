//#region react imports

import React from 'react';
import { WrappedFieldArrayProps, Field } from 'redux-form';
import { IDataTableColumn } from 'react-data-table-component';

//#endregion react imports

//#region application imports

import { Constant } from '../../../utilities';

import './grid.scss';
import { GridActionFieldType } from './grid-action-field-type.enum';
import { GridRowModel } from './models/grid-row.model';
import { GridBase } from './grid.base';
import { GridActionElementModel } from './models/grid-action-element.model';
import { FormGridPropModel } from './models/form-grid-prop.model';
import { GridHeaderPropModel } from './models/grid-header-prop.model';
import { FormGridHeaderPropModel } from './models/form-grid-header-prop.model';
import { FormFieldComponent, DropDownPropModel, DropDownComponent, SwitchComponent } from '../../forms';
import { FieldType } from './field-type.enum';
import { FormGridActionElementModel } from './models/form-grid-action-element.model';
import { GridActionType } from './grid-action-type.enum';

//#endregion application imports

export class FormGridComponent<T> extends GridBase<FormGridPropModel<T>, WrappedFieldArrayProps<any> & T> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks
    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on action click event
     * @param row
     * @param clickHandler
     */
    public onActionClick(row: GridRowModel<T>, clickHandler: (rowData: any, gridRow?: GridRowModel<any>) => void, actionType: GridActionFieldType) {
        //Creating copy to avoid mutating on state/props objects directly
        let rowCopy = {
            ...row,
            actionType: actionType
        };
        if (clickHandler) {
            clickHandler(rowCopy);
        }
    }

    //#endregion event callbacks/public methods

    //#region protected methods

    /**
     * gets header column model for data table
     * @param header
     */
    protected getHeaderColumn(header: GridHeaderPropModel | FormGridHeaderPropModel): IDataTableColumn<GridRowModel<T>> {
        let headerModel: IDataTableColumn<GridRowModel<T>> = super.getHeaderColumn(header);
        headerModel.format = (row: GridRowModel<T>) => {
            let formHeader: FormGridHeaderPropModel = (header as FormGridHeaderPropModel);
            if (!formHeader.getFieldPropsCallBack) {
                formHeader.getFieldPropsCallBack = (row) => { };
            }
            if (formHeader.isEditable &&
                formHeader.isEditable(row) &&
                ((this.props as FormGridPropModel<T>).isEditableDefault || row.actionType === GridActionFieldType.Edit)) {
                return this.renderField(row, formHeader);
            }
            return this.renderPlainField(row, formHeader.dataPropertyName);
        }
        return headerModel;
    }

    /**
     * renders field for edit mode
     * @param row
     * @param header
     */
    protected renderField(row: GridRowModel<any>, header: FormGridHeaderPropModel) {
        switch (header.editFieldType) {
            case FieldType.Dropdown:
                return this.renderDropdown(row, header.editModeDataPropertyName, header.getFieldPropsCallBack);
            case FieldType.Switch:
                return this.renderSwitch(row, header.editModeDataPropertyName, header.getFieldPropsCallBack);
            default:
                return this.renderPlainField(row, header.editModeDataPropertyName);
        }
    }

    /**
     * renders action element html control
     * @param row
     * @param action
     * @param index
     */
    protected renderActionElement(row: GridRowModel<T>, action: FormGridActionElementModel, index: number) {
        if (!action.getFieldPropsCallBack) {
            action.getFieldPropsCallBack = (row) => { };
        }
        switch (action.actionType) {
            case GridActionType.Switch:
                return this.renderSwitch(row, action.dataPropertyName, action.getFieldPropsCallBack);
            case GridActionType.Button:
                return this.renderActionButton(row, action, index);
            default:
                return this.renderActionButton(row, action, index);
        }
    }

    /**
     * renders action element button html
     * @param row
     * @param action
     * @param index
     */
    protected renderActionButton(row: GridRowModel<T>, action: GridActionElementModel, index: number) {
        return (
            <>
                {super.renderActionButton(row, action, index)}
                {this.renderActionTypeField(row, index)}
            </>
        );
    }

    /**
     * renders action type field
     * @param row
     * @param index
     */
    protected renderActionTypeField(row: GridRowModel<T>, index: number) {
        let actionLength = this.props.actionElements.filter(x => x.canDisplay(row)).length;
        if (actionLength === 1 || index === 0) {
            return (
                <Field
                    key={`${Constant.grid.actionTypeField}_${index}`}
                    component="input"
                    name={`${row.index}.${Constant.grid.actionTypeField}`}
                    type="hidden"
                />
            );
        }
    }

    /**
     * renders plain field control
     * @param row
     * @param editPropertyName
     */
    protected renderPlainField(row: GridRowModel<any>, editPropertyName: string) {
        return (
            <div>
                {row.rowData[editPropertyName]}
            </div>
        );
    }

    /**
     * renders dropdown control
     * @param row
     * @param editPropertyName
     * @param getFieldPropsCallBack
     */
    protected renderDropdown(row: GridRowModel<any>, editPropertyName: string, getFieldPropsCallBack: (row: GridRowModel<T>) => any) {
        return (
            <FormFieldComponent<DropDownPropModel>
                key={`${row.index}.${Constant.grid.rowDataField}.${editPropertyName}`}
                name={`items.${row.index}.${Constant.grid.rowDataField}.${editPropertyName}`}
                component={DropDownComponent}
                props={
                    {
                        id: `ddl_${row.index}.${Constant.grid.rowDataField}.${editPropertyName}`,
                        ...getFieldPropsCallBack(row)
                    }
                }
                {...getFieldPropsCallBack(row)}
            >
            </FormFieldComponent>
        );
    }


    /**
     * renders switch control
     * @param row
     * @param editPropertyName
     * @param getFieldPropsCallBack
     * @param elementIndex
     */
    protected renderSwitch(row: GridRowModel<any>, editPropertyName: string, getFieldPropsCallBack: (row: GridRowModel<T>) => any, elementIndex?: number) {
        elementIndex = elementIndex || 0;
        return (
            <FormFieldComponent
                key={`${row.index}.${Constant.grid.rowDataField}.${editPropertyName}_${elementIndex}`}
                name={`items.${row.index}.${Constant.grid.rowDataField}.${editPropertyName}`}
                component={SwitchComponent}
                props={
                    {
                        id: `swc_${row.index}.${Constant.grid.rowDataField}.${editPropertyName}_${elementIndex}`,
                        ...getFieldPropsCallBack(row)
                    }
                }
                {...getFieldPropsCallBack(row)}
            >
            </FormFieldComponent>
        );
    }

    //#endregion protected methods
}
