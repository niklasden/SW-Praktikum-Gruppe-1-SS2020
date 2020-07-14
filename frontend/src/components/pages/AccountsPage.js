import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, withStyles, Checkbox, FormControlLabel, Button, Avatar, Box, Container, Badge, TextField } from '@material-ui/core';
import MainButton from '../layout/MainButton';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ShoppingSettings from '../../../src/shoppingSettings';
import ShoppingAPI from '../../api/ShoppingAPI';
import UserBO from '../../api/UserBO';
import { Config } from '../../config';
//** Start Firebase Import **/
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
//** End Firebase Import **/

const settingsobj = ShoppingSettings.getSettings()


/**
 * @author [Niklas Denneler](https://github.com/niklasden): 
 * Renders a Settings Page, so the User can edit his personal details and delete his account
 * Most paramets can not be changed, because of the connection to Googles Firebase.
 * For this reason, we decided that it would be feasible to change the name which is displayed and profile pcutre
 * 
 * ToDo:
 * Integrate more TextFields?
 * More advanced error handling
 * 
 * 
 */
class AccountsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			uploading: false,
			image: [],
			user: [],
			firstname: "",
			lastname: "",
		}
		this.uploadedImage = React.createRef();
		this.imageUploader = React.createRef();
		this.handleCloseDeleteConfirmation = this.handleCloseDeleteConfirmation.bind(this);
		this.handleOpenDeleteConfirmation = this.handleOpenDeleteConfirmation.bind(this);
		this.getAllUsers = this.getAllUsers.bind(this);
		this.deleteAccount = this.deleteAccount.bind(this);
		
	}
	/** 
 * Handles the click event of the sign in button an calls the prop onSignIn handler
 */
	handleSignInButtonClicked = () => {
		this.props.onSignIn();
	}

	componentDidMount() {
		var uploadedImage = require('../img/avatar.jpg');
		this.setState({
			isNavHidden: false,
			image: uploadedImage,
			deleteDialog: null,
		});
		this.fetchUser();
	}

	fetchUser = () => {
		ShoppingAPI.getAPI().getUser(settingsobj.getCurrentUserID()).then(user => {
			this.setState({
			  user: user,
			  /*loadingInProgress: false,
			  loadingError: null*/
			})
			this.splitName(user[0].name);
			}).catch(e =>
			  this.setState({ // Reset state with error from catch 
				user: null,
				/*loadingInProgress: false,
				loadingError: e*/
			  })
			);
			
	}

	splitName(fullname){
		// Handling of the fetched name, bc Google stores it as one String :(
			var result = {};
		if (fullname) {	
			var nameArr = fullname.split(' ');
			result.last_name = nameArr.pop();
			result.first_name = nameArr.join(' ');
		  this.setState({
			  firstname : result.first_name,
			  lastname : result.last_name
		  })
		}
		return result;
	}
		
	handleCloseDeleteConfirmation() {
		this.setState({deleteDialog: false})
	}

	handleOpenDeleteConfirmation() {
		this.setState({deleteDialog: true})
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
	async deleteAccount() {
		try{
		const rInit = {
			method: 'DELETE'
		}
		var users = await this.getAllUsers();
		var currentDBUser = users.find(user => user.email === firebase.auth().currentUser.email);
		const resp = await fetch(Config.apiHost + '/User/' + currentDBUser.id, rInit)
		if(resp.ok){
			firebase.auth().signOut();
		} else {
			alert("Fehler !")
			}
		}catch(e){alert(e)}   
	}

	render() {
		const { classes } = this.props;
		var imageUploader = [];
		const handleImageUpload = e => {
			const [file] = e.target.files;
			if (file) {
				const reader = new FileReader();
				const { current } = this.uploadedImage;
				current.file = file;
				reader.onload = (e) => {
					current.src = e.target.result;
				}
				reader.readAsDataURL(file);
				let imageUrl = URL.createObjectURL(file);
				this.setState({ image: imageUrl });
			}

		};
		return (
			<div>
				<Container>
					<Typography className={classes.root} align='center' variant='h6'>Your Account Settings</Typography>
					<Grid container justify='center' align='center'>
						<Grid item xs={6}>
							<Box align-items='center' display='flex'>
								<Badge overlap="circle"
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right',
									}}
									badgeContent={<AddAPhoto onClick={() => this.imageUploader.current.click()} />}>
									<Avatar alt="Sabine Mustermann" src={this.state.image} ref={this.uploadedImage} className={classes.Avatar} />
									<input
										type="file"
										accept="image/*"
										onChange={handleImageUpload}
										ref={this.imageUploader}
										style={{
											display: "none"
										}}
									/>
								</Badge>
								<Grid item xs={3}>
									<Typography className={classes.Username} style={{}} gutterBottom>{this.state.firstname} {this.state.lastname}</Typography>
									<Typography className={classes.Location} style={{}}>Riedlingen, Baden-Württemberg</Typography>
								</Grid>
							</Box>
							{/* <FormControlLabel
								control={<Checkbox defaultChecked color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} />} label="Dark Mode"
								/> 
							*/}
						</Grid>
						<Grid item xs={12} align="center" style={{ marginTop: '40px' }}>
							<div>
								<TextField
									id="filled-input-name"
									label="First Name"
									defaultValue="Pia"
									InputProps={{
										readOnly: false,
									}}
									variant="filled"
									className={classes.textField}
								/>
								<TextField
									id="filled-input-lastname"
									label="Last Name"
									defaultValue="Traktorbraut"
									InputProps={{
										readOnly: false,
									}}
									variant="filled"
									className={classes.textField}
								/>
								<Grid item xs={12} style={{ marginTop: '15px' }}>
									<TextField disabled id="standard-disabled" label="Google E-Mail" defaultValue="pia.traktorbraut@gmail.com" variant="filled" style={{ width: '30ch' }} />
								</Grid>
							</div>
						</Grid>
						<Grid item xs={12}>
							<MainButton variant="contained" onclick={() => { alert('Account saved') }}>Save Changes</MainButton>
							<MainButton variant="contained" onclick={this.handleOpenDeleteConfirmation}>Delete Account</MainButton>
						</Grid>
					</Grid>
				</Container>
				<Dialog
					open={this.state.deleteDialog}
					onClose={this.handleCloseDeleteConfirmation}
					aria-labelledby="alert-delete-title"
					aria-describedby="alert-delete-description"
				>
					<DialogTitle id="alert-delete-title">{"Delete Account?"}</DialogTitle>
					<DialogContent>
					<DialogContentText id="alert-delete-description">
						Do you really want to delete your account?
					</DialogContentText>
					</DialogContent>
					<DialogActions>
					<Button onClick={this.handleCloseDeleteConfirmation} color="primary">
						CANCEL
					</Button>
					<Button onClick={this.deleteAccount} color="primary" autoFocus>
						DELETE
					</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

/** Component specific styles */
const styles = theme => ({
	root: {
		margin: theme.spacing(2)
	},
	Avatar: {
		marginRight: '0px',
		width: '100px',
		height: '100px',
		boxShadow: '0px 6px 5px #ccc',
		border: '2px solid #fff',
	},
	Username: {
		fontSize: '18px',
		marginTop: '15px',
		textAlign: 'left',
		marginLeft: '25px',
		marginBottom: '5px'
	},
	Location: {
		fontSize: '14px',
		marginTop: '0px',
		textAlign: 'left',
		marginLeft: '25px',
		fontWeight: '200',
		color: 'lightgrey',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(1),
		width: '25ch',
	}
});

/** PropTypes */
AccountsPage.propTypes = {
	/** @ignore */
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AccountsPage)