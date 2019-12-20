import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById, editSong } from '../../../API/songManager';
import { deleteWord, createDataWord, getAllWords } from '../../../API/wordManager';
import { getAllRhymingWords } from '../../../API/thirdPartyApiManager';
import { addCowriter } from '../../../API/cowriterManager';
import { Button, Icon, Modal } from 'semantic-ui-react'
import { debounce } from "debounce";
import "./SongEdit.css"
import { getSuggestions } from "./GetSuggestionsFunc"

class SongEdit extends Component {

    state = {
        title: "",
        lyrics: "",
        songId: 0,
        showConnectModal: false,
        rhymingWords: [],
        rhymingWordsB: [],
        lineArray: [],
        aaVisable: false,
        abVisable: false,
        suggestions: []
    }

    componentDidMount() {
        const songId = parseInt(this.props.match.params.songId)
        getSongById(songId).then(song => this.setState({ title: song.title, lyrics: song.lyrics, songId: songId }))
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        getAllWords().then(words => {
            let matchingWords = []
            words.forEach(w => {
                if (w.definition === this.state.songId.toString() && w.visable === false) {
                    matchingWords.push(w)
                }
            });
            matchingWords.forEach(word => {
                deleteWord(word.id)
            });
        })
        const foundSong = this.props.songs.find(s => s.id === this.state.songId)
        foundSong.title = this.state.title
        foundSong.lyrics = this.state.lyrics
        const lyricsWithoutLineBreaks = this.state.lyrics.replace(/\n/g, " ")
        const wordArray = lyricsWithoutLineBreaks.split(" ")
        const wordSet = new Set(wordArray)       
        wordSet.forEach(word => {
            const newWord = {
                name: word,
                definition: `${this.state.songId}`
            }
            createDataWord(newWord)
        });
        editSong(this.state.songId, foundSong).then(() => {
            this.props.history.push(`/home/songs/${this.state.songId}`)
        })
    }

    // handleConnect = id => {
    //     addCowriter(id)
    // }

    // onChange = (event, { newValue }) => {
    //     this.setState({
    //         value: newValue
    //     });
    // };

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

    handleRhyming = debounce(() => {
        if (this.state.lyrics.includes("\n")) {
            const lineArray = this.state.lyrics.split("\n")
            const lastLineIndex = lineArray.length - 2
            const lineBeforeWordArray = lineArray[lastLineIndex].split(" ")
            const lastWordIndex = lineBeforeWordArray.length - 1
            if (this.state.lineArray.length !== lineArray.length) {
                this.setState({ lineArray: lineArray })
                getAllRhymingWords(lineBeforeWordArray[lastWordIndex]).then(rw => this.setState({ rhymingWords: rw, aaVisable: true }))
                if (lineArray.length > 2) {
                    const secondToLastLineIndex = lineArray.length - 3
                    const lineTwoBeforeWordArray = lineArray[secondToLastLineIndex].split(" ")
                    const lastWordOfSecondToLastLineIndex = lineTwoBeforeWordArray.length - 1
                    getAllRhymingWords(lineTwoBeforeWordArray[lastWordOfSecondToLastLineIndex]).then(rw => this.setState({ rhymingWordsB: rw, abVisable: true }))
                } else {
                    this.setState({ rhymingWordsB: [] })
                }
            }
        }
    }, 2000)

    openConnectModal = () => this.setState({ showConnectModal: true })
    closeConnectModal = () => this.setState({ showConnectModal: false })

    render() {
        const songId = parseInt(this.props.match.params.songId)
        return (
            <>
                <input className="songTitle" type="text" id="title" autoComplete="off" onChange={this.handleFieldChange} value={this.state.title}></input>
                <p></p>
                <div className="saveAndConnect">
                    <div>
                        <Button className="saveButton ui massive" onClick={this.handleSubmit}><Icon name="save" /></Button>
                    </div>
                    <Modal onClose={this.closeConnectModal} onOpen={this.openConnectModal} open={this.state.showConnectModal} trigger={<Button className="showButton connectButton ui massive"><Icon name="user" /></Button>} closeIcon>
                        <Modal.Header className="connectModal">Add Cowriter to "{this.state.title}"?</Modal.Header>
                        {/* <Button attached onClick={() => this.handleConnect(songId)}>Add</Button> */}
                    </Modal>
                </div>
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
                    <div>
                        <textarea
                            className="songLyrics"
                            rows="29" cols="75"
                            type="text" id="lyrics"
                            onKeyDown={this.onSuggestionsFetchRequested}
                            onKeyUp={this.handleRhyming}
                            onChange={this.handleFieldChange}
                            value={this.state.lyrics}>
                        </textarea>
                    </div>
                </div>
            </>
        )
    }
}

export default SongEdit;