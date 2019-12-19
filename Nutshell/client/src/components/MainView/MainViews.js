import { Route } from "react-router-dom";
import React, { Component } from "react";
import SongDetails from "./Song/SongDetails";
import SongEdit from "./Song/SongEdit";
import SongCreate from "./Song/SongCreate";
import TitleDetails from "./Title/TitleDetails";
import TitleEdit from "./Title/TitleEdit";
import TitleCreate from "./Title/TitleCreate";
import WordDetails from "./Word/WordDetails";
import WordEdit from "./Word/WordEdit";
import WordCreate from "./Word/WordCreate";
import ReferenceDetails from "./Reference/ReferenceDetails";
import ReferenceEdit from "./Reference/ReferenceEdit";
import ReferenceCreate from "./Reference/ReferenceCreate";
import HomeView from "./HomeView";
import "./MainView.css"

export default class MainViews extends Component {

  render() {
    return (
      <>
        <div className="mainContainer">

          <Route exact path="/home/songs/:songId(\d+)" render={(props) => {
            console.log("details view firing")
            return <SongDetails
              key={this.props.songs.id}
              songs={this.props.songs}
              updateSongs={this.props.updateSongs}
              {...props} />
          }} />
          <Route exact path="/home/songs/:songId(\d+)/edit" render={(props) => {
            return <SongEdit
              key={this.props.songs.id}
              songs={this.props.songs}
              updateSongs={this.props.updateSongs}
              {...props} />
          }} />
          <Route exact path="/home/songs/create" render={(props) => {
            return <SongCreate
              songs={this.props.songs}
              updateSongs={this.props.updateSongs}
              updateWords={this.props.updateWords}
              {...props} />
          }} />
          <Route exact path="/home/words/:wordId(\d+)" render={(props) => {
            return <WordDetails
              key={this.props.words.id}
              words={this.props.words}
              updateWords={this.props.updateWords}
              {...props} />
          }} />
          <Route exact path="/home/words/:wordId(\d+)/edit" render={(props) => {
            return <WordEdit
              key={this.props.words.id}
              words={this.props.words}
              updateWords={this.props.updateWords}
              {...props} />
          }} />
          <Route exact path="/home/words/create" render={(props) => {
            return <WordCreate
              words={this.props.words}
              updateWords={this.props.updateWords}
              {...props} />
          }} />
          <Route exact path="/home/titles/:titleId(\d+)" render={(props) => {
            return <TitleDetails
              key={this.props.titles.id}
              titles={this.props.titles}
              updateTitles={this.props.updateTitles}
              {...props} />
          }} />
          <Route exact path="/home/titles/:titleId(\d+)/edit" render={(props) => {
            return <TitleEdit
              key={this.props.titles.id}
              titles={this.props.titles}
              updateTitles={this.props.updateTitles}
              {...props} />
          }} />
          <Route exact path="/home/titles/create" render={(props) => {
            return <TitleCreate
              titles={this.props.titles}
              updateTitles={this.props.updateTitles}
              {...props} />
          }} />
          <Route exact path="/home/references/:referenceId(\d+)" render={(props) => {
            return <ReferenceDetails
              key={this.props.references.id}
              references={this.props.references}
              updateReferences={this.props.updateReferences}
              {...props} />
          }} />
          <Route exact path="/home/references/:referenceId(\d+)/edit" render={(props) => {
            return <ReferenceEdit
              key={this.props.references.id}
              references={this.props.references}
              updateReferences={this.props.updateReferences}
              referenceTypes={this.props.referenceTypes}
              {...props} />
          }} />
          <Route exact path="/home/references/create" render={(props) => {
            return <ReferenceCreate
              references={this.props.references}
              updateReferences={this.props.updateReferences}
              referenceTypes={this.props.referenceTypes}
              {...props} />
          }} />
          <Route exact path="/home/lyricsFirst" render={(props) => {
            return <HomeView
              songs={this.props.songs}
              user={this.props.user}
              {...props} />
          }} />
        </div>
      </>
    );
  }
}