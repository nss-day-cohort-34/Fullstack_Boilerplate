import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById } from '../../API/songManager';
import Song from '../MainView/Song/SongDetails'
import { Button } from 'semantic-ui-react'


//Rework this file (copy of Home.js) to do crud functionality on songs.

class WordList extends Component {


    render() {
        if (this.props.words.length === 0) {
            return <></>
        }
        else {
            return (
                <>

                        <Button onClick={() => { this.props.history.push(`/home/words/create`) }}>New Word</Button>
                        {this.props.words.map(word => {
                        return (
                            <Link to={`/home/words/${word.id}`}>
                                {word.name}
                            </Link>
                        )
                    })}

                </>
            )
        }
    }
}

export default WordList;