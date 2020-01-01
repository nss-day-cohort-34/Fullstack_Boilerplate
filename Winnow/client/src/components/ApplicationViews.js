import { Route, Router, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Auth from './Auth/Auth'
//import BookMain from './Books/BookMain'
// import RandomQuote from './Quotes/RandomQuote'
// import Pages from './Pages/Pages'
// import Search from './Search/Search'


export default class ApplicationViews extends Component {
  //isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
  activeUser = () => parseInt(sessionStorage.getItem("credentials"))


  render() {
    return (
      <React.Fragment>
       
          <Route
          exact path="/"
          render={props => {
              return <Auth {...props} />;
          }}
          />

          {/* <Route
          exact path="/books" render={props => {
              //if (this.isAuthenticated()) {
              return <BookMain {...props} />
              //}
              //return <Redirect to="/" />
          }}
          />

          <Route
          path="/books/:bookId(\d+)" render={props => {
              //if (this.isAuthenticated()) {
              return <Pages
                  bookId={parseInt(props.match.params.bookId)}
                  {...props}/>
              //}
              //return <Redirect to="/" />
          }}
          />

          <Route
          exact path="/quote" render={props => {
              return <RandomQuote {...props} />
          }}
          />

          <Route
          exact path="/search" render={props => {
              //if (this.isAuthenticated()) {
              return <Search {...props} />
              //}
              //return <Redirect to="/" />
          }}
          /> */}
      
      </React.Fragment>
    );
  }
}
