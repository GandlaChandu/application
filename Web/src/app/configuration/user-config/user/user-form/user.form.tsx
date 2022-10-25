//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { containerHelper, GlobalState } from '../../../../shared';
import { IAppActionModel } from '../../../../core';

import { UserDispatchModel, UserOwnPropModel } from '../models';
import { UserFormComponent } from './user-form.component';
import { UserFormConstant } from './user-form.constant';
import { userSelector } from '../user-store';
import { UserModel } from '../../models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, UserOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            initialValues: (state) => userSelector.getUser(state),
            roleOptions: (state) => userSelector.getRoles(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): UserDispatchModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
    };
}

const UserReduxform = reduxForm<UserModel, any, any>({
    form: UserFormConstant.form,
    enableReinitialize: true
})(UserFormComponent)

export const UserForm = connect(mapStateToProps, mapDispatchToProps)(UserReduxform)