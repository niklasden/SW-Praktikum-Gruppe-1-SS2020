import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, withStyles, Checkbox, FormControlLabel, Button, Avatar, Box, Icon } from '@material-ui/core';
import avatar from '../img/avatar.jpg';
import ListEntry from '../layout/ListEntry';
import CustomIcon from '../layout/CustomIcon';
import {Link} from 'react-router-dom';



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
			<div style={{marginLeft: 12, marginRight: 12}}>
				<Link to="/groups" className={classes.link}>
					<ListEntry 
						text='Gruppen verwalten'
						iconName='people_outline'
						style={{marginTop: 12}}
					/>
				</Link>	
				<Link to="/retailers" className={classes.link}>
					<ListEntry 
						text='Einzelhändler verwalten'
						iconName='shopping_cart_outline'
						style={{marginTop: 12}}
					/>
				</Link>
				<Link to="/settings-accounts" className={classes.link}>	
					<ListEntry 
						text='Account verwalten'
						iconName='person_outline'
						style={{marginTop: 12}}
					/>
				</Link>
					<div className={classes.advertisementBlock}>
						<img src={require('../../icons/advertisingIcon.png')} />
						<p>HIER KÖNNTE IHRE</p>
						<p>WERBUNG</p>
						<p>STEHEN!</p>
					</div>
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
	}, 
	advertisementBlock: {
		backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderStyle: 'solid',
    borderRadius: 5,
		padding: 5,
		marginTop: 20, 
	},
	link: {
		textDecoration: 'none'
	  }
});

/** PropTypes */
Settings.propTypes = {
	/** @ignore */
	classes: PropTypes.object.isRequired,
	
}

export default withStyles(styles)(Settings)