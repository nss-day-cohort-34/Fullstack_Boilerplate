import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { createWord } from '../../../API/wordManager';
import { Button, Icon } from 'semantic-ui-react'
import { getWordInformation } from '../../../API/thirdPartyApiManager'
import { debounce } from "debounce";
import "./WordCreate.css"


class WordCreate extends Component {

    state = {
        name: "",
        definition: "",
        synonyms: []
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        const newWord = {
            name: this.state.name,
            definition: this.state.definition,
            visable: true
        }
        createWord(newWord).then(w => {
            console.log(w)
            this.props.updateWords()
            this.props.history.push(`/home/words/${w[0].id}`)
        })
    }
    
    handleDefinitionSearch = debounce(event => {
        event.preventDefault()
        if (this.state.name.length > 0) {
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
                    this.setState({definition: "", synonyms: []})
                }
            })
        }
    }, 2000)

    render() {
        return (
            <>
                <input className="wordNameCreate" type="text" id="name" placeholder="new word" autoComplete="off" onChange={this.handleFieldChange} onKeyUp={this.handleDefinitionSearch} value={this.state.name}></input>
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