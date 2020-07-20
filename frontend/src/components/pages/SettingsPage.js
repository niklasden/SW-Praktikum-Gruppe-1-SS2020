import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ListEntry from '../layout/ListEntry';
import {Link} from 'react-router-dom';
import LiveTvIcon from '@material-ui/icons/LiveTv';

/** 
 * Displays the settings overview page. It renders the links to other settings pages, e.g. Manage Groups or Manage Retailers
 * 
 * @author Christopher Boehm
 * 
 */
class Settings extends Component {
	componentDidMount(){
		this.setState({
			isNavHidden: false
		})
	}

	// Handles the click event of the sign in button an calls the prop onSignIn handler
	handleSignInButtonClicked = () => {
		this.props.onSignIn()
	}

	render() {
		const { classes } = this.props;
		return (
			<div style={{marginLeft: 12, marginRight: 12, paddingTop: 1}}>
				<Link to="/groups" className={classes.link}>
					<ListEntry 
						text='Manage Group'
						iconName='people_outline'
						style={{marginTop: 12}}
					/>
				</Link>	
				<Link to="/retailers" className={classes.link}>
					<ListEntry 
						text='Manage Retailers'
						iconName='shopping_cart_outline'
						style={{marginTop: 12}}
					/>
				</Link>
				<Link to="/settings-accounts" className={classes.link}>	
					<ListEntry 
						text='Manage Account'
						iconName='person_outline'
						style={{marginTop: 12}}
					/>
				</Link>
					<div className={classes.advertisementBlock}>
						<LiveTvIcon 
							style={{
								color: 'rgb(0, 188, 212)', 
								fontSize: 100
							}} 
						/>
						<p>HIER KÖNNTE IHRE</p>
						<p style={{fontSize: 25, margin: 12}}>WERBUNG</p>
						<p>STEHEN!</p>
					</div>
			</div>
		)
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
	marginTop: 40, 	
	padding: 5,
	alignItems: 'center', 
	display: 'flex', 
	flexDirection: 'column', 
	},
	link: {
		textDecoration: 'none'
	  }
});

export default withStyles(styles)(Settings)