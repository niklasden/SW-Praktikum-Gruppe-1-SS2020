import React from 'react';
import './App.css';
//** Start React Router Import **/
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

//** End React Router Import **/

//** Start React Context Import**/
//import {SettingsProvider, SettingsContext} from './settingsContext'
import SettingsContextProvider from './settingsContext'
//** End React Context Import**/
//** Start React Router Import **/
import { ThemeProvider, CssBaseline } from '@material-ui/core';
//** End React Router Import **/

//** Start Firebase Import **/
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
//** End Firebase Import **/

//** Start Layout Import **/
import Header from './components/pages/Header';
import BottomNavigation from './components/pages/BottomNavigation';
import Theme from './Theme';
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import AboutPage from './components/pages/AboutPage';
import { HomePage } from './components/pages/HomePage';
import ProductsPage from './components/pages/ProductsPage';
import GroupShoppingList from './components/pages/GroupShoppingList';
import SettingsPage from './components/pages/SettingsPage';
import { RetailerPage } from './components/pages/RetailerPage'
import EditRetailerPage from './components/pages/EditRetailerPage'
import CreateArticlePage from './components/pages/CreateArticlePage'

import SpecificGroup from './components/pages/SpecificGroup.js';
import CreateGroup from './components/pages/CreateGroup.js';
import Groups from './components/pages/Groups';
import PersonalShoppingList from './components/pages/PersonalShoppingList';
import AccountsPage from './components/pages/AccountsPage';

import ShoppingSettings from './shoppingSettings';
import {Config} from './config';
import FavoriteArticlesPage from './components/pages/FavoriteArticlesPage';
import EditFavoriteArticle from './components/pages/EditFavoriteArticle';
import AddFavoriteArticle from './components/pages/AddFavoriteArticle';

//** End Layout Import **/
const settingsOptions = ShoppingSettings.getSettings();

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
	  authLoading: false,
	  isNavHidden: false,
	  currentUserID: null,
	  isloaded:false,	  
	};
	this.fetchCurrentUserID = this.fetchCurrentUserID.bind(this);
	}
	
	
	async getLatestUserID() {
		try {
		  const res = await fetch(Config.apiHost + '/User');
		  const resjson = await res.json();
		  const latestID = resjson[resjson.length -1].id;
		  return parseInt(latestID) + 1
		}catch(e) {
		  this.setState({error: e});
		}
	  }
	  async getAllUsers() {
		try {
		  const res = await fetch(Config.apiHost + '/User');
		  const resjson = await res.json();
		  return resjson;
		}catch(e) {
		  this.setState({error: e});
		}
	  }
	async addUser(firebaseUser) {
		var users = await this.getAllUsers();   //to prevent security issues: create route in backend to check if email exists :) 
		if(users.find(user => user.email === firebaseUser.email) === undefined) {
			// console.log("User noch nicht in der DB vorhanden, erstelle Neuen.");
			var latestUserID = await this.getLatestUserID();
			this.setState({authLoading:true})
			try{
			  const rb = {
				"id": latestUserID,
				"name": firebaseUser.displayName,
				"email": firebaseUser.email,
				"firebase_id": firebaseUser.uid,
				"location":"Stuttgart, Vaihingen"
			  }
			  const requestBody = JSON.stringify(rb)
			  const rInit = {
				method: 'POST', 
				credentials: 'include',
				headers: {
				  'Content-Type': 'application/json'
				}, 
				body: requestBody
			  } 
			  const resp = await fetch(Config.apiHost + '/User', rInit)
			  if(resp.ok)  {
				await window.location.reload()
				this.setState({authLoading:false})
				//   console.log("User", rb, "erstellt");
			  }else {
				//   console.log("User", rb, "konnte nicht erstellt werden")
			  }
		  }catch(e) {
		  this.setState({error: e})
		  }
		}else {
			// console.log("User bereits in der DB vorhanden", firebaseUser);
		}
	  }
	  
	async fetchCurrentUserID(){
		const json = await fetch(Config.apiHost + "/User/firebaseid/" + firebase.auth().currentUser.uid);
		const res = await json.json();
		settingsOptions.setCurrentUserID(res.id)
		this.setState({currentUserID:res.id})
		//console.log("here" + this.state.currentUserID)
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

		// console.log("handleAuthStateChange ausgeführt")
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
				document.cookie = `token=${token}; path=/;domain=ikaufa.com;`;
			
				// Set the user not before the token arrived 
				this.setState({
					currentUser: user,
					authError: null,
					authLoading: false
				});
				this.fetchCurrentUserID();
				if(this.state.currentUserID === null) {
					this.addUser(user);
				}else {
					console.log(this.state.currentUserID);
				}
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
	handleSignIn = async () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
		try {
			await firebase.auth().signInWithRedirect(provider);
			console.log("redirect successfull")
		} catch (e){
			console.log("Error")
			console.log(e)
		}
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
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange, () => console.log("Error signing in"));
	}
	
    render(){
		//const userr = { name: this.state.currentUser.displayName, id:this.state.currentUserID } //hier muss dann die id übergeben werden .. 
		document.title = 'iKaufa';
		const { currentUser,currentUserID, appError, authError, authLoading } = this.state;
		return (
				<ThemeProvider theme={Theme}>
					<div>
						{/* Global CSS reset and browser normalization. CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						<Router basename={process.env.PUBLIC_URL}>
							<Header user={currentUser} />
							<div style={{justifyContent: 'center', display: 'flex'}}>
								<div style={{maxWidth: 700, width: '100%'}}>
								{
									// Is a user signed in?
									// geändert von chris, um im dev prozess den signin zu umgehen, muss wieder 
									// Is a user signed in?
									currentUser && currentUserID ?  //currentUserID for context 
								
										<>
											{/* Here should the redirects go */}
											<SettingsContextProvider value={{user:{ name: currentUser.displayName, id:currentUserID } ,currentGroupID:0}}>
												<Switch>
													<Route path="/about">
														<AboutPage />
													</Route>
													<Route path="/products">
														<ProductsPage />
													</Route>
													<Route path="/create_article">
														<CreateArticlePage />
													</Route>
													<Route path="/favorite_products">
														<FavoriteArticlesPage />
													</Route>
													<Route path="/add_favorite_article">
														<AddFavoriteArticle />
													</Route>
													<Route path="/edit_favorite_article">
														<EditFavoriteArticle />
													</Route>
													<Route path="/retailers">
														<RetailerPage />
													</Route>
													<Route path="/create_retailer">
														<EditRetailerPage />
													</Route>
													<Route path="/specificgroup">
														<SpecificGroup/>
													</Route>
													<Route path="/groups">
														<Groups></Groups>
													</Route>
													<Route path="/groupshoppinglist">
														<GroupShoppingList/>
													</Route> 
													<Route path="/settings">
														<SettingsPage/>
													</Route>
													<Route path="/personalshoppinglist">
														<PersonalShoppingList/>
													</Route>  
													<Route path="/creategroup">
														<CreateGroup/>
													</Route>
													<Route path="/specificgroup">
														<SpecificGroup></SpecificGroup>
													</Route>
													<Route path="/allgroups">
														<Groups></Groups>	
													</Route>
													<Route path="/settings-accounts">
														<AccountsPage />
													</Route>
													<Route path='/report' component={() => { window.location = 'http://report.ikaufa.com/'; return null;} }/>
													{/* this must always be the last route */}
													<Route path="/">
														<HomePage currentUserID={this.state.currentUserID} />
													</Route>
												</Switch>
											</SettingsContextProvider>
										</>
										:
										// else show the sign in page
										<>
											<Redirect to='/home' />
											<SignIn onSignIn={this.handleSignIn} />
										</>
									}
									<LoadingProgress show={authLoading} />
									<ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sign in process.`} onReload={this.handleSignIn} />
									<ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
								</div>
							</div>
							<BottomNavigation/> 
						{/* Prüfen ob User auf home-page dann menü nicht rendern */}
						</Router>
				</div>
				
				</ThemeProvider>
				
			
		);
	}
}

export default App;
