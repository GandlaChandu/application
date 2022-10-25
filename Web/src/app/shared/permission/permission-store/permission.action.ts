//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../core';
import { Role } from '../../../utilities';

import { PermissionState } from './permission.state';
import { PermissionActionType } from './permission-action-type.enum';
import { ParentNodeModel } from '../models/parent-node.model';
import { PermissionRoleModel } from '../models/permission-role.model';

//#endregion application imports

export class PermissionActionCreator {

    //#region public functions

    /**
     * action to fetch and set permission nodes info to store
     */
    public static fetchPermissionNodes():
        ThunkDispatch<PermissionState, any, IAppActionModel<PermissionState>> {
        return (dispatch: ThunkDispatch<PermissionState, any, IAppActionModel<PermissionState>>) => {
            //TODO: verify if this needs to be fetched from API
            let permissions: ParentNodeModel[] = [
                //{
                //    displayText: 'Add Project',
                //    value: 'AddProject'
                //},
                {
                    displayText: 'Edit Project',
                    value: Role[Role.EditProject]
                },
                {
                    displayText: 'Schedule Admin',
                    value: Role[Role.ScheduleAdmin],
                    nodes: [
                        {
                            displayText: 'Add Schedule',
                            value: Role[Role.AddSchedule]
                        },
                        {
                            displayText: 'Edit Schedule',
                            value: Role[Role.EditSchedule],
                            dependentValues: [Role[Role.ViewScheduleList]]
                        },
                        {
                            displayText: 'View Schedule List',
                            value: Role[Role.ViewScheduleList]
                        }
                    ]
                },
                {
                    displayText: 'Dynamic Scan Admin',
                    value: Role[Role.DynamicScanAdmin],
                    nodes: [
                        {
                            displayText: 'Trigger Scan',
                            value: Role[Role.DynamicNewScan],
                            dependentValues: [Role[Role.DynamicViewList]]
                        },
                        {
                            displayText: 'View Results',
                            value: Role[Role.DynamicViewList]
                        },
                        {
                            displayText: 'View Report',
                            value: Role[Role.DynamicViewReport],
                            dependentValues: [Role[Role.DynamicViewList]]
                        },
                        {
                            displayText: 'Download Report',
                            value: Role[Role.DynamicDownloadReport],
                            dependentValues: [Role[Role.DynamicViewReport]]

                        }
                    ]
                },
                {
                    displayText: 'Static Scan Admin',
                    value: Role[Role.StaticScanAdmin],
                    nodes: [
                        {
                            displayText: 'Trigger Scan',
                            value: Role[Role.StaticNewScan],
                            dependentValues: [Role[Role.StaticViewList]]
                        },
                        {
                            displayText: 'View Results',
                            value: Role[Role.StaticViewList]
                        },
                        {
                            displayText: 'View Report',
                            value: Role[Role.StaticViewReport],
                            dependentValues: [Role[Role.StaticViewList]]
                        },
                        {
                            displayText: 'Download Report',
                            value: Role[Role.StaticDownloadReport],
                            dependentValues: [Role[Role.StaticViewReport]]
                        }
                    ]
                }

            ];

            dispatch({
                type: PermissionActionType.SetPermissionNodes,
                payload: {
                    permissionNodes: permissions
                }
            });
        };
    }

    /**
     * action to set permissions info to store
     * @param permissionNodes
     */
    public static setPermissionNodes(permissionNodes: ParentNodeModel[]):
        ThunkDispatch<PermissionState, any, IAppActionModel<PermissionState>> {
        return (dispatch: ThunkDispatch<PermissionState, any, IAppActionModel<PermissionState>>) => {
            dispatch({
                type: PermissionActionType.SetPermissionNodes,
                payload: {
                    permissionNodes: permissionNodes
                }
            });
        };
    }

    /**
     * action to set selected initial roles
     * @param userRoleInfo
     */
    public static setInitialRoles(userRoleInfo: PermissionRoleModel):
        ThunkDispatch<PermissionState, any, IAppActionModel<PermissionState>> {
            return(dispatch: ThunkDispatch<PermissionState, any, IAppActionModel<PermissionState>>) => {
            dispatch({
                type: PermissionActionType.SetSelectedRoles,
                payload: {
                    userRoleInfo: userRoleInfo
                }
            });
        };
    }


    /**
     * action to set save disabled state
     * @param isDisabled
     */
    public static setSaveDisabledState(isDisabled: boolean):
        ThunkDispatch<PermissionState, any, IAppActionModel<PermissionState>> {
        return (dispatch: ThunkDispatch<PermissionState, any, IAppActionModel<PermissionState>>) => {
            dispatch({
                type: PermissionActionType.SetSaveDisabledState,
                payload: {
                    isSaveDisabled: isDisabled
                }
            });
        };
    }
    //#endregion public functions

    //#region private functions

    //#endregion private functions
}