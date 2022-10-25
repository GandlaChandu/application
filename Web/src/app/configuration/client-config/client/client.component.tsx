//#region react imports

import React from 'react';

//#endregion react imports

//#region application imports

import { Constant, Url, EntityType, Role, FunctionalCode } from '../../../utilities';
import {
    ClientModel,
    CardComponent,
    ComponentBase,
    PageRequestModel
} from '../../../shared';

import { ClientPropModel } from './models';

import './client.scss';
import { ClientForm } from './client-form';
import { DivisionSectionContainer } from './division-section';
import { QualityProfileSectionContainer, UserMapSectionContainer, UserLocationInfoModel } from '../../config-shared';

//#endregion application imports

export class ClientComponent extends ComponentBase<ClientPropModel> {

    //#region model properties

    private get client() {
        let userLocationInfo: UserLocationInfoModel = this.locationInfo as UserLocationInfoModel;

        //Verify if returned from user map screen
        let client = userLocationInfo?.entityInfo ?
            userLocationInfo.entityInfo.client :
            this.locationInfo?.isEdit ? this.locationInfo?.client : null;
        return client;
    }

    //#endregion model properties

    //#region constructor

    constructor(props) {
        super(props);
        this.setComponentInfo(this.client ? FunctionalCode.EditClient : FunctionalCode.AddClient);
    }

    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
        super.componentDidMount();

        if (this.client) {
            this.setEditStateDefaults();
            this.props.dispatchSetClient(this.client);
            this.props.dispatchFetchDynamicPolicy(this.client, this.handleApiFetchError.bind(this));
        }
        else {
            this.props.dispatchSetEditMode(false);
            this.props.dispatchSetClient(new ClientModel());
        }
    }

    /**
     * renders html for component 
     */
    render() {
        return (
            <>
                {this.renderPrevButton()}
                {this.renderClientForm()}
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
        super.setEditStateDefaults(FunctionalCode.EditClient);
        this.props.dispatchDivisionTabState(true);
    }

    /**
     * on save client btn click callback
     * @param formData
     */
    public onClientFormSubmit(formData) {

        let client: ClientModel = { ...formData, id: this.props.client.id };
        this.props.dispatchSaveClient(
            client,
            (response) => {
                //for edit mode, response data is boolean
                if (!isNaN(Number(response.data?.toString()))) {
                    client.id = response.data;
                }
                this.onFormSubmitSuccess(response, { client: client, isEdit: true });
                this.props.dispatchSetClient(client);
                this.props.dispatchFetchDivisions(this.props.client?.id, new PageRequestModel(), this.handleApiFetchError.bind(this));

            },
            this.handleApiSaveError.bind(this)
        );
    }

    /**
     * on division tab click 
     */
    public onDivisionTabClick() {
        this.props.dispatchDivisionTabState(true);
    }

    /**
     * on quality profile tab click 
     */
    public onQualityProfileTabClick() {
        this.props.dispatchQualityProfileTabState(true);
    }

    /**
     * on user map tab click 
     */
    public onUserMapTabClick() {
        this.props.dispatchUserMapTabState(true);
    }

    //#endregion events callbacks/public methods

    //#region private methods

    /**
     * renders client form html 
     */
    private renderClientForm() {
        if (this.props.client) {
            return (
                <div className="row">
                    <div className="col-12">
                        <CardComponent content=
                            {
                                <ClientForm onSubmit={this.onClientFormSubmit.bind(this)} />
                            }
                        >
                        </CardComponent>
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
        if (this.isEditScreen) {
            return (
                <>
                    <ul className="nav nav-tabs horizontal-tab" role="tablist">
                        <li className="nav-item">
                            <button role="tab"
                                className={this.props.showDivisionTab ? 'nav-link active' : 'nav-link'}
                                onClick={this.onDivisionTabClick.bind(this)}>
                                Divisions
                        </button>
                        </li>
                        <li className="nav-item">
                            <button role="tab"
                                className={this.props.showQualityProfileTab ? 'nav-link active' : 'nav-link'}
                                onClick={this.onQualityProfileTabClick.bind(this)}>
                                Quality Profiles
                             </button>
                        </li>
                        <li className="nav-item">
                            <button role="tab"
                                className={this.props.showUserTab ? 'nav-link active' : 'nav-link'}
                                onClick={this.onUserMapTabClick.bind(this)}>
                                User Maps
                             </button>
                        </li>
                    </ul>
                    <div className="tab-content horizontal-tab-content">
                        <div className="tab-pane active">
                            {this.renderDivisionTabContent()}
                            {this.renderQualityProfileTabContent()}
                            {this.renderUserMapTabContent()}
                        </div>
                    </div>
                </>
            );
        }
        return (null);
    }

    /**
     * renders division tab content 
     */
    private renderDivisionTabContent() {
        if (this.props.client) {
            return (<DivisionSectionContainer client={this.props.client} />);
        }
        return (null);
    }

    /**
     * renders quality profile tab content 
     */
    private renderQualityProfileTabContent() {
        if (this.props.client) {
            return (
                <QualityProfileSectionContainer
                    namespace={Constant.reducerKey.clientReducer}
                    entityType={EntityType.Client}
                    entityId={this.props.client.id}
                />
            );
        }
        return (null);
    }

    /**
     * renders user map tab content 
     */
    private renderUserMapTabContent() {
        if (this.props.client) {
            return (
                <UserMapSectionContainer
                    namespace={Constant.reducerKey.clientReducer}
                    history={this.props.history}
                    locationInfo={
                        {
                            entityId: this.props.client.id,
                            entityName: this.props.client.name,
                            entityInfo: { client: this.props.client, isEdit: true, showUserTab: true },
                            entityType: EntityType.Client,
                            defaultRole: Role.ClientAdmin,
                            prevPageUrl: Url.pageUrl.addEditCientPage
                        }
                    }
                />
            );
        }
        return (null);
    }

    //#endregion private methods
}