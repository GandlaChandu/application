//#region react imports

import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//#endregion react imports

//#region application imports

import './popup.scss';
import { PopupPropModel } from './models/popup-prop.model';

//#endregion application imports

export class PopupComponent extends React.Component<PopupPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    /**
    * renders html for component 
    */
    render() {
        return (
            <>
                <Modal isOpen={this.props.open}
                    centered={true}
                    scrollable={this.props.scrollable}
                    size={this.props.size}
                    className={this.props.dialogClassName}
                >
                    {this.renderTitle()}
                    {this.renderBody()}
                    {this.renderFooter()}
                </Modal>

            </>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion event callbacks/public methods

    //#region private methods

    /**
     * renders popup title 
     */
    private renderTitle() {
        if (this.props.popupHeader || this.props.closeHandler) {
            return (
                <ModalHeader toggle={this.props.closeHandler}>
                    {this.props.popupHeader}
                </ModalHeader>
            );
        }
        return (null);
    }

    /**
     * renders popup content 
     */
    private renderBody() {
        if (this.props.popupContent) {
            return (
                <ModalBody>
                    {this.props.popupContent}
                </ModalBody>
            );
        }
        return (null);
    }

    /**
     * renders popup footer 
     */
    private renderFooter() {
        if (this.props.popupFooter) {
            return (
                <ModalFooter>
                    {this.props.popupFooter}
                </ModalFooter>
            );
        }
        return (null);
    }

    //#endregion private methods
}