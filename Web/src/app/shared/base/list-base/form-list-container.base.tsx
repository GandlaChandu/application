//#region react imports

import { FormAction } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../core';

import { formListSelector } from './form-list-store';
import { containerHelper } from '../../helpers';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 * @param reducerKey
 * @param form
 */
function mapStateToProps(state, reducerKey: string, form?: string) {
    return {
        ...containerHelper().mapStateToPropsBase(state),
        initialValues: (state) => formListSelector.getInitialValues(state, reducerKey),
        gridResultData: (state) => formListSelector.getformListForGrid(state, reducerKey),
        gridFormData: (state) => formListSelector.getFormData(state, form)
    };
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any, any, IAppActionModel<any> | FormAction>) {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
    };
}

export function formlistContainerHelper() {
    return {
        mapStateToPropsBase: (state, reducerKey: string, form?: string) => mapStateToProps(state, reducerKey, form),
        mapDispatchToPropsBase: (dispatch) => mapDispatchToProps(dispatch)
    };
}
