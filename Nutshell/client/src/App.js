import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" />
        <Router exact path="/home" />
      </Router>
    </div>
  );
}

export default App;
