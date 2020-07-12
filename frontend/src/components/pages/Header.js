import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from './Menu'
import ProfileDropDown from '../dialogs/ProfileDropDown';
import { useLocation } from 'react-router-dom'

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

/**
 * Header
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 */

function Header(props){
  const classes = useStyles();
  const { user } = props;
  const paths = {
    "/": "HOME",
    "/about": "ABOUT",
    "/users": "USER",
    "/products": "ITEM",
    "/retailers": "RETAILER",
    "/settings": "SETTINGS",
    "/statistics": "STATISTICS",
    "/createGroup": "CREATE A GROUP",
  };
  let location = useLocation();
	let title = 'SW-Praktikum'
	const path = location.pathname
	console.log(path)

	if (path === '/index.html' && user){
		title = 'Hi ' + user.displayName
	} else if (path === '/GroupShoppingList'){
		title = 'Group'
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
export default Header;