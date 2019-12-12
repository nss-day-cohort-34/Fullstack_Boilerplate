import React, { Component, FormattedMessage  } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById } from '../../../API/songManager';
import { Button } from 'semantic-ui-react'
import "./Song.css"


class SongDetails extends Component {

    state = {
        title: "",
        lyrics: ""
    }

    componentDidMount() {
        const songId = parseInt(this.props.match.params.songId)
        getSongById(songId).then(song => this.setState({title: song.title, lyrics: song.lyrics}))
    }


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
                        <Button>Delete</Button>
                    </>
                )
    }
}

export default SongDetails;