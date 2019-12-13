import React, { Component, FormattedMessage  } from 'react';
import { Link, Route } from 'react-router-dom';
import { getWords, getWordById } from '../../../API/wordManager';
import { Button } from 'semantic-ui-react'


class WordDetails extends Component {

    state = {
        name: "",
        definition: ""
    }

    componentDidMount() {
        const wordId = parseInt(this.props.match.params.wordId)
        getWordById(wordId).then(word => this.setState({name: word.name, definition: word.definition}))
    }

    componentDidUpdate(oldProps) {
        const wordId = parseInt(this.props.match.params.wordId)
        const oldPropWordId = parseInt(oldProps.match.params.wordId)
        if (oldPropWordId !== wordId) {
            getWordById(wordId).then(word => this.setState({name: word.name, definition: word.definition}))
        }
    }


    render() {    
        const wordId = parseInt(this.props.match.params.wordId)
                return (
                    <>
                        <div>
                            {this.state.name}
                        </div>
                        <div>
                            {this.state.definition}
                        </div>
                        <Button onClick={() => { this.props.history.push(`/home/words/${wordId}/edit`) }}>Edit</Button>
                        <Button>Delete</Button>
                    </>
                )
    }
}

export default WordDetails;