//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../../utilities';

import { StaticScanInfoState } from './static-scan-info.state';

//#endregion application imports


class StaticScanInfoSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets code scan types info
     * @param state
     */
    public getStaticCodeScanTypes(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as StaticScanInfoState).codeScanTypes : [],
            (codeScanTypes) => codeScanTypes
        );
        return selector(state);
    }

    /**
     * gets source code types info
     * @param state
     */
    public getSourceCodeTypes(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as StaticScanInfoState).sourceCodeTypes : [],
            (sourceTypes) => sourceTypes
        );
        return selector(state);
    }

    /**
     * gets source control types info
     * @param state
     */
    public getSourceControlTypes(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as StaticScanInfoState).sourceControlTypes : [],
            (sourceControlTypes) => sourceControlTypes
        );
        return selector(state);
    }

    /**
     * gets display state for code analysis div
     * @param state
     */
    public getDisplayCodeAnalysisState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as StaticScanInfoState).showCodeAnalysisDiv : false,
            (showCodeAnalysisDiv) => showCodeAnalysisDiv
        );
        return selector(state);
    }

    /**
     * gets popup state
     * @param state
     */
    public getFormState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as StaticScanInfoState).showForm : false,
            (showForm) => showForm
        );
        return selector(state);
    }

    /**
     * gets token based state info
     * @param state
     */
    public getTokenBasedState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as StaticScanInfoState).staticIsTokenBased : false,
            (staticIsTokenBased) => staticIsTokenBased
        );
        return selector(state);
    }

    //#endregion public functions

}

export const staticScanInfoSelector = new StaticScanInfoSelector();

