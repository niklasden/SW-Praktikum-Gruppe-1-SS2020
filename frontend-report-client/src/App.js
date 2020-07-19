import React from 'react';
import './App.css';
import { Container, ThemeProvider } from '@material-ui/core';
import Header from './components/pages/Header';
import Theme from './Theme';
import StatisticPage from './components/pages/StatisticPage';
import ShowStatisticPage from './components/pages/ShowStatisticPage';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import SignIn from "./components/pages/SignIn";
import BottomNavigation from "./components/layout/BottomNavigation";
import LoadingProgress from "./components/dialogs/LoadingProgress";
import ShoppingSettings from './shoppingSettings';
import { Config } from './config';


//** Start Firebase Import **/
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
//** End Firebase Import **/
const settingsOptions = ShoppingSettings.getSettings();

class App extends React.Component {
  #firebaseConfig = {
    apiKey: "AIzaSyDU8V5EtAYwsu4w9hlPNdqnGlTJqlugSIg",
    authDomain: "sw-praktikum-gruppe-1-ss2020.firebaseapp.com",
    databaseURL: "https://sw-praktikum-gruppe-1-ss2020.firebaseio.com",
    projectId: "sw-praktikum-gruppe-1-ss2020",
    storageBucket: "sw-praktikum-gruppe-1-ss2020.appspot.com",
    messagingSenderId: "958039771079",
    appId: "1:958039771079:web:3fdba7615bc4ca25b93be2"
  };
  constructor(props) {
    super(props);
    this.state = {
      appError: null,
      currentUser: null,
      authLoading: false,
    }
	this.fetchCurrentUserID = this.fetchCurrentUserID.bind(this);
  }
  async fetchCurrentUserID(){
		const json = await fetch(Config.apiHost + "/User/firebaseid/" + settingsOptions.getCurrentUserFireBaseID());
		const res = await json.json();
		settingsOptions.setCurrentUserID(res.id)
		this.setState({currentUserID:res.id})
  }
  
  handleAuthStateChange = user => {
    console.log(user)

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
					authLoading: false
        });
      settingsOptions.setCurrentUserFireBaseID(this.state.currentUser.uid);
      this.fetchCurrentUserID();
      
			}).catch(e => {
				this.setState({
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
  handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    
  }
  componentDidMount() {
    this.setState({
			authLoading: true
		});
		firebase.initializeApp(this.#firebaseConfig);
		firebase.auth().languageCode = 'en';
    firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
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
    const { appError, currentUser, authLoading } = this.state;
    return (
      <ThemeProvider theme={Theme}>
        <Router basename={process.env.PUBLIC_URL}>
          <Header user={currentUser} />
            <div style={{justifyContent: 'center', display: 'flex'}}>
              <div style={{maxWidth: 700}}>
                {currentUser ?
                  <>
                    <Switch>
                      <Route path="/show">
                        <ShowStatisticPage currentUser={currentUser} />
                      </Route> 
                      <Route path="/">
                        <StatisticPage currentUser={currentUser} />
                      </Route> 
                    </Switch>
                  </>
                :  
                  <>
                    <Redirect to='/' />
                    <SignIn onSignIn={this.handleSignIn} />
                  </>
                }
              </div>
            </div>
          <BottomNavigation />
        </Router>
        <Container>
          <LoadingProgress show={authLoading} />
          <ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
