//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { PermissionPropModel } from '../models/permission-prop.model';
import { PermissionState } from './permission.state';
import { PermissionHelper } from '../permission.helper';
import { PermissionRoleModel } from '../models/permission-role.model';

//#endregion application imports


class PermissionSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets permission nodes info state
     * @param state
     * @param ownProps
     */
    public getPermissionNodes(state: any, ownProps: PermissionPropModel) {
        let selector = createSelector(
            (state: any) => {
                return state[ownProps.namespace] ?
                    (state[ownProps.namespace] as PermissionState).permissionNodes : []
            },
            (permissionNodes) => permissionNodes
        );
        return selector(state);
    }

    /**
     * gets initial permission nodes info state
     * @param state
     * @param ownProps
     */
    public getInitialPermissionNodes(state: any, ownProps: PermissionPropModel) {
        let selector = createSelector(
            (state: any) => {
                if (state[ownProps.namespace] && (state[ownProps.namespace] as PermissionState).userRoleInfo) {
                    let originalNodes = (state[ownProps.namespace] as PermissionState).permissionNodes || [];
                    let userRoleInfo = (state[ownProps.namespace] as PermissionState).userRoleInfo ?
                        (state[ownProps.namespace] as PermissionState).userRoleInfo : new PermissionRoleModel();
                    return PermissionHelper.getInitialNodes(userRoleInfo, originalNodes);
                }

                return [];

            },
            (permissionNodes) => permissionNodes
        );
        return selector(state);
    }


    /**
     * gets initial permission nodes info state
     * @param state
     * @param ownProps
     */
    public getSelectedRoles(state: any, ownProps: PermissionPropModel) {
        let selector = createSelector(
            (state: any) => {
                return state[ownProps.namespace] ?
                    (state[ownProps.namespace] as PermissionState).userRoleInfo : new PermissionRoleModel()
            },
            (rolesSelected) => rolesSelected
        );
        return selector(state);
    }

    /**
     * gets save disabled state
     * @param state
     * @param ownProps
     */
    public getSaveDisabledState(state: any, ownProps: PermissionPropModel) {
        let selector = createSelector(
            (state: any) => {
                return state[ownProps.namespace] ?
                    (state[ownProps.namespace] as PermissionState).isSaveDisabled : false
            },
            (isSaveDisabled) => isSaveDisabled
        );
        return selector(state);
    }

    //#endregion public functions

    //#region private functions
    //#endregion private functions

}

export const permissionSelector = new PermissionSelector();

