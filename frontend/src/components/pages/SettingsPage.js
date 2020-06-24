import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, withStyles, Checkbox, FormControlLabel, Button, Avatar, Box } from '@material-ui/core';
import avatar from '../img/avatar.jpg';
import ListEntry from '../layout/ListEntry'


/** 
 * @author Christopher Boehm
 * 
 */


class Settings extends Component {
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
				<ListEntry 
					text='Gruppe verwalten'
				/>
				<ListEntry 
					text='Einzelhändler verwalten'
				/>
				<ListEntry 
					text='Account verwalten'
				/>
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
Settings.propTypes = {
	/** @ignore */
	classes: PropTypes.object.isRequired,
	
}

export default withStyles(styles)(Settings)