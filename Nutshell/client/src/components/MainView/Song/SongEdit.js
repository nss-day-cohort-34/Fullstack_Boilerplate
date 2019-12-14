import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById, editSong } from '../../../API/songManager';
import { Button } from 'semantic-ui-react'
import "./SongEdit.css"


class SongEdit extends Component {

    state = {
        title: "",
        lyrics: "",
        songId: 0
    }

    componentDidMount() {
        const songId = parseInt(this.props.match.params.songId)
        getSongById(songId).then(song => this.setState({title: song.title, lyrics: song.lyrics, songId: songId}))
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        const foundSong = this.props.songs.find(s => s.id === this.state.songId)
        foundSong.title = this.state.title
        foundSong.lyrics = this.state.lyrics
        editSong(this.state.songId, foundSong).then(() => this.props.history.push(`/home/songs/${this.state.songId}`)) 
    }

    render() {
        return (
            <>
                <input className="songTitle" type="text" id="title" autoComplete="off" onChange={this.handleFieldChange} value={this.state.title}></input>
                <p></p>
                <div>
                <Button className="saveButton" onClick={this.handleSubmit}>Save</Button>
                </div>
                <textarea className="songLyrics" rows="29" cols="75" type="text" id="lyrics" onChange={this.handleFieldChange} value={this.state.lyrics}></textarea>
                <p></p>
            </>
        )
    }
}

export default SongEdit;