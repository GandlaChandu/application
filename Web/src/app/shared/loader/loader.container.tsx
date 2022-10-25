//#region react imports

import { connect } from 'react-redux';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { LoaderComponent } from './loader.component';
import { LoaderInfoModel } from '../../core';
import { GlobalState } from '../global-states';
import { loaderSelector } from './loader.selector';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state: GlobalState): Selector<any, LoaderInfoModel> {
    return createStructuredSelector(
        {
            showLoader: (state: GlobalState) => loaderSelector.getDisplayStateInfo(state),
            queueCount: (state: GlobalState) => loaderSelector.getQueueInfo(state),
        }
    );
}

export const LoaderContainer = connect(
    mapStateToProps,
    null
)(LoaderComponent);