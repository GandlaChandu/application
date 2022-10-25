//#region react imports
//#endregion react imports

//#region application imports

import { AccordionState } from '../accordion.state';

//#endregion application imports

export interface AccordionPropModel extends AccordionState {
    title: string;
    content: JSX.Element;
    uniqueKey: string;
}