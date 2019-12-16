import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById, editSong } from '../../../API/songManager';
import { addCowriter } from '../../../API/cowriterManager';
import { Button, Icon, Modal } from 'semantic-ui-react'
import "./SongEdit.css"


class SongEdit extends Component {

    state = {
        title: "",
        lyrics: "",
        songId: 0,
        showConnectModal: false
    }

    componentDidMount() {
        const songId = parseInt(this.props.match.params.songId)
        getSongById(songId).then(song => this.setState({ title: song.title, lyrics: song.lyrics, songId: songId }))
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        const foundSong = this.props.songs.find(s => s.id === this.state.songId)
        foundSong.title = this.state.title
        foundSong.lyrics = this.state.lyrics
        editSong(this.state.songId, foundSong).then(() => this.props.history.push(`/home/songs/${this.state.songId}`))
    }

    // handleConnect = id => {
    //     addCowriter(id)
    // }

    openConnectModal = () => this.setState({ showConnectModal: true })
    closeConnectModal = () => this.setState({ showConnectModal: false })

    render() {
        const songId = parseInt(this.props.match.params.songId)
        return (
            <>
                <input className="songTitle" type="text" id="title" autoComplete="off" onChange={this.handleFieldChange} value={this.state.title}></input>
                <p></p>
                <div className="saveAndConnect">
                    <div>
                        <Button className="saveButton ui massive" onClick={this.handleSubmit}><Icon name="save" /></Button>
                    </div>
                    <Modal onClose={this.closeConnectModal} onOpen={this.openConnectModal} open={this.state.showConnectModal} trigger={<Button className="showButton connectButton ui massive"><Icon name="user" /></Button>} closeIcon>
                        <Modal.Header className="connectModal">Add Cowriter to "{this.state.title}"?</Modal.Header>
                        {/* <Button attached onClick={() => this.handleConnect(songId)}>Add</Button> */}
                    </Modal>                    
                </div>
                <textarea className="songLyrics" rows="29" cols="75" type="text" id="lyrics" onChange={this.handleFieldChange} value={this.state.lyrics}></textarea>
                <p></p>
            </>
        )
    }
}

export default SongEdit;