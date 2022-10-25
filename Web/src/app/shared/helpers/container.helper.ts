//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ErrorInfoModel, CoreActionCreator } from '../../core';

import { PageActionCreator, SharedActionCreator } from '../actions';
import { PageState } from '../global-states';
import { PageBasePropModel, ToasterInfoModel, AlertInfoModel } from '../models';
import { pageSelector } from '../selectors';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state) {
    let props = {
        isGlobalError: (state) => pageSelector.getGlobalErrorState(state),
        isEditMode: (state) => pageSelector.getEditModeState(state),
        isSaveAndContinue: (state) => pageSelector.getSubmitButtonState(state),
        showMenu: (state) => pageSelector.getMenuDisplayState(state),
        userProfile: (state) => pageSelector.getUserProfile(state),
        autheticationInfo: (state) => pageSelector.getAuthInfo(state),
        isLoading: (state) => pageSelector.getPageLoadingInfo(state),
        userRoles: (state) => pageSelector.getUserRoles(state)
    };
    return props;
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps<T>(dispatch: ThunkDispatch<PageState, IAppActionModel<PageState>, any>): PageBasePropModel {
    return {
        dispatch: dispatch,
        dispatchSetTitle: (title: string) => dispatch(PageActionCreator.setPageTitleAction(title)),
        dispatchOpenToaster: (toaster: ToasterInfoModel) => dispatch(PageActionCreator.openToasterAction(toaster)),
        dispatchCloseToaster: () => dispatch(PageActionCreator.closeToasterAction()),
        dispatchShowAlert: (alert: AlertInfoModel) => dispatch(PageActionCreator.showAlertAction(alert)),
        dispatchHideAlert: () => dispatch(PageActionCreator.hideAlertAction()),
        dispatchSetError: (error: ErrorInfoModel) => dispatch(CoreActionCreator.setErrorAction(error)),
        dispatchShowLoader: (show: boolean) => dispatch(CoreActionCreator.showLoaderAction(show)),
        dispatchSetEditMode: (isEdit: boolean = false) => dispatch(PageActionCreator.setEditModeAction(isEdit)),
        dispatchSubmitBtnState: (isContinue: boolean = false) => dispatch(PageActionCreator.setSubmitButtonAction(isContinue)),
        dispatchPageLoadingState: (isLoading: boolean) => dispatch(PageActionCreator.setPageLoadingInfo(isLoading)),

        dispatchResetControl: (formModel: any, form: string, fieldKey: string) =>
            dispatch(SharedActionCreator.resetControl(formModel, form, fieldKey)),


    };
}

export function containerHelper() {
    return {
        mapStateToPropsBase: mapStateToProps,
        mapDispatchToPropsBase: mapDispatchToProps
    };
}