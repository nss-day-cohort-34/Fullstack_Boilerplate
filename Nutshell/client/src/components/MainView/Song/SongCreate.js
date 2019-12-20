import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById, createSong } from '../../../API/songManager';
import { getAllRhymingWords } from '../../../API/thirdPartyApiManager';
import { createDataWord } from '../../../API/wordManager';
import { Button, Icon } from 'semantic-ui-react'
import { debounce } from "debounce";
import { getSuggestions } from "./GetSuggestionsFunc"
import "./SongCreate.css"
import "./Song.css"


class SongCreate extends Component {

    state = {
        title: "",
        lyrics: "",
        rhymingWords: [],
        rhymingWordsB: [],
        lineArray: [],
        aaVisable: false,
        abVisable: false,
        suggestions: []
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
        const lyricsWithoutLineBreaks = this.state.lyrics.replace(/\n/g, " ")
        const wordArray = lyricsWithoutLineBreaks.split(" ")
        const wordSet = new Set(wordArray)
        createSong(newSong).then(s => {
            this.props.updateSongs()
            wordSet.forEach(word => {
                const newWord = {
                    name: word,
                    definition: `${s[0].id}`
                }
                createDataWord(newWord)
            });
            this.props.updateWords()
            this.props.history.push(`/home/songs/${s[0].id}`)
        })
    }
   
    onSuggestionsFetchRequested = debounce(() => {
        const wordArray = this.state.lyrics.split(" ")
        const lastWordIndex = wordArray.length - 1
        const lastWord = wordArray[lastWordIndex]
        getSuggestions(lastWord)
            .then(filteredWordNames => {
                this.setState({
                    suggestions: filteredWordNames
                });
            })
    }, 2000);

    handleRhyming = debounce(event => {
        event.preventDefault()
        if (this.state.lyrics.includes("\n")) {
            const lineArray = this.state.lyrics.split("\n")
            const lastLineIndex = lineArray.length - 2
            const lineBeforeWordArray = lineArray[lastLineIndex].split(" ")
            const lastWordIndex = lineBeforeWordArray.length - 1
            if (this.state.lineArray.length !== lineArray.length) {
                this.setState({lineArray: lineArray})
                getAllRhymingWords(lineBeforeWordArray[lastWordIndex]).then(rw => this.setState({ rhymingWords: rw, aaVisable: true }))
                if (lineArray.length > 2) {
                    const secondToLastLineIndex = lineArray.length -3
                    const lineTwoBeforeWordArray = lineArray[secondToLastLineIndex].split(" ")
                    const lastWordOfSecondToLastLineIndex = lineTwoBeforeWordArray.length - 1
                    getAllRhymingWords(lineTwoBeforeWordArray[lastWordOfSecondToLastLineIndex]).then(rw => this.setState({rhymingWordsB: rw, abVisable: true}))
                } else {
                    this.setState({rhymingWordsB: []})
                }
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
                    {this.state.rhymingWords &&
                    <div>
                        <p>A A</p>
                        <div className="rhymingContainer">
                            {this.state.rhymingWords.map(rw => {
                                return (
                                    <div key={Math.random()}>
                                        {rw.word}
                                    </div>
                                )
                            })}
                        </div>
                    </div>}
                    {this.state.rhymingWordsB &&
                    <div>
                        <p>A B</p>
                        <div className="rhymingContainer">
                            {this.state.rhymingWordsB.map(rw => {
                                return (
                                    <div key={Math.random()}>
                                        {rw.word}
                                    </div>
                                )
                            })}
                        </div>
                    </div>}
                    {this.state.suggestions &&
                    <div>
                        <p>My Words</p>
                        <div className="rhymingContainer">
                            {this.state.suggestions.map(s => {
                                return (
                                    <div key={Math.random()}>
                                        {s}
                                    </div>
                                )
                            })}
                        </div>
                    </div>}

                    <textarea 
                        className="songLyricsCreate" 
                        rows="27" cols="75" 
                        type="text" id="lyrics" 
                        placeholder="lyrics" 
                        onKeyDown={this.onSuggestionsFetchRequested}
                        onKeyUp={this.handleRhyming} 
                        onChange={this.handleFieldChange} 
                        value={this.state.lyrics}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default SongCreate;