//#region react imports
//#endregion react imports

//#region application imports

import { NodeModel } from './node.model';

//#endregion application imports

export class ParentNodeModel extends NodeModel {
    public nodes?: NodeModel[];
    public isExpand?: boolean;
}