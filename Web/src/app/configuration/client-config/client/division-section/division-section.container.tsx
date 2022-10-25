//#region react imports

import { connect } from 'react-redux';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { GlobalState, DivisionModel, PageRequestModel, containerHelper } from '../../../../shared';
import { IAppActionModel } from '../../../../core';

import { DivisionSectionComponent } from './division-section.component';
import { DivisionSectionOwnPropModel, DivisionSectionDispatchPropModel } from './models';
import { divisionSelector, DivisionSectionActionCreator } from './division-store';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state, ownprops): Selector<any, DivisionSectionOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            showDivisionTab: (state) => divisionSelector.getDivisionTabState(state),
            gridResultData: (state) => divisionSelector.getDivisions(state),
            selectedDivision: (state) => divisionSelector.getSelectedDivision(state),
            showDivisionPopup: (state) => divisionSelector.getPopupState(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): DivisionSectionDispatchPropModel {
    return {

        ...containerHelper().mapDispatchToPropsBase(dispatch),

        dispatchFetchDivisions: (id: number, pagerequest: PageRequestModel, errorCallback: (error?: any) => void) =>
            dispatch(DivisionSectionActionCreator.fetchDivisions(id, pagerequest, errorCallback)),

        dispacthDivisionPopupState: (show: boolean, division?: DivisionModel) => dispatch(DivisionSectionActionCreator.setDivisionPopupState(show, division)),

        dispatchSaveDivision: (division: DivisionModel, successCallback: (response) => void, errorCallback: (error?: any) => void) =>
            dispatch(DivisionSectionActionCreator.saveDivision(division, successCallback, errorCallback)),

    };
}

export const DivisionSectionContainer = connect(mapStateToProps, mapDispatchToProps)(DivisionSectionComponent);