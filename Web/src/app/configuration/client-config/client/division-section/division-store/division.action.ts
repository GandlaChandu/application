//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../../core';
import { PageRequestModel, DivisionModel, PagedResult } from '../../../../../shared';

import { divisionSectionService } from '../division-section.service';
import { DivisionSectionActionType } from './division-action-type.enum';
import { DivisionSectionState } from './division.state';

//#endregion application imports

export class DivisionSectionActionCreator {

    //#region public functions

    /**
     * action to fetch divisions for client and save to store
     * @param clientId
     * @param pageRequest
     * @param errorCallback
     */
    public static fetchDivisions(clientId: number, pageRequest: PageRequestModel, errorCallback: (error?: any) => void):
        ThunkDispatch<DivisionSectionState, any, IAppActionModel<DivisionSectionState>> {
        return (dispatch: ThunkDispatch<DivisionSectionState, any, IAppActionModel<DivisionSectionState>>) => {
            let divisions = new PagedResult<DivisionModel>();
            if (clientId > 0) {
                divisionSectionService.getClientDivisions(dispatch, clientId, pageRequest).then(
                    (response: ApiResponseModel<PagedResult<DivisionModel>>) => {
                        if (response && response.isSuccess) {
                            divisions = response.data;
                        }
                        else {
                            errorCallback(response)
                        }
                        dispatch({
                            type: DivisionSectionActionType.FetchDivisions,
                            payload: {
                                divisions: divisions
                            }
                        });
                    },
                    errorCallback
                );
            }

        };
    }

    /**
     * action to set division popup state info to store
     * @param show
     * @param division
     */
    public static setDivisionPopupState(show: boolean = false, division?: DivisionModel):
        ThunkDispatch<DivisionSectionState, any, IAppActionModel<DivisionSectionState>> {
        return (dispatch: ThunkDispatch<DivisionSectionState, any, IAppActionModel<DivisionSectionState>>) => {
            dispatch({
                type: DivisionSectionActionType.SetDivisionPopup,
                payload: { showDivisionPopup: show, selectedDivision: division }
            });
        };
    }

    /**
     * action to call save division api
     * @param division
     * @param successCallback
     */
    public static saveDivision(division: DivisionModel, successCallback: (response) => void, errorCallback: (error) => void):
        ThunkDispatch<DivisionSectionState, any, IAppActionModel<DivisionSectionState>> {
        return (dispatch: ThunkDispatch<DivisionSectionState, any, IAppActionModel<DivisionSectionState>>) => {
            divisionSectionService.saveDivision(dispatch, division).then(successCallback, errorCallback);
        };
    }

    //#endregion public functions

    //#region private functions

    //#endregion private functions
}