//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { FormListState } from './form-list.state';
import { Helper } from '../../../helpers';
import { PagedResult } from '../../../models';
import { GridRowModel } from '../../../controls';

//#endregion application imports

class FormListSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets dynamic policy scanner data from state
     * @param state
     * @param ownProps
     */
    public getInitialValues(state: any, reducerKey:any) {
        let selector = createSelector(
            (state: any) => state[reducerKey] && state[reducerKey] as FormListState<any> ?
                { items: (state[reducerKey] as FormListState<any>).formlist || [] } : { items: [] },
            (formlist) => formlist
        );
        return selector(state);
    }

    /**
     * gets dynamic policy scanner data for grid from state
     * @param state
     * @param reducerKey
     */
    public getformListForGrid(state: any, reducerKey: any) {
        let selector = createSelector(
            (state: any) => {
                if (state[reducerKey] && state[reducerKey] as FormListState<any>) {
                    return Helper.toPagedGridRowModelFromGridRowArr((state[reducerKey] as FormListState<any>).formlist, (state[reducerKey] as FormListState<any>).total);
                }
                return new PagedResult<GridRowModel<any>>();
            },
            (formlist) => formlist
        );
        return selector(state);
    }

    /**
     * gets dynamic policy scanner data for grid from state
     * @param state
     * @param reducerKey
     */
    public getFormData(state: any, form: any) {
        let selector = createSelector(
            (state: any) => {
                if (form && state.form[form]) {
                    return state.form[form].values?.items;
                }
                return [];
            },
            (values) => values
        );
        return selector(state);
    }

    //#endregion public functions
}

export const formListSelector = new FormListSelector();

