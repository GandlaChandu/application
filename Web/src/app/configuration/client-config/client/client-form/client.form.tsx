//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { containerHelper, GlobalState, ClientModel } from '../../../../shared';
import { IAppActionModel } from '../../../../core';

import { clientSelector } from '../client-store';
import { ClientFormComponent } from './client-form.component';
import { ClientFormConstant } from './client-form.constant';
import { ClientDispatchModel, ClientOwnPropModel } from '../models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, ClientOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            initialValues: (state) => clientSelector.getClient(state),
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
    };
}

const ClientReduxform = reduxForm<ClientModel, any, any>({
    form: ClientFormConstant.form,
    enableReinitialize: true
})(ClientFormComponent)

export const ClientForm = connect(mapStateToProps, mapDispatchToProps)(ClientReduxform)