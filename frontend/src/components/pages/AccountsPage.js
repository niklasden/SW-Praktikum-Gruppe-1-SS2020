import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, withStyles, Checkbox, FormControlLabel, Button, Avatar, Box } from '@material-ui/core';
import avatar from '../img/avatar.jpg';
import MainButton from '../layout/MainButton';


/** 
 * Renders a landing page for users who are not signed in. Provides a sign in button 
 * for using an existing google account to sign in. The component uses firebase to 
 * do redirect based signin process.
 * 
 * @see See Googles [firebase authentication](https://firebase.google.com/docs/web/setup)
 * @see See Googles [firebase API reference](https://firebase.google.com/docs/reference/js)
 * 
 */
class AccountsPage extends Component {


	/** 
	 * Handles the click event of the sign in button an calls the prop onSignIn handler
	 */
	handleSignInButtonClicked = () => {
		this.props.onSignIn();
	}

	componentDidMount(){
		this.setState({
			isNavHidden: false
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Typography className={classes.root} align='center' variant='h6'>Your Account Settings</Typography>
				<Grid container justify='center'>
					<Grid item xs={3}>
					<Box align-items="center" display="flex">
					<Avatar alt="Sabine Mustermann" src={avatar} className={classes.AvatarPadding}
					/>
					<Typography>Sabine Mustermann</Typography>
					</Box>
					<FormControlLabel
					control={<Checkbox defaultChecked color="default" inputProps={{ 'aria-label': 'checkbox with default color' }}/>} label="Dark Mode"
					/>
					</Grid>
					<Grid item xs={3}>
					<MainButton variant="contained">Delete Account</MainButton>
					</Grid>
				</Grid>
			</div>
		);
	}
}

/** Component specific styles */
const styles = theme => ({
	root: {
		margin: theme.spacing(2)
	},
	AvatarPadding: {    
		marginRight: '25px' 
	  }
});

/** PropTypes */
AccountsPage.propTypes = {
	/** @ignore */
	classes: PropTypes.object.isRequired,
	
}

export default withStyles(styles)(AccountsPage)