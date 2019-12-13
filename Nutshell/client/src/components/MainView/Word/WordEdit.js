import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getWordById, editWord } from '../../../API/wordManager';
import { Button } from 'semantic-ui-react'


class WordEdit extends Component {

    state = {
        name: "",
        definition: "",
        wordId: 0
    }

    componentDidMount() {
        const wordId = parseInt(this.props.match.params.wordId)
        getWordById(wordId).then(word => this.setState({name: word.name, definition: word.definition, wordId: wordId}))
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        const foundWord = this.props.words.find(w => w.id === this.state.wordId)
        foundWord.name = this.state.name
        foundWord.definition = this.state.definition
        editWord(this.state.wordId, foundWord).then(() => this.props.history.push(`/home/words/${this.state.wordId}`)) 
    }

    render() {
        return (
            <>
                <h1>Edit Word</h1>
                <label htmlFor="">Word Name</label>
                <input type="text" id="name" onChange={this.handleFieldChange} value={this.state.name}></input>
                <p></p>
                <label htmlFor="">Definition</label>
                <textarea rows="15" cols="45" type="text" id="definition" onChange={this.handleFieldChange} value={this.state.definition}></textarea>
                <Button onClick={this.handleSubmit}>Save</Button>
            </>
        )
    }
}

export default WordEdit;