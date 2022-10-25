//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import './app-footer.scss';

//#endregion application imports

export class AppFooterComponent extends React.PureComponent {

    //#region model properties

    public currentYear = new Date().getFullYear();

    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
    * renders html for component 
    */
    render() {
        return (
            <div className="container-fluid border-top footer">
                <div className="row mt-2 mb-2">
                    <div className="col-12 footerstyle py-2">
                        &#169; {this.currentYear} ACS Solutions. All Rights Reserved.
                    </div>
                </div>
            </div>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion event callbacks/public methods

    //#region private methods
    //#endregion private methods
}