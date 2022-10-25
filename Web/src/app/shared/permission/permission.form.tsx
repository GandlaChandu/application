//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { GlobalState } from '../../shared';
import { IAppActionModel } from '../../core';

import { containerHelper } from '../helpers';
import { PermissionComponent } from './permission.component';
import { PermissionPropModel } from './models/permission-prop.model';
import { ParentNodeModel } from './models/parent-node.model';
import { PermissionActionCreator } from './permission-store/permission.action';
import { permissionSelector } from './permission-store/permission.selector';
import { PermissionConstant } from './permission.constant';
import { PermissionRoleModel } from './models/permission-role.model';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state, ownProps: PermissionPropModel) {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            userRoleInfo: (state, ownprops) => permissionSelector.getSelectedRoles(state, ownprops),
            permissionNodes: (state, ownprops) => permissionSelector.getPermissionNodes(state, ownprops),
            initialValues: (state, ownprops) => permissionSelector.getPermissionNodes(state, ownprops),
            isSaveDisabled: (state, ownprops) => permissionSelector.getSaveDisabledState(state, ownprops)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): PermissionPropModel {
    return {

        ...containerHelper().mapDispatchToPropsBase(dispatch),

        dispatchRefreshNodes: (permissionNodes: ParentNodeModel[]) =>
            dispatch(PermissionActionCreator.setPermissionNodes(permissionNodes)),

        dispatchSetRoles: (userRoleInfo: PermissionRoleModel) =>
            dispatch(PermissionActionCreator.setInitialRoles(userRoleInfo)),

        dispatchSetSaveDisabled: (isDisabled: boolean) =>
            dispatch(PermissionActionCreator.setSaveDisabledState(isDisabled))
    };
}

const PermissionReduxform = reduxForm<any, any>({
    form: PermissionConstant.form,
    enableReinitialize: true,
})(PermissionComponent)

export const PermissionForm = connect(mapStateToProps, mapDispatchToProps)(PermissionReduxform);
