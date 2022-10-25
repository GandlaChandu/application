//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { containerHelper, GlobalState, injectReducer, ClientModel, SuccessFn, ErrorFn, PageRequestModel } from '../../../shared';
import { IAppActionModel } from '../../../core';
import { Constant } from '../../../utilities';

import { ClientDispatchModel, ClientOwnPropModel } from './models';
import { clientSelector, ClientState, ClientActionCreator, clientReducer } from './client-store';
import { ClientComponent } from './client.component';
import { divisionSelector, DivisionSectionActionCreator } from './division-section';
import { qualityProfileSectionSelector, userMapSelector } from '../../config-shared';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state, ownprops): Selector<ClientState, ClientOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            client: (state) => clientSelector.getClient(state),
            showDivisionTab: (state) => divisionSelector.getDivisionTabState(state),
            showQualityProfileTab: (state) => qualityProfileSectionSelector.getQualityProfileTabState(state, { namespace: Constant.reducerKey.clientReducer }),
            showUserTab: (state) => userMapSelector.getUserTabState(state, { namespace: Constant.reducerKey.clientReducer })
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): ClientDispatchModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),

        dispatchSetClient: (client: ClientModel) => dispatch(ClientActionCreator.setClient(client)),

        dispatchFetchDynamicPolicy: (client: ClientModel, errorCallback: ErrorFn) =>
            dispatch(ClientActionCreator.fetchClientDynamicPolicy(client, errorCallback)),

        dispatchDivisionTabState: (show: boolean) => dispatch(ClientActionCreator.setShowDivisionTab(show)),

        dispatchQualityProfileTabState: (show: boolean) => dispatch(ClientActionCreator.setShowQualityProfileTab(show)),

        dispatchUserMapTabState: (show: boolean) => dispatch(ClientActionCreator.setShowUserMapTab(show)),

        dispatchSaveClient: (client: ClientModel, successCallback: SuccessFn, errorCallback: ErrorFn) =>
            dispatch(ClientActionCreator.saveClient(client, successCallback, errorCallback)),

        dispatchFetchDivisions: (id: number, pagerequest: PageRequestModel, errorCallback: ErrorFn) =>
            dispatch(DivisionSectionActionCreator.fetchDivisions(id, pagerequest, errorCallback)),

    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(ClientComponent);
export const ClientContainer = injectReducer(Constant.reducerKey.clientReducer, clientReducer)(withConnect);