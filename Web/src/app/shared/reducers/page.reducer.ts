//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../core';

import { PageActionType } from '../action-types';
import { PageState } from '../global-states';

//#endregion application imports

const initialLayoutState: PageState = new PageState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function pageReducer(state: PageState = initialLayoutState, action: IAppActionModel<PageState>): PageState {
    switch (action.type) {
        case PageActionType.SetTitle:
            return {
                ...state,
                pageTitle: action.payload.pageTitle
            };
        case PageActionType.ShowMenu:
            return {
                ...state,
                showMenu: action.payload.showMenu
            };
        case PageActionType.OpenToaster:
            return {
                ...state,
                toasterInfo: action.payload.toasterInfo
            };
        case PageActionType.CloseToaster:
            return {
                ...state,
                toasterInfo: action.payload.toasterInfo
            };
        case PageActionType.ShowAlert:
            return {
                ...state,
                alertInfo: action.payload.alertInfo
            }
        case PageActionType.HideAlert:
            return {
                ...state,
                alertInfo: action.payload.alertInfo
            }
        case PageActionType.SetEditMode:
            return {
                ...state,
                isEditMode: action.payload.isEditMode
            };
        case PageActionType.SetSubmitBtnState:
            return {
                ...state,
                isSaveAndContinue: action.payload.isSaveAndContinue
            }; 
        case PageActionType.ShowUserIconDropdown:
            return {
                ...state,
                showUserIconDropdown: action.payload.showUserIconDropdown
            };
        case PageActionType.SetPageLoadingState:
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        default:
            return state;
    }
}


