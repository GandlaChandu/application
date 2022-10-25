//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { ScanCascadeModel, ScanCascadeFormPropModel } from '../models';
import { ScanCascadeFormConstant } from '../scan-cascade-form.constant';

//#endregion application imports


class ScanSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets clients from state
     * @param state
     * @param ownProps
     */
    public getClients(state: any, ownProps: any) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ? (state[ownProps.namespace] as ScanCascadeModel).clients : [],
            (clients) => clients
        );
        return selector(state);
    }

    /**
     * gets divisions from state
     * @param state
     * @param ownProps
     */
    public getDivisions(state: any, ownProps: any) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ? (state[ownProps.namespace] as ScanCascadeModel).divisions : [],
            (divisions) => divisions
        );
        return selector(state);
    }

    /**
     * gets projects from state
     * @param state
     * @param ownProps
     */
    public getProjects(state: any, ownProps: any) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ? (state[ownProps.namespace] as ScanCascadeModel).projects : [],
            (projects) => projects
        );
        return selector(state);
    }

    /**
     * gets scan types from state
     * @param state
     * @param ownProps
     */
    public getScanTypes(state: any, ownProps: any) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ? (state[ownProps.namespace] as ScanCascadeModel).scanTypes : [],
            (scanTypes) => scanTypes
        );
        return selector(state);
    }

    /**
     * gets form data from state
     * @param state
     * @param ownProps
     */
    public getFormData(state: any, ownProps: any): ScanCascadeModel {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ? {
                clientId: state[ownProps.namespace].clientId,
                divisionId: state[ownProps.namespace].divisionId,
                projectId: state[ownProps.namespace].projectId,
                scanTypeId: state[ownProps.namespace].scanTypeId,
                startDate: state[ownProps.namespace].startDate,
                endDate: state[ownProps.namespace].endDate

            }
                :
                {},
            (formData) => formData
        );
        return selector(state);
    }

    /**
     * gets form data from state
     * @param state
     * @param ownProps
     */
    public getScanFormData(state: any, ownProps: ScanCascadeFormPropModel) {
        let selector = createSelector(
            (state: any) => state.form && state.form[ownProps.form] && state.form[ownProps.form].values ?
                state.form[ownProps.form].values
                :
                state.form[ScanCascadeFormConstant.form] && state.form[ScanCascadeFormConstant.form].values ?
                    state.form[ScanCascadeFormConstant.form].values :
                    {}
            ,
            (formData) => formData
        );
        return selector(state);
    }

    //#endregion public functions

}

export const scanSelector = new ScanSelector();

