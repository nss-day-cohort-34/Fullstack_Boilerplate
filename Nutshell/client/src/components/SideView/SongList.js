﻿import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById } from '../../API/songManager';
import Song from '../MainView/Song/SongDetails'

//Rework this file (copy of Home.js) to do crud functionality on songs.

class SongList extends Component {


    render() {
        if (this.props.songs.length === 0) {
            return <></>
        }
        else {
            return (
                <>

                    {this.props.songs.map(song => {
                        return (
                            <Link to={`/home/songs/${song.id}`}>
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