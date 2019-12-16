import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { createWord } from '../../../API/wordManager';
import { Button, Icon } from 'semantic-ui-react'
import { getWordInformation } from '../../../API/thirdPartyApiManager'
import "./WordCreate.css"


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
            if (w.entries.length > 0) {
                console.log(w)
                this.setState({definition: w.entries[0].lexemes[0].senses[0].definition})
                if (w.entries[0].lexemes[0].synonymSets != undefined){
                    this.setState({synonyms: w.entries[0].lexemes[0].synonymSets[0].synonyms})
                } else {
                    this.setState({synonyms: []})
                }
            }
            else{
                console.log("not a recognized word")
                this.setState({name: "", definition: "", synonyms: []})
            }
        })
    }

    render() {
        return (
            <>
                <input className="wordNameCreate" type="text" id="name" placeholder="search new word" autoComplete="off" onChange={this.handleFieldChange} value={this.state.name}></input>
                <Button className="searchButton ui massive" onClick={this.handleDefinitionSearch}><Icon name="search"/></Button>
                <p></p>
                <Button className="searchButton ui massive" onClick={this.handleSubmit}><Icon name="save"/></Button>
                <p></p>
                <textarea className="definitionCreate" rows="15" cols="45" type="text" id="definition" placeholder="definition" onChange={this.handleFieldChange} value={this.state.definition}></textarea>
                <p></p>
                <textarea readOnly className ="synonymsCreate" rows="15" cols="45" type="text" id="synonyms" onChange={this.handleFieldChange} value={this.state.synonyms}></textarea>
                {this.state.synonyms.forEach(s => {
                    return <p>{s}</p>
                })}
            </>
        )
    }
}

export default WordCreate;