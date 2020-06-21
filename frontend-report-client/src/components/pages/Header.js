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
  const { user } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                      {
                      user ?
                        <Grid container direction="row" alignItems="center">
                          <Grid item xs={10}>
                            <Typography variant="h6" className={classes.title}>
                                  Report Client
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
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