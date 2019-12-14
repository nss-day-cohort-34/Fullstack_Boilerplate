import React, { Component } from 'react';
import { getSongs, getSongById } from '../API/songManager';
import { getWords, getWordById } from '../API/wordManager';
import { getTitles, getTitleById } from '../API/titleManager';
import SideViews from './SideView/SideViews';
import SongList from './SideView/SongList';
import WordList from './SideView/WordList';
import TitleList from './SideView/TitleList';
import MainViews from './MainView/MainViews';
import { Button, Header, Form, Icon, Sidebar, Menu } from 'semantic-ui-react';
import "./Home.css";
import Logo from "./LyricsFirstLogoCapture.png"

class Home extends Component {
  state = {
    songs: [],
    words: [],
    titles: [],
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

  componentDidMount() {
    this.updateSongs()
    this.updateWords()
    this.updateTitles()
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
            {this.state.showReferences && <SongList
              updateSongs={this.updateSongs}
              songs={this.state.songs}
              {...this.props}
            />}
          </Sidebar>
          <Sidebar.Pusher onClick={this.state.visible === true ? this.handleClick : undefined}>
            <div className="makeMainBig"><img className="logo" src={Logo}/></div>
            <MainViews
              words={this.state.words}
              updateWords={this.updateWords}
              songs={this.state.songs}
              updateSongs={this.updateSongs}
              {...this.props}
            />
          </Sidebar.Pusher>
        </Sidebar.Pushable >
      </>
    )

  }

}

export default Home;