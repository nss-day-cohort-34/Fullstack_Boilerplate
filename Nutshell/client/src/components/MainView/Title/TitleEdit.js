import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getTitleById, editTitle } from '../../../API/titleManager';
import { Button, Icon } from 'semantic-ui-react'
import "./TitleEdit.css"


class TitleEdit extends Component {

    state = {
        name: "",
        titleId: 0
    }

    componentDidMount() {
        const titleId = parseInt(this.props.match.params.titleId)
        getTitleById(titleId).then(title => this.setState({ name: title.name, titleId: titleId }))
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        const foundTitle = this.props.titles.find(t => t.id === this.state.titleId)
        foundTitle.name = this.state.name
        editTitle(this.state.titleId, foundTitle).then(() => this.props.history.push(`/home/titles/${this.state.titleId}`))
    }

    render() {
        return (
            <>
                <input className="titleNameEdit" type="text" id="name" onChange={this.handleFieldChange} value={this.state.name}></input>
                <p></p>
                <Button className="saveButton ui massive" onClick={this.handleSubmit}><Icon name="save"/></Button>

            </>
        )
    }
}

export default TitleEdit;