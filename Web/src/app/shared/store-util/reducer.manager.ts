//#region react imports
//#endregion react imports

//#region application imports

import { StringHelper } from '../../core';
import { createRootReducer } from './global.reducer';

//#endregion application imports

class ReducerManager {

    //#region model proeprties

    private scopedReducer: any = {};

    //#endregion model properties

    //#region constructor
    //#endregion constuctor

    //#region public functions

    /**
     * register scoped routes
     * @param store
     * @param reducer
     */
    public registerReducer(store, key, reducer) {
        //verify that key is not present
        if (this.isValidKey(key) && !this.hasKey(key)) {
            this.scopedReducer[key] = reducer;
            store.replaceReducer(createRootReducer(this.scopedReducer));
        }
    }

    /**
     * omits registered reducer from store
     * @param store
     * @param key
     */
    public omitReducer(store, key) {
        if (this.hasKey(key)) {
            delete this.scopedReducer[key];
            store.replaceReducer(createRootReducer(this.scopedReducer));
        }
    }

    //#endregion public functions

    //#region private functions

    /**
     * determines if key is present in scoped reducers 
     * @param key
     */
    private hasKey(key: string): boolean {
        if (this.isValidKey(key)) {
            let index = Object.keys(this.scopedReducer).findIndex(x => StringHelper.areEqual(x, key));
            return index > -1;
        }
        return false;
    }

    /**
     * validates key
     * @param key
     */
    private isValidKey(key: string) {
        if (key) {
            return true;
        }
        return false;
    }

    //#endregion private functions

}

export const reducerManager = new ReducerManager();