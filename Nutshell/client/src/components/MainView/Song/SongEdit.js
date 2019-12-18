import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById, editSong } from '../../../API/songManager';
import { getAllWords } from '../../../API/wordManager';
import { getAllRhymingWords } from '../../../API/thirdPartyApiManager';
import { addCowriter } from '../../../API/cowriterManager';
import { Button, Icon, Modal } from 'semantic-ui-react'
import { debounce } from "debounce";
import Autosuggest from 'react-autosuggest';
import "./SongEdit.css"

// Imagine you have a list of languages that you'd like to autosuggest.
let words = []

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    return getAllWords().then(word => {
        words.push(word)
    })
        .then(() => {
            console.log(words)
            const inputValue = value.trim().toLowerCase();
            const inputLength = inputValue.length;
            const filteredWords = words[0].filter(word => word.name.toLowerCase().slice(0, inputLength) === inputValue);
            const filteredWordNames = filteredWords.map(word => {
                return word.name
            });
            console.log(filteredWordNames)
            return inputLength === 0 ? [] : filteredWordNames
        })
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion}
    </div>
);



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
        value: "",
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
        const foundSong = this.props.songs.find(s => s.id === this.state.songId)
        foundSong.title = this.state.title
        foundSong.lyrics = this.state.lyrics
        editSong(this.state.songId, foundSong).then(() => this.props.history.push(`/home/songs/${this.state.songId}`))
    }

    // handleConnect = id => {
    //     addCowriter(id)
    // }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = debounce(({ value }) => {
        getSuggestions(value)
            .then(filteredWordNames => {
                this.setState({
                    suggestions: filteredWordNames
                });
            })
    }, 2000);

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = debounce(() => {
        this.setState({
            suggestions: []
        });
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
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            value,
            onChange: this.onChange
        };
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

                    <Autosuggest
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        alwaysRenderSuggestions={true}
                    />

                    <textarea
                        className="songLyrics"
                        rows="29" cols="75"
                        type="text" id="lyrics"
                        onKeyUp={this.handleRhyming}
                        onChange={this.handleFieldChange}
                        value={this.state.lyrics}>
                    </textarea>
                    <div>
                        {this.state.aaVisable &&
                            <div>
                                <h4>A A</h4>
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
                        {this.state.abVisable &&
                            <div>
                                <h4>A B</h4>
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
                    </div>
                </div>
                <p></p>
            </>
        )
    }
}

export default SongEdit;