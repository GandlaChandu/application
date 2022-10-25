//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../core';

import { ScanCascadeModel } from '../models';
import { ScanCascadeFormActionType } from './scan-cascade-form-action-type.enum';


//#endregion application imports

export class ScanCascadeFormActionCreator {

    //#region public functions

    /**
     *  action to set client id to store
     * @param id
     */
    public static setClientId(id: number) {
        return (dispatch: ThunkDispatch<ScanCascadeModel, any, IAppActionModel<ScanCascadeModel>>) => {

            dispatch({
                type: ScanCascadeFormActionType.SetClientId,
                payload: {
                    clientId: id
                }
            });
        }
    }

    /**
     *  action to set Divison id to store
     * @param id
     */
    public static setDivisonId(id: number) {
        return (dispatch: ThunkDispatch<ScanCascadeModel, any, IAppActionModel<ScanCascadeModel>>) => {

            dispatch({
                type: ScanCascadeFormActionType.SetDivisionId,
                payload: {
                    divisionId: id
                }
            });
        }
    }
    /**
     *  action to set project id to store
     * @param id
     */
    public static setProjectId(id: number) {
        return (dispatch: ThunkDispatch<ScanCascadeModel, any, IAppActionModel<ScanCascadeModel>>) => {

            dispatch({
                type: ScanCascadeFormActionType.SetProjectId,
                payload: {
                    projectId: id
                }
            });
        }
    }
    /**
     *  action to set scantype id to store
     * @param id
     */
    public static setScanTypeId(id: number) {
        return (dispatch: ThunkDispatch<ScanCascadeModel, any, IAppActionModel<ScanCascadeModel>>) => {

            dispatch({
                type: ScanCascadeFormActionType.SetScanTypeId,
                payload: {
                    scanTypeId: id
                }
            });
        }
    }
    //#endregion public functions
}
