import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import AboutPage from './components/pages/AboutPage';
import { HomePage } from './components/pages/HomePage';
import { UsersPage } from './components/pages/UsersPage';
import Header from './components/pages/Header';

function App() {
  return (
      <Router>
        <div>
          {/* TODO: move to own header component */}
          <Header />
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/users">
              <UsersPage />
            </Route> 
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
