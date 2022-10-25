//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../utilities';
import { IAppActionModel } from '../../../core';
import { containerHelper, injectReducer, PageRequestModel } from '../../../shared';

import { ClientManagerComponent } from './client-manager.component';
import { ClientManagerState, clientManagerSelector, ClientManagerActionCreator, clientManagerReducer } from './client-manager-store';
import { ClientManagerDispatchModel } from './models/client-manager-dispatch.model';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, ClientManagerState> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            gridResultData: (state) => clientManagerSelector.getClients(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<ClientManagerState, any, IAppActionModel<ClientManagerState>>): ClientManagerDispatchModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchClients: (pageRequest: PageRequestModel, errorCallback: (error) => void) =>
            dispatch(ClientManagerActionCreator.fetchClients(pageRequest, errorCallback))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(ClientManagerComponent);
export const ClientManagerContainer = injectReducer(Constant.reducerKey.clientManagerReducer, clientManagerReducer)(withConnect);