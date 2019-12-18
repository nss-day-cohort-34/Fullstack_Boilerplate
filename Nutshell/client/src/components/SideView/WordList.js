import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react'
import "./WordList.css"


//Rework this file (copy of Home.js) to do crud functionality on songs.

class WordList extends Component {


    render() {
        if (this.props.words.length === 0) {
            return (
            <>
                <Button className="createButton" onClick={() => { this.props.history.push(`/home/words/create`) }}><Icon name="add" /></Button>
            </>
            )
        }
        else {
            return (
                <>

                    <Button className="createButton" onClick={() => { this.props.history.push(`/home/words/create`) }}><Icon name="add" /></Button>
                    {this.props.words.map(word => {
                        return (
                            <div className="wordList" key={word.id}>
                                <Link
                                    to={`/home/words/${word.id}`}>
                                    {word.name}
                                </Link>
                            </div>
                        )
                    })}

                </>
            )
        }
    }
}

export default WordList;