import React from 'react';
import './App.css';
import { Container, ThemeProvider } from '@material-ui/core';
import Header from './components/pages/Header';
import Theme from './Theme';
import StatisticPage from './components/pages/StatisticPage';
import ShowStatisticPage from './components/pages/ShowStatisticPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appError: null,
      authError: null,
    }
  }
  /** 
	 * Create an error boundary for this app and recieve all errors from below the component tree.
	 * 
	 * @See See Reacts [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
 	 */
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { appError: error };
  }
  render() {
	  const { appError, authError } = this.state;
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
        <Container>
          <ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
