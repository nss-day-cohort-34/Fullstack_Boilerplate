import React, { Component } from 'react';
import { getSongs, getSongById } from '../API/songManager';
import { getWords, getWordById } from '../API/wordManager';
import { getTitles, getTitleById } from '../API/titleManager';
import { getReferences, getReferenceTypes } from '../API/referenceManager';
import SideViews from './SideView/SideViews';
import SongList from './SideView/SongList';
import WordList from './SideView/WordList';
import TitleList from './SideView/TitleList';
import ReferenceTypeList from './SideView/ReferenceTypeList';
import MainViews from './MainView/MainViews';
import { Button, Header, Form, Icon, Sidebar, Menu } from 'semantic-ui-react';
import "./Home.css";

class Home extends Component {
  state = {
    songs: [],
    words: [],
    titles: [],
    references: [],
    referenceTypes: [],
    visible: false,
    showCatalogue: false,
    showWords: false,
    showTitles: false,
    showReferences: false,
  }

  updateSongs = () => {
    getSongs()
      .then(songs => {
        this.setState({ songs: songs });
      });
  }

  updateWords = () => {
    getWords()
      .then(words => {
        this.setState({ words: words });
      });
  }

  updateTitles = () => {
    getTitles()
      .then(titles => {
        this.setState({ titles: titles });
      });
  }

  updateReferences = () => {
    getReferences()
      .then(references => {
        this.setState({ references: references });
      });
  }

  updateReferenceTypes = () => {
    getReferenceTypes()
      .then(referenceTypes => {
        this.setState({ referenceTypes: referenceTypes });
      });
  }

  componentDidMount() {
    this.updateSongs()
    this.updateWords()
    this.updateTitles()
    this.updateReferences()
    this.updateReferenceTypes()
  }

  handleClick = () => {
    this.setState({ visible: !this.state.visible })
  }

  showCatalogueOnClick = () => {
    this.setState({
      showCatalogue: true,
      showWords: false,
      showTitles: false,
      showReferences: false
    })
  }

  showWordsOnClick = () => {
    this.setState({
      showCatalogue: false,
      showWords: true,
      showTitles: false,
      showReferences: false
    })
  }

  showTitlesOnClick = () => {
    this.setState({
      showCatalogue: false,
      showWords: false,
      showTitles: true,
      showReferences: false
    })
  }

  showReferencesOnClick = () => {
    this.setState({
      showCatalogue: false,
      showWords: false,
      showTitles: false,
      showReferences: true
    })
  }

  render() {
    const { visible } = this.state
    return (
      <>
        <nav className="navBar">
          <Button className="showButton ui massive" onClick={this.handleClick}>
            <Icon name={this.state.visible
              ? "delete"
              : "bars"} />
          </Button>
          <div className="logoContainer">
              <div className="logo">Lyrics | First</div>
            </div>
        </nav>
        < Sidebar.Pushable >
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            vertical
            direction='left'
            visible={visible}
          // width='medium'
          >
            <div className="helloLogout">
              <div>
                Hello {this.props.user.username}
              </div>
              <Button onClick={this.props.logout}>Logout</Button>
            </div>
            <nav>
              <span><Button className="catalogueListButton" onClick={this.showCatalogueOnClick}>Catalogue</Button></span>
              <span>|</span>
              <span><Button className="wordListButton" onClick={this.showWordsOnClick}>Words</Button></span>
              <span>|</span>
              <span><Button className="titleListButton" onClick={this.showTitlesOnClick}>Titles</Button></span>
              <span>|</span>
              <span><Button className="referenceListButton" onClick={this.showReferencesOnClick}>References</Button></span>
            </nav>
            {this.state.showCatalogue && <SongList
              updateSongs={this.updateSongs}
              songs={this.state.songs}
              {...this.props}
            />}
            {this.state.showWords && <WordList
              updateWords={this.updateWords}
              words={this.state.words}
              {...this.props}
            />}
            {this.state.showTitles && <TitleList
              updateTitles={this.updateTitles}
              titles={this.state.titles}
              {...this.props}
            />}
            {this.state.showReferences && <ReferenceTypeList
              updateReferences={this.updateReferences}
              referenceTypes={this.state.referenceTypes}
              references={this.state.references}
              {...this.props}
            />}
          </Sidebar>
          <Sidebar.Pusher onClick={this.state.visible === true ? this.handleClick : undefined}>

            <div className="makeMainBig"></div>
            <MainViews
              user={this.props.user}
              words={this.state.words}
              updateWords={this.updateWords}
              songs={this.state.songs}
              updateSongs={this.updateSongs}
              titles={this.state.titles}
              updateTitles={this.updateTitles}
              references={this.state.references}
              updateReferences={this.updateReferences}
              referenceTypes={this.state.referenceTypes}
              {...this.props}
            />
          </Sidebar.Pusher>
        </Sidebar.Pushable >
      </>
    )

  }

}

export default Home;