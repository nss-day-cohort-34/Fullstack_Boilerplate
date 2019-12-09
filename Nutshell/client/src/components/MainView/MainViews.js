import { Route } from "react-router-dom";
import React, { Component } from "react";
import Song from "./Song";

export default class SideViews extends Component {

  render() {
    return (
      <>
        <Route exact path="/song" render={props => {
        return <Song {...this.props} />
        }} />
      </>
    );
  }
}