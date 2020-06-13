import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from '../../Theme';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SettingsIcon from '@material-ui/icons/Settings';

import {
  Link
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    bottom: 0,
    position: 'fixed',
    width: '100%',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.white,
    // backgroundColor + fontcolor should be done via Theme.js file, this is not clean code
    "&$selected": {
      color: "red"
    }
  },
  
}));

/**
 * Bottom Menu
 * 
 * @author Niklas Denneler
 */


export default function BottomNavbar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const actionClasses = "";

  return (
    <ThemeProvider theme={Theme}>
    <BottomNavigation
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
    showLabels
    className={classes.root}
    >
    <BottomNavigationAction label="Groups" icon={<PeopleAltIcon />} classes={actionClasses} />
    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} classes={actionClasses} />
    <BottomNavigationAction label="Home" icon={<HomeIcon />} classes={actionClasses} />
    <BottomNavigationAction label="Lists" icon={<ListIcon />} classes={actionClasses} />
    <BottomNavigationAction label="Settings" icon={<SettingsIcon />} classes={actionClasses} />
  </BottomNavigation>
  </ThemeProvider>
  );
}

