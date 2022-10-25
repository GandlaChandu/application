//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { globalStore } from './global.store';
import { reducerManager } from './reducer.manager';

//#endregion application imports

/**
 * dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export function injectReducer<P>(key: string, reducer) {
    return (WrappedComponent) => {

        class Injector extends React.Component<P> {

            //#region model properties
            //#endregion model properties

            //#region constructor

            constructor(props) {
                super(props);
                reducerManager.registerReducer(globalStore, key, reducer);
            }

            //#endregion constructor

            //#region life cycle hooks

            componentWillUnmount() {
                reducerManager.omitReducer(globalStore, key);
            }

            /**
             * renders html for component
             */
            render() {
                return <WrappedComponent {...this.props} />;
            }

            //#endregion life cycle hooks

            //#region event callbacks/public methods

            //#endregion events callbacks/public methods

            //#region private methods
            //#endregion private methods

        }

        return Injector;
    };
}
