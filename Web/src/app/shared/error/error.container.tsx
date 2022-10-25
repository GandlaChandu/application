//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { CoreActionCreator, CoreState, IAppActionModel } from '../../core';

import { ErrorComponent } from './error.component';
import { GlobalState } from '../global-states';
import { errorSelector } from './error.selector';
import { ErrorPropModel } from './models/error-prop.model';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state: GlobalState): Selector<any, ErrorPropModel> {
    return createStructuredSelector(
        {
            errorInfo: ((state: GlobalState) => errorSelector.getErrorInfo(state)),
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<CoreState, IAppActionModel<CoreState>, any>) {
    return {
        dispatchClearError: () => dispatch(CoreActionCreator.clearErrorAction()),
        dispatchSetError: () => dispatch(CoreActionCreator.setErrorAction({ isGlobalError: true }))
    };
}

export const ErrorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorComponent);