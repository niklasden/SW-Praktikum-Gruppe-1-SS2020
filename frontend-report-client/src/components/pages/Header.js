import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ProfileDropDown from '../dialogs/ProfileDropDown';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
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
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                      <Typography variant="h6" className={classes.title}>
                        Report Client
                      </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default Header;