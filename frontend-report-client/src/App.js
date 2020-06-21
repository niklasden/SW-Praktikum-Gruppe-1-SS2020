import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core';
import Header from './components/pages/Header';
import Theme from './Theme';
import StatisticPage from './components/pages/StatisticPage';
import ShowStatisticPage from './components/pages/ShowStatisticPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router basename={process.env.PUBLIC_URL}>
		  <Header />
        <Switch>
          <Route path="/show">
            <ShowStatisticPage />
          </Route> 
          <Route path="/">
            <StatisticPage />
          </Route> 
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
