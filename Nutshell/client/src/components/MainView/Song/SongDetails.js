import React, { Component, FormattedMessage  } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById, deleteSong } from '../../../API/songManager';
import { getAllWords, deleteWord } from '../../../API/wordManager';
import { Button, Modal, Icon } from 'semantic-ui-react'
import "./SongDetails.css"


class SongDetails extends Component {

    state = {
        title: "",
        lyrics: "",
        showDeleteModal: false
    }

    componentDidMount() {
        const songId = parseInt(this.props.match.params.songId)
        getSongById(songId).then(song => this.setState({title: song.title, lyrics: song.lyrics}))
    }

    componentDidUpdate(oldProps) {
        const songId = parseInt(this.props.match.params.songId)
        const oldPropSongId = parseInt(oldProps.match.params.songId)
        if (oldPropSongId !== songId) {
            getSongById(songId).then(song => this.setState({title: song.title, lyrics: song.lyrics}))
        }
    }

    handleDeleteSong = id => {
        getAllWords().then(words => {
            let matchingWords = []
            words.forEach(w => {
                if (w.definition === this.props.match.params.songId.toString() && w.visable === false) {
                    matchingWords.push(w)
                }
            });
            matchingWords.forEach(word => {
                deleteWord(word.id)
            });
        })
        deleteSong(id)
            .then(() => {
                this.props.updateSongs()
            })
        this.props.history.push(`/home/lyricsFirst`)
    }

    openDeleteModal = () => this.setState({ showDeleteModal: true })
    closeDeleteModal = () => this.setState({ showDeleteModal: false })

    render() {    
        const songId = parseInt(this.props.match.params.songId)
                return (
                    <>
                        <div className="songTitleDetails">
                            {this.state.title}
                        </div>
                        <Button className="editButton" onClick={() => { this.props.history.push(`/home/songs/${songId}/edit`) }}><Icon name="edit"/></Button>
                        <Modal onClose={this.closeDeleteModal} onOpen={this.openDeleteModal} open={this.state.showDeleteModal} trigger={<Button className="deleteButton"><Icon name="trash alternate outline" /></Button>} closeIcon>
                            <Modal.Header className="deleteModal">Delete "{this.state.title}"?</Modal.Header>
                            <Button attached onClick={() => this.handleDeleteSong(songId)}>Delete</Button>
                        </Modal>
                        <div className="lyricsContainer">
                        <div></div>
                        <div className ="lineBreaks songLyrics">
                            {this.state.lyrics}
                        </div>
                        <div></div>
                        </div>
                    </>
                )
    }
}

export default SongDetails;