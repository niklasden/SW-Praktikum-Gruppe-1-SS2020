import React from 'react';
import './App.css';
//** Start React Router Import **/
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
//** End React Router Import **/


//** Start React Router Import **/
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
//** End React Router Import **/

//** Start Firebase Import **/
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
//** End Firebase Import **/

//** Start Layout Import **/
import Header from './components/pages/Header';
import Theme from './Theme';
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import { AboutPage } from './components/pages/AboutPage';
import { HomePage } from './components/pages/HomePage';
import { UsersPage } from './components/pages/UsersPage';


//** End Layout Import **/

class App extends React.Component {
	/** The firebase config structure as provided by the firebase admin website.
	 *  I was worried about exposing this on github, but from my understanding and this thread it should be fine https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public/37484053#37484053 */
	#firebaseConfig = {
    apiKey: "AIzaSyDU8V5EtAYwsu4w9hlPNdqnGlTJqlugSIg",
    authDomain: "sw-praktikum-gruppe-1-ss2020.firebaseapp.com",
    databaseURL: "https://sw-praktikum-gruppe-1-ss2020.firebaseio.com",
    projectId: "sw-praktikum-gruppe-1-ss2020",
    storageBucket: "sw-praktikum-gruppe-1-ss2020.appspot.com",
    messagingSenderId: "958039771079",
    appId: "1:958039771079:web:3fdba7615bc4ca25b93be2"
  };
  constructor (props) {
    super(props);
        
    // Init an empty state
    this.state = {
      currentUser: null,
      appError: null,
      authError: null,
      authLoading: false
    };
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

	/** Handles firebase usres logged in state changes  */
	handleAuthStateChange = user => {
		if (user) {
			this.setState({
				authLoading: true
			});
			// The user is signed in
			user.getIdToken().then(token => {
				// Add the token to the browser's cookies. The server will then be
				// able to verify the token against the API.
				// SECURITY NOTE: As cookies can easily be modified, only put the
				// token (which is verified server-side) in a cookie; do not add other
				// user information.
				document.cookie = `token=${token};path=/`;

				// Set the user not before the token arrived 
				this.setState({
					currentUser: user,
					authError: null,
					authLoading: false
				});
			}).catch(e => {
				this.setState({
					authError: e,
					authLoading: false
				});
			});
		} else {
			// User has logged out, so clear the id token
			document.cookie = 'token=;path=/';

			// Set the logged out user to null
			this.setState({
				currentUser: null,
				authLoading: false
			});
		}
	}
  /** 
   * Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
	 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
	 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
	 */
	handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}

	/**
	 * Lifecycle method, which is called when the component gets inserted into the browsers DOM.
	 * Initializes the firebase SDK.
	 * 
	 * @see See Googles [firebase init process](https://firebase.google.com/docs/web/setup)
	 */
	componentDidMount() {
		firebase.initializeApp(this.#firebaseConfig);
		firebase.auth().languageCode = 'en';
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
	}
    render(){
      const { currentUser, appError, authError, authLoading } = this.state;

      return (
        <ThemeProvider theme={Theme}>
          {/* Global CSS reset and browser normalization. CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Router basename={process.env.PUBLIC_URL}>
            <Container maxWidth='md'>
              <Header  />
              {
                // Is a user signed in?
                currentUser ?
                  <>
                    {/* Here should the redirects go */}
                    <Redirect from='/' to='' />
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
                  </>
                  :
                  // else show the sign in page
                  <>
                    <Redirect to='/index.html' />
                    <SignIn onSignIn={this.handleSignIn} />
                  </>
              }
              <LoadingProgress show={authLoading} />
              <ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sign in process.`} onReload={this.handleSignIn} />
              <ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
            </Container>
          </Router>
        </ThemeProvider>
      );
    }
  }

export default App;
