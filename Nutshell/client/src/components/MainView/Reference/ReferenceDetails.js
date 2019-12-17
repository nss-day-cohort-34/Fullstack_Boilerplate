import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getReferences, getReferenceById, deleteReference } from '../../../API/referenceManager';
import { Button, Icon, Modal } from 'semantic-ui-react'
import "./ReferenceDetails.css"


class ReferenceDetails extends Component {

    state = {
        name: "",
        url: "",
        typeOfReferenceId: 0,
        showDeleteModal: false
    }

    componentDidMount() {
        const referenceId = parseInt(this.props.match.params.referenceId)
        getReferenceById(referenceId).then(reference => this.setState({ name: reference.name, url: reference.url, typeOfReferenceId: reference.typeOfReferenceId }))
    }

    componentDidUpdate(oldProps) {
        const referenceId = parseInt(this.props.match.params.referenceId)
        const oldPropReferenceId = parseInt(oldProps.match.params.referenceId)
        if (oldPropReferenceId !== referenceId) {
            getReferenceById(referenceId).then(reference => this.setState({ name: reference.name, url: reference.url, typeOfReferenceId: reference.typeOfReferenceId }))
        }
    }

    handleDeleteReference = id => {
        deleteReference(id)
            .then(() => {
                this.props.updateReferences()
            })
        this.props.history.push(`/home/lyricsFirst`)
    }

    openDeleteModal = () => this.setState({ showDeleteModal: true })
    closeDeleteModal = () => this.setState({ showDeleteModal: false })


    render() {
        const referenceId = parseInt(this.props.match.params.referenceId)
        return (
            <>
                <div className="referenceName">
                    {this.state.name}
                </div>
                <div className="referenceUrl">
                    <a target="_blank" href={this.state.url}>{this.state.url}</a>
                </div>

                <Button className="deleteButton" onClick={() => { this.props.history.push(`/home/references/${referenceId}/edit`) }}><Icon name="edit" /></Button>
                <Modal onClose={this.closeDeleteModal} onOpen={this.openDeleteModal} open={this.state.showDeleteModal} trigger={<Button className="deleteButton"><Icon name="trash alternate outline" /></Button>} closeIcon>
                    <Modal.Header className="deleteModal">Delete "{this.state.name}"?</Modal.Header>
                    <Button attached onClick={() => this.handleDeleteReference(referenceId)}>Delete</Button>
                </Modal>
            </>
        )
    }
}

export default ReferenceDetails;