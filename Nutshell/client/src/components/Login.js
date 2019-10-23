import React, { Component } from 'react';
import { login } from '../API/userManager';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
  }

  submit = (event) => {
    event.preventDefault();
    login({
      email: this.state.email,
      password: this.state.password
    })
      .catch(err => {
        this.setState({ errors: err.messages })
      })
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <h1>Login</h1>
        <ul>
          {
            this.state.errors ? this.state.errors.map((message, i) => (
              <li key={i}>{message}</li>
            )) : null
          }
        </ul>
        <div>
          <label htmlFor="email">
            Email
        </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="password">
            Password
        </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={this.handleInputChange} />
        </div>
        <button type="submit">Log in</button>
      </form>
    );
  }
}

export default Login;