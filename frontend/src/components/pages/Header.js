import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from './Menu'
import {
    Link
  } from 'react-router-dom';
import ProfileDropDown from '../dialogs/ProfileDropDown';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
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
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <Menu />
                  <Typography variant="h6" className={classes.title}>
                    ShoppingProject - SW-Praktikum: Gruppe 1 (SS2020)
                  </Typography>
                  {
                    user ?
                      <ProfileDropDown user={user} />
                    :
                    <div></div>
                  }
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default Header;