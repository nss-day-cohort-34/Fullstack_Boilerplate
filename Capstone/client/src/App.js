import React, { useState } from 'react';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { getUser, removeUser } from './API/userManager';
import './App.css';

function App() {
  const [user, setUser] = useState(getUser());

  const logout = () => {
    setUser(null);
    removeUser();
  }

  return (
    <div className="App">
      <Router>
        <Header user={user} logout={logout} />
        <Route exact path="/login" render={() => (
          <Login onLogin={setUser} />
        )} />
        <Route exact path="/register" render={() => (
          <Register onLogin={setUser} />
        )} />
        <Route exact path="/" render={() => {
          return user ? (
            <Home />
          ) : <Redirect to="/login" />
        }} />
      </Router>
    </div>
  );
}

export default App;
