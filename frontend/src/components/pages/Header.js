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
    },
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
    "/users": "BENUTZER",
    "/products": "ARTIKEL",
    "/retailers": "EINZELHÄNDLER",
    "/settings": "EINSTELLUNGEN"
  };
  let location = useLocation();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <Menu user={user} />
                  {
                    user ?
                      <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item md={10}>
                          <Typography variant="h6" className={classes.title}>
                                {paths[location.pathname]}
                          </Typography>
                        </Grid>
                        <Grid item md={2}>
                          <ProfileDropDown user={user} />
                        </Grid>
                      </Grid>
                    :
                      <Typography variant="h6" className={classes.title}>
                        ShoppingProject - SW-Praktikum: Gruppe 1 (SS2020)
                      </Typography>
                  }
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default Header;