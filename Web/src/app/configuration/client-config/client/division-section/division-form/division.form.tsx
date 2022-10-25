//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { divisionSelector } from '../division-store';
import { DivisionFormConstant } from './division-form.constant';
import { DivisionFormComponent } from './division-form.component';
import { containerHelper, GlobalState } from '../../../../../shared';
import { ThunkDispatch } from 'redux-thunk';
import { IAppActionModel } from '../../../../../core';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state) {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            initialValues: (state) => divisionSelector.getSelectedDivision(state),
            divisions: (state) => divisionSelector.getDivisions(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>) {
    return {

        ...containerHelper().mapDispatchToPropsBase(dispatch),

    };
}
const DivisionReduxform = reduxForm({
    form: DivisionFormConstant.form,
    enableReinitialize: true
})(DivisionFormComponent)

export const DivisionForm = connect(mapStateToProps, mapDispatchToProps)(DivisionReduxform)