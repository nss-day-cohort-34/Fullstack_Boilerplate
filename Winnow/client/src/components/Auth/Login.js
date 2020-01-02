import React, { Component } from "react";
import { Button, Image } from 'semantic-ui-react'
import { Input } from 'reactstrap'
//import logo from './agronomy.png'
import "../Styles/Login.css";
import { withRouter, Link } from 'react-router-dom';
import { login } from '../../API/userManager';


class Login extends Component {
    state = {
        username: '',
        password: '',
        errors: [],
      }
    
      submit = (event) => {
        event.preventDefault();
        login({
          username: this.state.username,
          password: this.state.password,
        })
          .then((user) => {
            this.props.onLogin(user);
            this.props.history.push('/books');
          })
          .catch(err => {
            this.setState({ errors: err.messages });
          });
      }
    
      handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
          [name]: value,
        });
      }
    

render() {
    return (
      <React.Fragment>
        <div className="login">
          <div className="login__heading">
            {/* <Image className="logo" src={logo}/> */}
            <h1 style={{color: 'rgb(85, 85, 85)'}} ><strong>winnow</strong></h1>
          </div>
          <div className="login__description--1">
            <h4><em>Marcus Aurelius wrote that we should</em>
              <strong> winnow </strong><em>our thoughts, so that we always
              have something meaningful to think and
              talk about.</em></h4>
          <div className="login__description--2">
              <h4><em>Create a daily quote book to winnow the
              chaff of media noise, and collect a few
              grains of wisdom.</em></h4>
          </div>
          </div>
            <div className="loginForm">
                <form onSubmit={this.submit}>
                    <Input
                        onChange={this.handleInputChange}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        required
                        autoFocus=""
                        className="input"
                    /><br/>
                    <Input
                        onChange={this.handleInputChange}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        required
                        className="input"
                    />
                    <div className="signIn">
                        <Button
                            className="signIn_button"
                            type="submit"                            
                            >sign in
                        </Button>
                    </div>
              </form>
            </div>
            <div className="or">
                <h6>or</h6>             
            </div>
          </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
