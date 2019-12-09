import { Route } from "react-router-dom";
import React, { Component } from "react";
import SongList from "./SongList";

class SideViews extends Component {

  render() {
    return (
      <>
        <Route exact path="/songs" render={props => {
        return <SongList 
        songs={this.props.songs}
        updateSongs={this.props.updateSongs}
        {...this.props} 
        />
        }} />
      </>
    );
  }
}

export default SideViews