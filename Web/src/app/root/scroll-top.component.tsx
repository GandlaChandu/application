//#region react imports

import React from 'react';
import { withRouter } from 'react-router-dom';

//#endregion react imports

//#region application imports

//#endregion application imports

class ScrollTopComponent extends React.Component<any> {

    //#region model properties

    //#endregion model properties

    //#region constructor

    //#endregion constructor

    //#region life cycle hooks

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }

    //#endregion life cycle hooks

    //#region events/public methods

    //#endregion events/public methods

    //#region private methods

    //#endregion private methods
}

export default withRouter(ScrollTopComponent);