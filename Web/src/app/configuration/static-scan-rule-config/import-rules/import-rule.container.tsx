//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { containerHelper, GlobalState, injectReducer } from '../../../shared';
import { IAppActionModel } from '../../../core';
import { Constant } from '../../../utilities';

import { ImportRuleActionCreator, importRuleSelector, ImportRuleReducer } from './import-rule-store';
import { ImportRuleComponent } from './import-rule.component';
import { ImportRuleDispatchPropModel, ImportRuleFilterFormModel, ImportRuleOwnPropModel } from './models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, ImportRuleOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            gridResultData: (state) => importRuleSelector.getAllRules(state),
            severityTypes: (state) => importRuleSelector.getSeverityTypes(state),
            vulnerabilityTypes: (state) => importRuleSelector.getVulnerabilityyTypes(state),
            selectedLanguage: (state) => importRuleSelector.getSelectedLanguage(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): ImportRuleDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchSeverityTypes: (errorCallback: (error?: any) => void) => dispatch(ImportRuleActionCreator.fetchSeverityTypes(errorCallback)),
        dispatchFetchVulnerabilityTypes: (errorCallback: (error?: any) => void) => dispatch(ImportRuleActionCreator.fetchVulnerabilityTypes(errorCallback)),
        dispatchSetSelectedLanguage: (selectedLanguage: string) => dispatch(ImportRuleActionCreator.setLanguage(selectedLanguage)),
        dispatchSetFilterForm: (formdata: ImportRuleFilterFormModel) => dispatch(ImportRuleActionCreator.setFilterFormData(formdata))
     
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(ImportRuleComponent);
export const ImportRuleContainer = injectReducer(Constant.reducerKey.importRulesReducer, ImportRuleReducer)(withConnect);
