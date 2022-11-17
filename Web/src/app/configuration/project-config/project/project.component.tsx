//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { Constant, Url, TicketSystemType, EntityType, FunctionalCode } from '../../../utilities';
import { ComponentBase, ProjectModel, TicketModel, GitHubTicketConfigModel, StaticScanDetailModel, DynamicScanDetailModel } from '../../../shared';

import './project.scss';
import { ProjectForm } from './project-form';
import { ProjectFormModel } from './project-form/models';
import { ProjectPropModel, ProjectStaticScanTypeModel } from './models';
import { ProjectConstant } from './project.constant';
import { StaticScanInfoForm, StaticScanInfoFormModel } from './static-scan-info';
import { DynamicScanInfoForm, DynamicScanInfoFormModel } from './dynamic-scan-info';
import { TicketingSystemInfoForm, TicketingSystemInfoFormModel } from './ticketing-system-info';
import { UserMapSectionContainer, UserLocationInfoModel } from '../../config-shared';

//#endregion application imports

export class ProjectComponent extends ComponentBase<ProjectPropModel> {

    //#region model properties

    private projectId: number;

    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        if (this.hasLocationInfo) {

            //Verify if returned from user map screen
            let userLocationInfo: UserLocationInfoModel = this.locationInfo as UserLocationInfoModel;
            if (userLocationInfo.entityInfo) {
                if (userLocationInfo.entityInfo.showUserTab) {
                    this.onUserTabClick();
                }
                this.projectId = userLocationInfo.entityInfo.projectId;
            }
            else {
                this.projectId = this.locationInfo.projectId || 0;
            }
        }
        this.setComponentInfo(this.projectId && this.projectId > 0 ? FunctionalCode.EditProject : FunctionalCode.AddProject);
    }

    //#endregion constructor 

    //#region life cycle hooks

    /**
     * component did mount life cycle hook 
     */
    componentDidMount() {
        super.componentDidMount();
        this.props.dispatchFetchClients(this.handleApiFetchError.bind(this));
        this.props.dispatchFetchTicketSystemTypes(this.handleApiFetchError.bind(this));

        this.props.dispatchFetchProjectInfo(this.projectId, this.handleApiFetchError.bind(this));

        if (this.projectId && this.projectId > 0) {
            this.setEditStateDefaults();
        }
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                {this.renderPrevButton()}
                {this.renderProjectForm()}
                {this.renderTabs()}
            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods

    /**
     * sets edit state default values
     */
    public setEditStateDefaults() {
        this.props.dispatchFetchTicketingSystemInfo(this.projectId, this.handleApiFetchError.bind(this));
        this.props.dispatchFetchCodeAnalysisInfo(this.projectId, this.handleApiFetchError.bind(this));
        this.props.dispatchFetchAppAnalysisInfo(this.projectId, this.handleApiFetchError.bind(this));
        this.props.dispatchFetchRoleOptions();
        this.props.dispacthTabState(ProjectConstant.ticketSystem);
        super.setEditStateDefaults(FunctionalCode.EditProject);
    }


    /**
     * save project form button click event
     * @param formData
     */
    public onProjectSave(formData: ProjectFormModel) {
        let projectRequest: ProjectModel = new ProjectModel();
        projectRequest.clientId = formData.clientId;
        projectRequest.divisionId = formData.divisionId;
        projectRequest.name = formData.projectName;
        projectRequest.isActive = formData.isActive;
        projectRequest.id = formData.projectId;
        if (this.props.history.location?.state?.isRedirect) {
            this.props.dispatchSaveProject(projectRequest,
                (response) => {
                    this.projectId = response.data;
                    let projectInfo: ProjectFormModel = {
                        ...this.props.projectInfo,
                        ...formData,
                        projectId: response.data
                    };
                    this.props.dispatchSetProject(projectInfo);
                    this.handleApiSaveSuccess(response);
                    this.onFormSubmitSuccess(response);
                    this.props.history.replace(
                        {
                            state: { projectId: response.data, isRedirect: true }
                        }
                    );
                },
                this.handleApiSaveError.bind(this)
            );
        } else {
            this.props.history.push(
                {
                    state: { isRedirect: true }
                }
            );
        }
    }

    /**
     * on tab click 
     */
    public onTabClick(tab) {
        this.props.dispacthTabState(tab);
        this.props.dispatchHideAlert();

    }

    /**
     * on user tab click 
     */
    public onUserTabClick() {
        this.props.dispatchUserMapTabState(true);
        this.props.dispacthTabState(ProjectConstant.userMap);
    }

    /**
     * save ticket configuration form button click event
     * @param formData
     */
    public onTicketSystemSave(formData) {
        let ticketSystemRequest: TicketingSystemInfoFormModel = new TicketingSystemInfoFormModel();
        if (formData.type) {
            ticketSystemRequest.projectId = this.props.projectInfo.projectId;
            ticketSystemRequest.type = formData.type;
            ticketSystemRequest.id = formData.id;
            ticketSystemRequest.configuration = this.getTicketSystemConfiguration(formData);
            this.props.dispatchSaveTicketSystemInfo(ticketSystemRequest,
                (response) => {
                    this.handleApiSaveSuccess(response);
                    this.props.dispatchFetchTicketingSystemInfo(this.props.projectInfo.projectId, this.handleApiFetchError.bind(this));
                },
                this.handleApiSaveError.bind(this)
            );
        }
    }

    /**
     * save static scan form button click event
     * @param formData
     */
    public onStaticScanSave(formData: StaticScanInfoFormModel) {
        let staticScanRequest: StaticScanDetailModel = new StaticScanDetailModel();
        staticScanRequest.projectId = this.props.projectInfo.projectId;
        staticScanRequest.codeOrCodeURL = formData.codeOrCodeURL;
        staticScanRequest.userName = formData.staticScanUserName;
        staticScanRequest.password = formData.staticScanPassword;
        staticScanRequest.sourceCodeType = formData.sourceCodeTypeId;
        staticScanRequest.sourceControlType = formData.sourceControlTypeId;
        staticScanRequest.id = formData.staticScanId;
        staticScanRequest.isTokenBased = formData.isTokenBased;
        staticScanRequest.staticScanPreferences = formData.staticScanTypes.map(item => {
            return {
                staticScanTypeId: item
            };
        })
        staticScanRequest.projectPath = formData.projectPath;
        this.props.dispatchSaveCodeAnalysis(staticScanRequest,
            (response) => {
                this.handleApiSaveSuccess(response);
                this.props.dispatchFetchCodeAnalysisInfo(this.props.projectInfo.projectId, this.handleApiFetchError.bind(this));
            },
            this.handleApiSaveError.bind(this)
        );
    }

    /**
     * save dynamic scan form button click event
     * @param formData
     */
    public onDynamicScanSave(formData: DynamicScanInfoFormModel) {
        if (formData.scanPolicyId) {
            let projectScanPolicy: ProjectStaticScanTypeModel = new ProjectStaticScanTypeModel();
            projectScanPolicy.entityId = this.props.projectInfo.projectId;
            projectScanPolicy.entityTypeId = EntityType.Project;
            projectScanPolicy.scanPolicyId = formData.scanPolicyId;
            projectScanPolicy.hasStaticMapping = this.props.appAnalysisInfo?.hasStaticMapping;
            this.props.dispatchSaveScanPolicy(projectScanPolicy, this.handleApiFetchError.bind(this));
        }
        let dynamicScanRequest: DynamicScanDetailModel = new DynamicScanDetailModel();
        dynamicScanRequest.projectId = this.props.projectInfo.projectId;
        dynamicScanRequest.id = formData.id;
        dynamicScanRequest.applicationURL = formData.applicationURL;
        dynamicScanRequest.userName = formData.userName;
        dynamicScanRequest.password = formData.password;
        dynamicScanRequest.isTokenBased = formData.isTokenBased;
        this.props.dispatchSaveAppAnalysis(dynamicScanRequest,
            (response) => {
                this.handleApiSaveSuccess(response);
                this.props.dispatchFetchAppAnalysisInfo(this.props.projectInfo.projectId, this.handleApiFetchError.bind(this));
            },
            this.handleApiSaveError.bind(this)
        );
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders client form html 
     */
    private renderProjectForm() {
        if (this.props.projectInfo) {
            return (
                <div className="row">
                    <div className="col-12">
                        <ProjectForm onSubmit={this.onProjectSave.bind(this)} history={this.props.history} />
                    </div>
                </div>
            );
        }
        return (null);
    }

    /**
     * renders tab html  
     */
    private renderTabs() {
        if (this.isEditScreen && this.props.projectInfo) {
            return (
                <>
                    <ul className="nav nav-tabs horizontal-tab">
                        <li className="nav-item">
                            <button
                                className={this.props.showTab === ProjectConstant.ticketSystem ? 'nav-link active' : 'nav-link'}
                                onClick={this.onTabClick.bind(this, ProjectConstant.ticketSystem)}>
                                Ticket System Configuration
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={this.props.showTab === ProjectConstant.staticScan ? 'nav-link active' : 'nav-link'}
                                onClick={this.onTabClick.bind(this, ProjectConstant.staticScan)}>
                                Static Scan
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={this.props.showTab === ProjectConstant.dynamicScan ? 'nav-link active' : 'nav-link'}
                                onClick={this.onTabClick.bind(this, ProjectConstant.dynamicScan)}>
                                Dynamic Scan
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={this.props.showTab === ProjectConstant.userMap ? 'nav-link active' : 'nav-link'}
                                onClick={this.onUserTabClick.bind(this)}>
                                User Maps
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content horizontal-tab-content">
                        <div className="tab-pane active">
                            {this.TicketingSystemConfigurationDiv()}
                            {this.renderCodeAnalysisDiv()}
                            {this.renderAppAnalysisDiv()}
                            {this.renderUserMapTabContent()}
                        </div>

                    </div>
                </>
            );
        }
        return (null);
    }

    /**
     * renders ticketing system tab content 
     */
    private TicketingSystemConfigurationDiv() {
        if (this.props.showTab === ProjectConstant.ticketSystem) {
            return (
                <TicketingSystemInfoForm
                    onSubmit={this.onTicketSystemSave.bind(this)
                    }
                />
            );
        }
        return (null);
    }

    /**
     * renders static scan tab content 
     */
    private renderCodeAnalysisDiv() {
        if (this.props.showTab === ProjectConstant.staticScan) {
            return (
                <StaticScanInfoForm
                    entityId={this.props.projectInfo ? this.props.projectInfo.projectId : 0}
                    onSubmit={this.onStaticScanSave.bind(this)}
                    history={this.props.history}
                />
            );
        }
        return (null);
    }

    /**
     * renders static scan tab content 
     */
    private renderAppAnalysisDiv() {
        if (this.props.showTab === ProjectConstant.dynamicScan) {
            return (
                <DynamicScanInfoForm
                    entityId={this.props.projectInfo ? this.props.projectInfo.projectId : 0}
                    onSubmit={this.onDynamicScanSave.bind(this)
                    }
                />
            );
        }
        return (null);
    }

    /**
     * gets ticket sysyem configurations
     * @param formData
     */
    private getTicketSystemConfiguration(formData): TicketModel {
        switch (formData.type) {
            case TicketSystemType.GitHub:
                return this.getGitHubTicketSystemConfiguration(formData);
            default:
                return null;
        }
    }

    /**
     * renders user map tab content 
     */
    private renderUserMapTabContent() {
        if (this.props.showTab === ProjectConstant.userMap) {
            return (
                <UserMapSectionContainer
                    namespace={Constant.reducerKey.projectReducer}
                    history={this.props.history}
                    locationInfo={
                        {
                            entityId: this.props.projectInfo.projectId,
                            entityName: this.props.projectInfo.projectName,
                            entityInfo: { projectId: this.props.projectInfo.projectId, isEdit: true, showUserTab: true },
                            entityType: EntityType.Project,
                            prevPageUrl: Url.pageUrl.registerProjectPage,
                            roleOptions: this.props.roleOptions
                        }
                    }
                />
            );
        }
        return (null);
    }
    /**
     * gets github ticket configurations
     * @param formData
     */
    private getGitHubTicketSystemConfiguration(formData): GitHubTicketConfigModel {
        return {
            id: formData.ticketSystemConfigurationId,
            type: formData.type,
            username: formData.username,
            password: formData.password,
            isTokenBased: formData.isTokenBased,
            owner: formData.owner,
            name: formData.repositoryName,
            isEnterpriseAccount: formData.isEnterpriseAccount,
            enterpriseUrl: formData.enterpriseUrl
        }
    }

    //#endregion private methods
}