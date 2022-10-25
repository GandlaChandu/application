//#region react imports
//#endregion react imports

//#region application imports

import { CoreState } from '../../core';

import { PageState } from './page.state';

//#endregion application imports

export class GlobalState {
    public coreState?: CoreState;
    public pageState?: PageState;

    constructor() {
        this.coreState = new CoreState();
        this.pageState = new PageState();
    }
}