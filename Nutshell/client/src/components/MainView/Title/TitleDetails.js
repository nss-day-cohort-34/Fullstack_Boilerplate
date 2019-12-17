import React, { Component, FormattedMessage  } from 'react';
import { Link, Route } from 'react-router-dom';
import { getTitles, getTitleById, deleteTitle } from '../../../API/titleManager';
import { Button, Icon, Modal } from 'semantic-ui-react'
import "./TitleDetails.css"


class TitleDetails extends Component {

    state = {
        name: "",
        showDeleteModal: false
    }

    componentDidMount() {
        const titleId = parseInt(this.props.match.params.titleId)
        getTitleById(titleId).then(title => this.setState({name: title.name}))
    }

    componentDidUpdate(oldProps) {
        const titleId = parseInt(this.props.match.params.titleId)
        const oldPropTitleId = parseInt(oldProps.match.params.titleId)
        if (oldPropTitleId !== titleId) {
            getTitleById(titleId).then(title => this.setState({name: title.name}))
        }
    }

    handleDeleteTitle = id => {
        deleteTitle(id)
            .then(() => {
                this.props.updateTitles()
            })
        this.props.history.push(`/home/lyricsFirst`)
    }

    openDeleteModal = () => this.setState({ showDeleteModal: true })
    closeDeleteModal = () => this.setState({ showDeleteModal: false })


    render() {    
        const titleId = parseInt(this.props.match.params.titleId)
                return (
                    <>
                        <div>
                            <div className="titleName">
                                {this.state.name}                                
                            </div>
                        </div>
                        <Button className="deleteButton" onClick={() => { this.props.history.push(`/home/titles/${titleId}/edit`) }}><Icon name="edit"/></Button>
                        <Modal onClose={this.closeDeleteModal} onOpen={this.openDeleteModal} open={this.state.showDeleteModal} trigger={<Button className="deleteButton"><Icon name="trash alternate outline" /></Button>} closeIcon>
                            <Modal.Header className="deleteModal">Delete "{this.state.name}"?</Modal.Header>
                            <Button attached onClick={() => this.handleDeleteTitle(titleId)}>Delete</Button>
                        </Modal>
                    </>
                )
    }
}

export default TitleDetails;