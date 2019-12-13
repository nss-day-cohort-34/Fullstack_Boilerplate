import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById, createSong } from '../../../API/songManager';
import { Button } from 'semantic-ui-react'
import "./Song.css"


class SongCreate extends Component {

    state = {
        title: "",
        lyrics: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        const newSong = {
            title: this.state.title,
            lyrics: this.state.lyrics
        }
        createSong(newSong).then(s => {
            this.props.updateSongs()
            this.props.history.push(`/home/songs/${s.id}`)
        })}


    render() {
        return (
            <>
                <h1>Create Song</h1>
                <label htmlFor="">Song Name</label>
                <input type="text" id="title" onChange={this.handleFieldChange} value={this.state.title}></input>
                <p></p>
                <label htmlFor="">Lyrics</label>
                <textarea rows="15" cols="45" type="text" id="lyrics" onChange={this.handleFieldChange} value={this.state.lyrics}></textarea>
                <Button onClick={this.handleSubmit}>Save</Button>
            </>
        )
    }
}

export default SongCreate;