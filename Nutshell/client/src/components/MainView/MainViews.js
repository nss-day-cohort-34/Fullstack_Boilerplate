import { Route } from "react-router-dom";
import React, { Component } from "react";
import SongDetails from "./Song/SongDetails";
import SongEdit from "./Song/SongEdit";
import SongCreate from "./Song/SongCreate";
import WordDetails from "./Word/WordDetails";
import WordEdit from "./Word/WordEdit";

export default class MainViews extends Component {

  render() {
    return (
      <>
        <Route exact path="/home/songs/:songId(\d+)" render={(props) => {
          console.log("details view firing")
          return <SongDetails 
          key={this.props.songs.id}
          songs={this.props.songs}
          updateSongs={this.updateSongs}
          {...props} />
          }} />
        <Route exact path="/home/songs/:songId(\d+)/edit" render={(props) => {
          return <SongEdit
          key={this.props.songs.id}
          songs={this.props.songs}
          updateSongs={this.updateSongs}
          {...props} />
          }} />
        <Route exact path="/home/songs/create" render={(props) => {
          return <SongCreate
          songs={this.props.songs}
          updateSongs={this.updateSongs}
          {...props} />
          }} />
        <Route exact path="/home/words/:wordId(\d+)" render={(props) => {
          return <WordDetails 
          key={this.props.words.id}
          words={this.props.words}
          updateWords={this.updateWords}
          {...props} />
          }} />
        <Route exact path="/home/words/:wordId(\d+)/edit" render={(props) => {
          return <WordEdit
          key={this.props.words.id}
          words={this.props.words}
          updateWords={this.updateWords}
          {...props} />
          }} />
      </>
    );
  }
}