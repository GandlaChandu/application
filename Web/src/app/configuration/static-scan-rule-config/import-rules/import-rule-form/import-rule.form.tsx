//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { containerHelper, GlobalState } from '../../../../shared';
import { IAppActionModel } from '../../../../core';

import { importRuleSelector, ImportRuleState } from '../import-rule-store';
import { ImportRuleFormComponent } from './import-rule-form.component';
import { ImportRuleFormConstant } from './import-rule-form.constant';
import { ImportRuleFormDispatchPropModel, ImportRuleFormOwnPropModel } from './models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<ImportRuleState, ImportRuleFormOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            severityTypes: (state) => importRuleSelector.getSeverityTypes(state),
            vulnerabilityTypes: (state) => importRuleSelector.getVulnerabilityyTypes(state),
            selectedLanguage: (state) => importRuleSelector.getLanguage(state)

        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): ImportRuleFormDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch)
    };
}

const ImportRuleReduxform = reduxForm<any, any>({
    form: ImportRuleFormConstant.form,
    enableReinitialize: true,
})(ImportRuleFormComponent)

export const ImportRuleform = connect(mapStateToProps, mapDispatchToProps)(ImportRuleReduxform)