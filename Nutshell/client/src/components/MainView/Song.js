import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getSongs, getSongById } from '../../API/songManager';

//Rework this file (copy of Home.js) to do crud functionality on songs.

class Song extends Component {


    render() { 
        {
            return (
                <>
                    <div>
                        {this.props.songs[0].title}
                    </div>
                </>
        )
        }
    }
}

export default Song;