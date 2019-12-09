import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getSongs, getSongById } from '../../API/songManager';

//Rework this file (copy of Home.js) to do crud functionality on songs.

class SongList extends Component {


    render() { 
        console.log(this.props.songs)
        if (this.props.songs.length === 0)
        {
            return <></>
        }
        else
        {
            return (
                <>
                    <ul>
                        {
                            this.props.songs.map(songs => <li><Link to="/songs">{songs.title}</Link></li>)
                        }
                    </ul>
                </>
        )
        }
    }
}

export default SongList;