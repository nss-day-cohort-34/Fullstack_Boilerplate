import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, Icon, Modal } from 'semantic-ui-react'
import { getDataWords } from "../../API/wordManager"
import { getSongs } from "../../API/songManager"
import "./HomeView.css"


class HomeView extends Component {

    state = {
        dataWords: []
    }

    updateDataWords = () => {
        getDataWords()
            .then(words => {
                this.setState({ dataWords: words })
            })
    }

    componentDidMount() {
        this.updateDataWords()
    }

    render() {
        return (
            <>
                <div className="mainContainer">
                    <h1 className="homeView">Welcome, {this.props.user.username}</h1>
                    <h2 className="homeView counter">You've written {this.state.dataWords.length} unique words in {this.props.songs.length} songs</h2>
                </div> 
            </>
        )
    }
}

export default HomeView;