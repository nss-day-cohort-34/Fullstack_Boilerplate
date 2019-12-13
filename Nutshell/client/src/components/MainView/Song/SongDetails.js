import React, { Component, FormattedMessage  } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById, deleteSong } from '../../../API/songManager';
import { Button, Modal, Icon } from 'semantic-ui-react'
import "./Song.css"


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
        deleteSong(id)
            .then(() => {
                this.props.updateSongs()
            })
        this.props.history.push(`/home`)
    }

    openDeleteModal = () => this.setState({ showDeleteModal: true })
    closeDeleteModal = () => this.setState({ showDeleteModal: false })

    render() {    
        const songId = parseInt(this.props.match.params.songId)
                return (
                    <>
                        <div>
                            {this.state.title}
                        </div>
                        <div className ="lineBreaks">
                            {this.state.lyrics}
                        </div>
                        <Button onClick={() => { this.props.history.push(`/home/songs/${songId}/edit`) }}>Edit</Button>
                        <Modal onClose={this.closeDeleteModal} onOpen={this.openDeleteModal} open={this.state.showDeleteModal} trigger={<Button><Icon name="trash alternate outline" /></Button>} closeIcon>
                            <Modal.Header className="deleteModal">Delete "{this.state.title}"?</Modal.Header>
                            <Button attached onClick={() => this.handleDeleteSong(songId)}>Delete</Button>
                        </Modal>
                    </>
                )
    }
}

export default SongDetails;