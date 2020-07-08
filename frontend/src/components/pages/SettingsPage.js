import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ListEntry from '../layout/ListEntry';
import {Link} from 'react-router-dom';
import LiveTvIcon from '@material-ui/icons/LiveTv';

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
						<LiveTvIcon 
							style={{
								color: 'rgb(0, 188, 212)', 
								fontSize: 100
							}} 
						/>
						<text>HIER KÖNNTE IHRE</text>
						<text style={{fontSize: 25, margin: 12}}>WERBUNG</text>
						<text>STEHEN!</text>
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
		alignItems: 'center', 
		display: 'flex', 
		flexDirection: 'column', 
		marginTop: 40, 	
	},
	link: {
		textDecoration: 'none'
	  }
});

/** PropTypes */
Settings.propTypes = {
	/** @ignore */
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Settings)