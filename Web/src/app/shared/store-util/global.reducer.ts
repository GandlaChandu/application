//#region react imports

import { combineReducers, Reducer } from 'redux';
import { reducer as formReducer } from 'redux-form';

//#endregion react imports

//#region application imports

import { pageReducer } from '../reducers';
import { coreReducer } from '../../core';


//#endregion application imports

export const createRootReducer = (asyncReducers = {}): Reducer<any> => {
    const initialReducers = {
        coreState: coreReducer,
        pageState: pageReducer,
        form: formReducer,
        ...asyncReducers,
    };
    return combineReducers(initialReducers);
};