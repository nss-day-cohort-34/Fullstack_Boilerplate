import { Route } from "react-router-dom";
import React, { Component } from "react";
import SongDetails from "./Song/SongDetails";
import SongEdit from "./Song/SongEdit";

export default class MainViews extends Component {

  render() {
    return (
      <>
        <Route exact path="/home/songs/:songId(\d+)" render={(props) => {
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
      </>
    );
  }
}