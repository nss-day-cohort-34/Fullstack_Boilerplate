import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { createSong } from '../../API/songManager';
import Song from '../MainView/Song/SongDetails'
import { Button, Icon } from 'semantic-ui-react'
import "./SongList.css"

//Rework this file (copy of Home.js) to do crud functionality on songs.

class SongList extends Component {


    render() {
        if (this.props.songs.length === 0) {
            return (
            <>
                <Button className="createButton" onClick={() => { this.props.history.push(`/home/songs/create`) }}><Icon name="plus"/></Button>          
            </>
            )
        }
        else {
            return (
                <>
                        <Button className="createButton" onClick={() => { this.props.history.push(`/home/songs/create`) }}><Icon name="plus"/></Button>
                        {this.props.songs.map(song => {
                            return (
                                <div className="songList" key={song.id}>
                                    <Link 
                                    to={`/home/songs/${song.id}`}>
                                        {song.title}
                                    </Link>
                                </div>
                        )
                    })}

                </>
            )
        }
    }
}

export default SongList;