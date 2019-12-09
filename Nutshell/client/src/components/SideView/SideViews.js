import { Route } from "react-router-dom";
import React, { Component } from "react";
import SongList from "./SongList";

class SideViews extends Component {

  render() {
    return (
      <>
        <Route exact path="/songs" render={() => {
        return <SongList {...this.props} />
        }} />
      </>
    );
  }
}

export default SideViews