import { Route } from "react-router-dom";
import React, { Component } from "react";
import Song from "./Song";

export default class MainViews extends Component {

  render() {
    return (
      <>
        <Route exact path="/songs/:Id(\d+)" render={props => {
        return <Song 
        songs={this.props.songs}
        updateSongs={this.updateSongs}
        {...this.props} />
        }} />
      </>
    );
  }
}