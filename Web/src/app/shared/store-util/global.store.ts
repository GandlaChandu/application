//#region react imports

import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

//#endregion react imports

//#region application imports

import { createRootReducer } from './global.reducer';

//#endregion application imports


function configureStore() {
    let windowObj: any = window as any;
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
            windowObj.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            windowObj.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunk),
        // other store enhancers if any
    );
    return createStore(createRootReducer(), enhancer);
}

export const globalStore = configureStore();

