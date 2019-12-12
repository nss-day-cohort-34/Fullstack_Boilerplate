import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { createWord } from '../../../API/wordManager';
import { Button } from 'semantic-ui-react'
import { getDefinition } from '../../../API/thirdPartyApiManager'


class WordCreate extends Component {

    state = {
        name: "",
        definition: ""
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
        createWord(newWord) 
    }
    
    handleDefinitionSearch = event => {
        event.preventDefault()
        getDefinition(this.state.name).then(d => this.setState({definition: d.entries[0].lexemes[0].senses[0].definition}))
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
                <Button onClick={this.handleSubmit}>Save</Button>
            </>
        )
    }
}

export default WordCreate;