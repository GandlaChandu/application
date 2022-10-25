//#region react imports
//#endregion react imports

//#region application imports

import { ActionHelper } from '../../core';
import { PageActionType } from '../action-types';
import { PageState } from '../global-states';
import { ToasterInfoModel, AlertInfoModel } from '../models';

//#endregion application imports

export class PageActionCreator {

    //#region public functions

    /**
     * action to set page title state info to store
     * @param title
     */
    public static setPageTitleAction(title: string) {
        return ActionHelper.createAction<PageState>(PageActionType.SetTitle, { pageTitle: title });
    }

    /**
     * action to toggle menu show/hide to store
     * @param show
     */
    public static toggleMenuAction(show: boolean = true) {
        return ActionHelper.createAction<PageState>(PageActionType.ShowMenu, { showMenu: show });
    }

    /**
     * action to open toaster to store
     * @param toaster
     */
    public static openToasterAction(toaster: ToasterInfoModel) {
        return ActionHelper.createAction<PageState>(PageActionType.OpenToaster, { toasterInfo: toaster });
    }

    /**
     * action to open toaster to store
     */
    public static closeToasterAction() {
        return ActionHelper.createAction<PageState>(PageActionType.OpenToaster, { toasterInfo: new ToasterInfoModel() });
    }

    /**
     * action to show alert to store
     * @param alertInfo
     */
    public static showAlertAction(alertInfo: AlertInfoModel) {
        return ActionHelper.createAction<PageState>(PageActionType.ShowAlert, { alertInfo: alertInfo });
    }

    /**
     * action to hide alert to store
     */
    public static hideAlertAction() {
        return ActionHelper.createAction<PageState>(PageActionType.HideAlert, { alertInfo: new AlertInfoModel() });
    }

    /**
     * action to set edit mode state info to store
     * @param isEdit
     */
    public static setEditModeAction(isEdit: boolean = false) {
        return ActionHelper.createAction<PageState>(PageActionType.SetEditMode, { isEditMode: isEdit });
    }

    /**
     * action to set submit btn state info to store
     * @param isContinue
     */
    public static setSubmitButtonAction(isContinue: boolean = false) {
        return ActionHelper.createAction<PageState>(PageActionType.SetSubmitBtnState, { isSaveAndContinue: isContinue });
    }

    /**
     * action to toggle icon dropdown show/hide to store
     * @param showUserIconDropdown
     */
    public static toggleIconDropdownAction(showUserIconDropdown: boolean = false) {
        return ActionHelper.createAction<PageState>(PageActionType.ShowUserIconDropdown, { showUserIconDropdown: showUserIconDropdown });
    }

    /**
     * action to set page laoding state info
     * @param isLoading
     */
    public static setPageLoadingInfo(isLoading: boolean) {
        return ActionHelper.createAction<PageState>(PageActionType.SetPageLoadingState, { isLoading: isLoading });
    }

    //#endregion public functions
}
