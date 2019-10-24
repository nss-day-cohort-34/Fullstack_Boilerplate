import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { register } from '../API/userManager';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }

  submit = (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    register({
      username,
      email,
      password,
      confirmPassword,
    })
      .then((user) => {
        this.props.onLogin(user);
        this.props.history.push('/');
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
      <form onSubmit={this.submit}>
        <h1>Register</h1>
        <ul>
          {
            this.state.errors ? this.state.errors.map((message, i) => (
              <li key={i}>{message}</li>
            )) : null
          }
        </ul>
        <div>
          <label htmlFor="username">
            Username
        </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">
            Email
        </label>
          <input
            id="email"
            name="email"
            type="email"
            required
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
            required
            onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="confirmPassword">
            Confirm Password
        </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            onChange={this.handleInputChange} />
        </div>
        <button type="submit">Register</button>
        <p>
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </form>
    );
  }
}

export default withRouter(Register);