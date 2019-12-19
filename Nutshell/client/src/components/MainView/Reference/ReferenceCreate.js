import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { createReference } from '../../../API/referenceManager';
import { Button, Icon } from 'semantic-ui-react'
import "./ReferenceCreate.css"


class ReferenceCreate extends Component {

    state = {
        name: "",
        url: "",
        typeOfReferenceId: 1
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        const newReference = {
            name: this.state.name,
            url: this.state.url,
            typeOfReferenceId: parseInt(this.state.typeOfReferenceId)
        }
        createReference(newReference).then(r => {
            this.props.updateReferences()
            this.props.history.push(`/home/references/${r[0].id}`)
        })
    }

    render() {
        return (
            <>
                <input className="referenceNameCreate" type="text" id="name" placeholder="new reference" autoComplete="off" onChange={this.handleFieldChange} value={this.state.name}></input>
                <p></p>
                <input className="referenceUrlCreate" type="text" id="url" placeholder="new url" autoComplete="off" onChange={this.handleFieldChange} value={this.state.url}></input>
                <p></p>
                <Button className="searchButton ui massive" onClick={this.handleSubmit}><Icon name="save" /></Button>
                <p></p>
                <select id="typeOfReferenceId" onChange={this.handleFieldChange} value={this.state.typeOfReferenceId}>
                    {this.props.referenceTypes.map(rt => {
                    return <option key={rt.name} value={rt.id}>{rt.name}</option>
                    })}
                </select>
            </>
        )
    }
}

export default ReferenceCreate;