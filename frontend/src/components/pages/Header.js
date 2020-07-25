import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from './Menu';
import ProfileDropDown from '../dialogs/ProfileDropDown';
import { useLocation } from 'react-router-dom';
import ShoppingSettings from '../../../src/shoppingSettings';

const settings = ShoppingSettings.getSettings()

/**
 * Header
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 */

function Header(props){
  const classes = useStyles();
  const { user } = props;
  let location = useLocation();
	let title = ''
	const path = location.pathname

	if (path === '/home' && user && settings.currentGroupName === ""){
		title = 'Hi ' + user.displayName
	} else if (settings.currentGroupName === ""){
		title = 'No Group selected'
  } else {
    title = settings.currentGroupName
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
        <Menu user={user} />
					<Grid container direction="row" alignItems="center">
						<Grid item xs={10}>
							<Typography variant="h6" className={classes.title}>
								{title}
							</Typography>
						</Grid>
						{
							user &&
						<Grid item xs={2}>
							<ProfileDropDown user={user} />
						</Grid>
						}
					</Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginBottom: '65px'
  },
  title: {
    textAlign: 'left'
  }
}));

export default Header;