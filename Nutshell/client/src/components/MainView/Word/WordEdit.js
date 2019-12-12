// import React, { Component, FormattedMessage } from 'react';
// import { Link, Route } from 'react-router-dom';
// import { getSongs, getSongById, editSong } from '../../../API/songManager';
// import { Button } from 'semantic-ui-react'
// import "./Song.css"


// class SongEdit extends Component {

//     state = {
//         title: "",
//         lyrics: "",
//         songId: 0
//     }

//     componentDidMount() {
//         const songId = parseInt(this.props.match.params.songId)
//         getSongById(songId).then(song => this.setState({title: song.title, lyrics: song.lyrics, songId: songId}))
//     }

//     handleFieldChange = evt => {
//         const stateToChange = {}
//         stateToChange[evt.target.id] = evt.target.value
//         this.setState(stateToChange)
//     }

//     handleSubmit = event => {
//         event.preventDefault()
//         const foundSong = this.props.songs.find(s => s.id === this.state.songId)
//         foundSong.title = this.state.title
//         foundSong.lyrics = this.state.lyrics
//         editSong(this.state.songId, foundSong).then(() => this.props.history.push(`/home/songs/${this.state.songId}`)) 
//     }

//     render() {
//         return (
//             <>
//                 <h1>Edit Song</h1>
//                 <label htmlFor="">Song Name</label>
//                 <input type="text" id="title" onChange={this.handleFieldChange} value={this.state.title}></input>
//                 <p></p>
//                 <label htmlFor="">Lyrics</label>
//                 <textarea rows="15" cols="45" type="text" id="lyrics" onChange={this.handleFieldChange} value={this.state.lyrics}></textarea>
//                 <Button outline color="dark" size="sm" onClick={this.handleSubmit}>Save</Button>
//             </>
//         )
//     }
// }

// export default SongEdit;