import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById, createSong } from '../../../API/songManager';
import { getAllRhymingWords } from '../../../API/thirdPartyApiManager';
import { createWord } from '../../../API/wordManager';
import { Button, Icon } from 'semantic-ui-react'
import { debounce } from "debounce";
import "./SongCreate.css"
import "./Song.css"


class SongCreate extends Component {

    state = {
        title: "",
        lyrics: "",
        rhymingWords: [],
        rhymingWordsB: []
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        const newSong = {
            title: this.state.title,
            lyrics: this.state.lyrics
        }
        const wordArray = this.state.lyrics.split(" ")
        const wordSet = new Set(wordArray)
        createSong(newSong).then(s => {
            this.props.updateSongs()
            wordSet.forEach(word => {
                const newWord = {
                    name: word,
                    definition: `${s[0].id}`,
                    visable: false
                }
                createWord(newWord)
            });
            this.props.updateWords()
            this.props.history.push(`/home/songs/${s[0].id}`)
        })
    }

    handleRhyming = debounce(event => {
        event.preventDefault()
        if (this.state.lyrics.includes("\n")) {
            const lineArray = this.state.lyrics.split("\n")
            const lastLineIndex = lineArray.length - 2
            const lineBeforeWordArray = lineArray[lastLineIndex].split(" ")
            const lastWordIndex = lineBeforeWordArray.length - 1
            getAllRhymingWords(lineBeforeWordArray[lastWordIndex]).then(rw => this.setState({ rhymingWords: rw }))
            if (lineArray.length > 2) {
                const secondToLastLineIndex = lineArray.length -3
                const lineTwoBeforeWordArray = lineArray[secondToLastLineIndex].split(" ")
                const lastWordOfSecondToLastLineIndex = lineTwoBeforeWordArray.length - 1
                getAllRhymingWords(lineTwoBeforeWordArray[lastWordOfSecondToLastLineIndex]).then(rw => this.setState({rhymingWordsB: rw}))
            }
        }
    }, 2000)


    render() {
        return (
            <>
                <input className="songTitleCreate" type="text" id="title" placeholder="new song" autoComplete="off" onChange={this.handleFieldChange} value={this.state.title}></input>
                <p></p>
                <Button className="saveButton ui massive" onClick={this.handleSubmit}><Icon name="save" /></Button>
                <p></p>
                <div className="lyricsWithRhymes">

                    <textarea className="songLyricsCreate" rows="27" cols="75" type="text" id="lyrics" placeholder="lyrics" onKeyUp={this.handleRhyming} onChange={this.handleFieldChange} value={this.state.lyrics}></textarea>


                <div>
                    <div>
                        <h4>A A</h4>
                        <div className="rhymingContainer">
                            {this.state.rhymingWords.map(rw => {
                                return (
                                    <div>
                                        {rw.word}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h4>A B</h4>
                        <div className="rhymingContainer">
                            {this.state.rhymingWordsB.map(rw => {
                                return (
                                    <div>
                                        {rw.word}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

export default SongCreate;