import React, { Component, FormattedMessage  } from 'react';
import { Link, Route } from 'react-router-dom';
import { getWords, getWordById, deleteWord } from '../../../API/wordManager';
import { Button, Icon, Modal } from 'semantic-ui-react'
import "./WordDetails.css"


class WordDetails extends Component {

    state = {
        name: "",
        definition: "",
        showDeleteModal: false
    }

    componentDidMount() {
        const wordId = parseInt(this.props.match.params.wordId)
        getWordById(wordId).then(word => this.setState({name: word.name, definition: word.definition}))
    }

    componentDidUpdate(oldProps) {
        const wordId = parseInt(this.props.match.params.wordId)
        const oldPropWordId = parseInt(oldProps.match.params.wordId)
        if (oldPropWordId !== wordId) {
            getWordById(wordId).then(word => this.setState({name: word.name, definition: word.definition}))
        }
    }

    handleDeleteWord = id => {
        deleteWord(id)
            .then(() => {
                this.props.updateWords()
            })
        this.props.history.push(`/home/lyricsFirst`)
    }

    openDeleteModal = () => this.setState({ showDeleteModal: true })
    closeDeleteModal = () => this.setState({ showDeleteModal: false })


    render() {    
        const wordId = parseInt(this.props.match.params.wordId)
                return (
                    <>
                        <div>
                            <div className="wordName">
                                {this.state.name}                                
                            </div>
                        </div>
                        <div className="definitionContainer">
                            <div className="definition">
                                Definition:
                            </div>
                            <div className="definitionOfWord">
                                {this.state.definition}
                            </div>
                        </div>
                        <Button className="deleteButton" onClick={() => { this.props.history.push(`/home/words/${wordId}/edit`) }}><Icon name="edit"/></Button>
                        <Modal onClose={this.closeDeleteModal} onOpen={this.openDeleteModal} open={this.state.showDeleteModal} trigger={<Button className="deleteButton"><Icon name="trash alternate outline" /></Button>} closeIcon>
                            <Modal.Header className="deleteModal">Delete "{this.state.name}"?</Modal.Header>
                            <Button attached onClick={() => this.handleDeleteWord(wordId)}>Delete</Button>
                        </Modal>
                    </>
                )
    }
}

export default WordDetails;