import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { createSong } from '../../API/songManager';
import Song from '../MainView/Song/SongDetails'
import { Button } from 'semantic-ui-react'

//Rework this file (copy of Home.js) to do crud functionality on songs.

class SongList extends Component {


    render() {
        if (this.props.songs.length === 0) {
            return <></>
        }
        else {
            return (
                <>
                        <Button onClick={() => { this.props.history.push(`/home/songs/create`) }}>Create New Song</Button>
                        {this.props.songs.map(song => {
                            return (
                            <Link 
                            key={song.id}
                            to={`/home/songs/${song.id}`}>
                                {song.title}
                            </Link>
                        )
                    })}

                </>
            )
        }
    }
}

export default SongList;