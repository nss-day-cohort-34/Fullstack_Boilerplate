import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, Icon, Modal } from 'semantic-ui-react'
import { getAllWords } from "../../API/wordManager"
import { getSongs } from "../../API/songManager"
import "./HomeView.css"


class HomeView extends Component {

    state = {
        allWords: []
    }

    updateAllWords = () => {
        getAllWords()
            .then(words => {
                this.setState({ allWords: words })
            })
    }

    componentDidMount() {
        this.updateAllWords()
    }

    render() {
        return (
            <>
                <div className="mainContainer">
                    <h1 className="homeView">Welcome, {this.props.user.username}</h1>
                    <h2 className="homeView counter">You've written {this.state.allWords.length} unique words in {this.props.songs.length} songs</h2>
                </div> 
            </>
        )
    }
}

export default HomeView;