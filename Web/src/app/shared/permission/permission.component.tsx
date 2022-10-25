//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import './permission.scss';
import { FormFieldComponent, CheckboxComponent } from '../forms';
import { ButtonComponent } from '../controls';
import { PermissionPropModel } from './models/permission-prop.model';
import { NodeModel } from './models/node.model';
import { ParentNodeModel } from './models/parent-node.model';
import { PermissionHelper } from './permission.helper';
import { Role } from '../../utilities';
import { PermissionRoleModel } from './models/permission-role.model';

//#endregion application imports

export class PermissionComponent extends React.Component<PermissionPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
     * component did mount life cycle hook 
     */
    componentDidMount() {
        //For setting initial values
        let newNodes: ParentNodeModel[] = PermissionHelper.getInitialNodes(this.props.userRoleInfo, this.props.permissionNodes);
        this.props.dispatchRefreshNodes(newNodes);
        this.props.dispatchSetSaveDisabled(PermissionHelper.isSaveDisabled(newNodes));
    }
    /**
    * renders html for component 
    */
    render() {
        return (
            <>
                <div className="row space-row">
                    <div className="col-sm-12">
                        {this.props.permissionNodes?.map((x, i) => this.renderParentNode(x, i))}
                    </div>
                </div>
                {this.renderSaveButton()}
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * on node check event
     * @param node
     * @param index
     * @param parentIndex
     * @param parent
     * @param value
     */
    public onNodeCheck(node: NodeModel, index: number, parentIndex: number, parent: ParentNodeModel, value) {
        let newNodes: ParentNodeModel[] = [];
        let newNode = { ...node };
        if (!parent) {
            PermissionHelper.mapIsSelected(newNode, null, value);
            newNodes = PermissionHelper.getNewPermissionsForParent(this.props.permissionNodes, newNode, index);
        }
        else {
            let newParent = {
                ...parent,
                nodes: [...parent.nodes]
            };
            newParent.nodes[index] = newNode;
            PermissionHelper.mapIsSelected(newNode, newParent, value);
            newNodes = PermissionHelper.getNewPermissionsForParent(this.props.permissionNodes, newParent, parentIndex);
            //PermissionHelper.mapNewChild(newNodes, parentIndex, index, newNode);
        }

        let rolesSelected: PermissionRoleModel = new PermissionRoleModel();
        rolesSelected.userInfo = this.props.userRoleInfo?.userInfo;
        this.mapSelectedRoles(rolesSelected, newNodes);
        this.props.dispatchSetRoles(rolesSelected);
        this.props.dispatchRefreshNodes(newNodes);
        this.props.dispatchSetSaveDisabled(PermissionHelper.isSaveDisabled(newNodes));

    }

    /**
     * on expand toggle
     * @param parent
     * @param index
     */
    public onExpandToggle(parent: ParentNodeModel, index: number) {
        let newParent = { ...parent };
        PermissionHelper.handleParentToggle(newParent, true);
        this.props.dispatchRefreshNodes(PermissionHelper.getNewPermissionsForParent(this.props.permissionNodes, newParent, index));
    }

    /**
     * on save permission click 
     */
    public onSavePermission() {
        let rolesSelected: PermissionRoleModel = new PermissionRoleModel();
        rolesSelected.userInfo = this.props.userRoleInfo?.userInfo;
        this.mapSelectedRoles(rolesSelected, this.props.permissionNodes);
        if (this.props.handleSave) {
            let userRoles = rolesSelected.roles.map(x => {
                return {
                    ...rolesSelected.userInfo,
                    roleId: x
                };
            });
            this.props.handleSave(userRoles);
        }
    }

    //#endregion event callbacks/public methods

    //#region private methods

    /**
     * gets checkbox name 
     * @param index
     * @param parentIndex
     */
    private getChbName(index: number, parentIndex?: number) {
        let name = ``;
        if (parentIndex) {
            name = `${name}[${parentIndex}].nodes[${index}].isSelected`;
        }
        else {
            name = `${name}[${index}].isSelected`;
        }
        return name;
    }

    /**
     * maps array to selected roles array
     * @param userRoleInfo
     * @param nodes
     * @param parent
     */
    private mapSelectedRoles(userRoleInfo: PermissionRoleModel, nodes: ParentNodeModel[], parent?: ParentNodeModel) {
        if (nodes && nodes.length > 0) {
            nodes.forEach(x => {
                if (x.isSelected && (!parent || !parent.isSelected)) {
                    userRoleInfo.roles.push(Role[x.value]);
                }
                this.mapSelectedRoles(userRoleInfo, x.nodes, x);
            });
        }
    }

    /**
     * renders parent node html
     * @param parent
     * @param index
     */
    private renderParentNode(parent: ParentNodeModel, index: number) {
        return (
            <div className="parent-node">
                {this.renderParentIcon(parent, index)}
                {this.renderChildNodes(parent, index)}
            </div>
        );
    }

    /**
     * renders parent child nodes
     * @param parent
     * @param index
     */
    private renderChildNodes(parent: ParentNodeModel, index: number) {
        if (parent.nodes && parent.nodes.length > 0 && parent.isExpand) {
            return (
                <div className="parent-child-list">
                    {
                        parent.nodes.map((x, i) =>
                            this.renderCheckbox(x, i, index, parent))
                    }
                </div>
            );
        }
        return (null);
    }

    /**
     * renders parent icon element
     * @param parent
     * @param index
     */
    private renderParentIcon(parent: ParentNodeModel, index: number) {
        return (
            <div className="expandable-parent">
                {this.renderParentNodeToggle(parent, index)}
                {this.renderCheckbox(parent, index)}
            </div>
        );
    }

    /**
     * renders parent expand/collapse toggle button
     * @param parent
     * @param index
     */
    private renderParentNodeToggle(parent: ParentNodeModel, index: number) {
        if (parent.nodes && parent.nodes.length > 0) {
            return (
                <ButtonComponent
                    className="parent-node-link"
                    displayType="link"
                    fontIconPrefix={`${parent.isExpand ? 'fa fa-minus' : 'fa fa-plus'}`}
                    clickHandler={this.onExpandToggle.bind(this, parent, index)}
                />
            );
        }
        return (<span className="pr-2 mr-4"></span>);
    }

    /**
     * renders checkbox 
     * @param node
     * @param index
     * @param parentIndex
     * @param parent
     */
    private renderCheckbox(node: NodeModel, index: number, parentIndex?: number, parent?: ParentNodeModel) {
        return (
            <div className="chb_node">
                <FormFieldComponent
                    name={this.getChbName(index, parentIndex)}
                    component={CheckboxComponent}
                    props={
                        {
                            id: `chb_permission_${parentIndex}_${index}`,
                            label: node.displayText,
                            disabled: node.isDisabled,
                            value: node.isSelected
                        }
                    }
                    onChange={this.onNodeCheck.bind(this, node, index, parentIndex, parent)}
                >
                </FormFieldComponent>
            </div>
        );
    }

    /**
     * renders save button 
     */
    private renderSaveButton() {
        return (
            <div className="row space-row">
                <div className="col-sm-12">
                    <ButtonComponent
                        displayText="Save Permissions"
                        className="pull-right"
                        disabled={this.props.isSaveDisabled}
                        clickHandler={this.onSavePermission.bind(this)} />
                </div>
            </div>
        );
    }

    //#endregion private methods
}