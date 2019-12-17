import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getReferenceById, editReference } from '../../../API/referenceManager';
import { Button, Icon } from 'semantic-ui-react'
import "./ReferenceEdit.css"


class ReferenceEdit extends Component {

    state = {
        name: "",
        url: "",
        typeOfReferenceId: 0,
        referenceId: 0
    }

    componentDidMount() {
        const referenceId = parseInt(this.props.match.params.referenceId)
        getReferenceById(referenceId).then(reference => this.setState({ 
            name: reference.name, 
            url: reference.url, 
            typeOfReferenceId: reference.typeOfReferenceId, 
            referenceId: referenceId 
        }))
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        const foundReference = this.props.references.find(r => r.id === this.state.referenceId)
        foundReference.name = this.state.name
        foundReference.url = this.state.url
        foundReference.typeOfReferenceId = parseInt(this.state.typeOfReferenceId)
        editReference(this.state.referenceId, foundReference).then(() => this.props.history.push(`/home/references/${this.state.referenceId}`))
    }

    render() {
        return (
            <>
                <input autoComplete="off" className="referenceNameEdit" type="text" id="name" onChange={this.handleFieldChange} value={this.state.name}></input>
                <p></p>
                <input autoComplete="off" className="referenceUrlEdit" type="text" id="url" onChange={this.handleFieldChange} value={this.state.url}></input>
                <p></p>
                <select id="typeOfReferenceId" onChange={this.handleFieldChange} value={this.state.typeOfReferenceId}>
                    {this.props.referenceTypes.map(rt => {
                    return <option value={rt.id}>{rt.name}</option>
                    })}
                </select>
                <p></p>
                    <Button className="saveButton ui massive" onClick={this.handleSubmit}><Icon name="save"/></Button>

            </>
        )
    }
}

export default ReferenceEdit;