import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { createWord } from '../../../API/wordManager';
import { Button } from 'semantic-ui-react'
import { getWordInformation } from '../../../API/thirdPartyApiManager'


class WordCreate extends Component {

    state = {
        name: "",
        definition: "",
        synonyms: []
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        const newWord = {
            name: this.state.name,
            definition: this.state.definition,
            userId: null
        }
        createWord(newWord).then(w => {
            this.props.updateWords()
            this.props.history.push(`/home/words/${w.id}`)
        })
    }
    
    handleDefinitionSearch = event => {
        event.preventDefault()
        getWordInformation(this.state.name).then(w => {
            this.setState({definition: w.entries[0].lexemes[0].senses[0].definition})
            if (w.entries[0].lexemes[0].synonymSets != undefined){
                this.setState({synonyms: w.entries[0].lexemes[0].synonymSets[0].synonyms})
            } else {
                this.setState({synonyms: []})
            }
        })
    }

    render() {
        return (
            <>
                <h1>New Word</h1>
                <label htmlFor="">Word Name</label>
                <input type="text" id="name" onChange={this.handleFieldChange} value={this.state.name}></input>
                <Button onClick={this.handleDefinitionSearch}>Search Definition</Button>
                <p></p>
                <label htmlFor="">Definition</label>
                <textarea rows="15" cols="45" type="text" id="definition" onChange={this.handleFieldChange} value={this.state.definition}></textarea>
                <label htmlFor="">Synonyms</label>
                <textarea rows="15" cols="45" type="text" id="synonyms" onChange={this.handleFieldChange} value={this.state.synonyms}></textarea>
                {this.state.synonyms.forEach(s => {
                    return <p>{s}</p>
                })}
                <Button onClick={this.handleSubmit}>Save</Button>
            </>
        )
    }
}

export default WordCreate;