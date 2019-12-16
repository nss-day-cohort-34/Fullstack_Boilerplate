import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById, createSong } from '../../../API/songManager';
import { Button, Icon } from 'semantic-ui-react'
import "./SongCreate.css"
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
                <input className="songTitleCreate" type="text" id="title" placeholder="new song" autoComplete="off" onChange={this.handleFieldChange} value={this.state.title}></input>
                <p></p>
                <Button className="saveButton ui massive" onClick={this.handleSubmit}><Icon name="save"/></Button>
                <p></p>
                <textarea className="songLyricsCreate" rows="27" cols="75" type="text" id="lyrics" placeholder="lyrics" onChange={this.handleFieldChange} value={this.state.lyrics}></textarea>
            </>
        )
    }
}

export default SongCreate;