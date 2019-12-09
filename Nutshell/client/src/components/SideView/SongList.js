import React, { Component } from 'react';
import { getSongs, getSongById } from '../../API/songManager';

//Rework this file (copy of Home.js) to do crud functionality on songs.

class SongList extends Component {
    state = {
        songs: [],
    }

    componentDidMount() {
        getSongs().then(songs => this.setState({songs: songs}))
    }

    render() {
        console.log(this.state.songs)
        if (this.state.songs.length === 0)
        {
            return <></>
        }
        else
        {
            return (
                <>
                    <ul>
                        {
                            this.state.values.map(songs => <li>{songs.title}</li>)
                        }
                    </ul>
                </>
        )
        }
    }
}

export default SongList;