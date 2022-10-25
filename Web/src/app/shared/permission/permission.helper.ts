//#region react imports
//#endregion react imports

//#region application imports

import { NodeModel } from './models/node.model';
import { ParentNodeModel } from './models/parent-node.model';
import { StringHelper } from '../../core';
import { Role } from '../../utilities';
import { PermissionRoleModel } from './models/permission-role.model';

//#endregion application imports

export class PermissionHelper {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region event callbacks/public methods

    /**
     * maps seletions for node
     * @param node
     * @param parent
     * @param value
     */
    public static mapIsSelected(node: ParentNodeModel, parent: ParentNodeModel, value?: any) {
        //If user clicked on checkbox
        if (value !== undefined || value !== null) {
            node.isSelected = value;
        }
        if (parent) {
            if (!this.isParentSelected(parent)) {
                this.handleDependency(node, parent);
            }
            this.handleParent(parent);
        }
        else {
            this.handleChildren(node, value);
            this.handleParentToggle(node);
        }
    }

    /**
     * handles dependency nodes
     * @param node
     * @param parent
     */
    public static handleDependency(node: NodeModel, parent: ParentNodeModel) {
        //if node is selected, then preselect and disable the dependency nodes
        if (parent &&
            node.dependentValues &&
            node.dependentValues.length > 0) {
            parent.nodes.forEach(x => {
                if (node.dependentValues.findIndex(d => d === x.value) > -1) {
                    x.isSelected = (x.isSelected || node.isSelected) ? true : false;
                    x.isDisabled = node.isSelected;
                }
            });
        }
    }

    /**
     * handles expansion logic for parent nodes
     * @param parent
     * @param isToggle
     */
    public static handleParentToggle(parent: ParentNodeModel, isToggle?: boolean) {
        if (this.isParent(parent)) {
            if (isToggle) {
                //give priority to toggle
                parent.isExpand = !parent.isExpand;
            }
            else {
                parent.isExpand = (parent.isSelected ||
                    parent.nodes.findIndex(x => x.isSelected) > -1) ? true : false;
            }

        }
    }

    /**
     * handles logic for children of the selected parent node
     * @param parent
     * @param isParentSelected
     */
    public static handleChildren(parent: ParentNodeModel, isParentSelected: boolean) {
        if (this.isParent(parent)) {
            parent.nodes.forEach(x => {
                x.isSelected = isParentSelected;
                x.isDisabled = isParentSelected;
            });
        }
    }

    /**
     * handles logic for parent of the selected child node
     * @param parent
     */
    public static handleParent(parent: ParentNodeModel) {
        //check if all chilren are selected and mark parent as selected
        parent.isSelected = this.isParentSelected(parent);
        //if parent selected, then mark all children as selected.
        if (parent.isSelected) {
            parent.nodes.forEach(x => {
                x.isSelected = parent.isSelected;
                x.isDisabled = parent.isSelected;
            });
        }
    }

    /**
     * determines if given node is parent
     * @param parent
     */
    public static isParent(node: ParentNodeModel) {
        if (node &&
            node.nodes &&
            node.nodes.length > 0) {
            return true;
        }
        return false;
    }

    /**
     * determines if parent is selected
     * @param parent
     */
    public static isParentSelected(parent: ParentNodeModel) {
        return parent.nodes.every(x => x.isSelected);
    }

    /**
     * maps new parent object to permissions
     * @param newNodes
     * @param newParent
     * @param parentIndex
     */
    public static mapNewParent(newNodes: ParentNodeModel[], newParent: ParentNodeModel, parentIndex: number) {
        newNodes[parentIndex] = newParent;
    }

    /**
     * maps new child object to permissions
     * @param newNodes
     * @param parentIndex
     * @param childIndex
     * @param newChild
     */
    public static mapNewChild(newNodes: ParentNodeModel[], parentIndex: number, childIndex: number, newChild: NodeModel) {
        newNodes[parentIndex].nodes[childIndex] = newChild;
    }

    /**
     * gets new permission array with new parent object
     * @param oldPermissions
     * @param newParent
     * @param parentIndex
     */
    public static getNewPermissionsForParent(oldPermissions: ParentNodeModel[], newParent: ParentNodeModel, parentIndex: number) {
        let newNodes = [...oldPermissions];
        newNodes[parentIndex] = newParent;
        return newNodes;
    }

    /**
     * gets new permission array with new child object
     * @param oldPermissions
     * @param parentIndex
     * @param childIndex
     * @param newChild
     */
    public static getNewPermissionsForChild(oldPermissions: ParentNodeModel[], parentIndex: number, childIndex: number, newChild: NodeModel) {
        let newNodes = [...oldPermissions];
        newNodes[parentIndex].nodes[childIndex] = newChild;
        return newNodes;
    }

    /**
     * maps is selected property of the node
     * @param userRoleInfo
     * @param originalNodes
     */
    public static getInitialNodes(userRoleInfo: PermissionRoleModel, originalNodes: ParentNodeModel[]) {
        let nodes: ParentNodeModel[] = [];
        if (originalNodes && originalNodes.length > 0) {
            let parent: ParentNodeModel = null;
            originalNodes.forEach((x, i) => {
                parent = { ...x };
                if (x.nodes) {
                    parent.nodes = [...x.nodes];
                }
                this.setNodeValues(userRoleInfo, parent);
                if (PermissionHelper.isParent(parent)) {
                    parent.nodes.forEach((c, i) => {
                        this.setNodeValues(userRoleInfo, c, x);
                    });
                }
                PermissionHelper.handleParentToggle(parent);

                nodes.push(parent);
            });
        }
        return nodes;
    }

    /**
     * sets a child node defaults
     * @param userRoleInfo
     * @param node
     * @param parent
     */
    public static setNodeValues(userRoleInfo: PermissionRoleModel, node: ParentNodeModel, parent?: ParentNodeModel) {
        let isNodeSelected = (userRoleInfo?.roles.findIndex(r => StringHelper.areEqual(Role[r], node.value)) > -1 || node.isSelected) ? true : false;
        PermissionHelper.mapIsSelected(node, parent, isNodeSelected);

    }

    /**
     * determies if save is disabled
     * @param nodes
     */
    public static isSaveDisabled(nodes: ParentNodeModel[]) {
        let isDisabled = true;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].isSelected) {
                isDisabled = false;
                break;
            }
            else if (nodes[i].nodes && nodes[i].nodes.length > 0) {
                //check in child
                for (let j = 0; j < nodes[i].nodes.length; j++) {
                    if (nodes[i].nodes[j].isSelected) {
                        isDisabled = false;
                        break;
                    }
                }
                if (!isDisabled) {
                    break;
                }
            }
        }
        return isDisabled;
    }

    //#endregion event callbacks/public methods

    //#region private methods

    //#endregion private methods
}