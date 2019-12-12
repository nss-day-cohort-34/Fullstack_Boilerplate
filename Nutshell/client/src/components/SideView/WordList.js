import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById } from '../../API/songManager';
import Song from '../MainView/Song/SongDetails'

//Rework this file (copy of Home.js) to do crud functionality on songs.

class WordList extends Component {


    render() {
        if (this.props.words.length === 0) {
            return <></>
        }
        else {
            return (
                <>

                    {this.props.words.map(word => {
                        return (
                            <div>
                                {word.name}
                            </div>
                        )
                    })}

                </>
            )
        }
    }
}

export default WordList;