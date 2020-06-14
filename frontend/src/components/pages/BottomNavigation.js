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
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

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
  }
}));

/**
 * Bottom Menu
 * Current issues: 
 * For now the Styling is done via a override via CSS, there should be a more elegant solution to do this.
 * The Icons need to be replaced by custom svgs too. So they look like the figma template.
 * Routing needs to be added
 * @author Niklas Denneler
 */


export default function BottomNavbar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
   

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
    <BottomNavigationAction icon={<ImportContactsIcon />}/>
    <BottomNavigationAction icon={<PeopleAltIcon />}/>
    <BottomNavigationAction icon={<HomeIcon />}/>
    <BottomNavigationAction icon={<ListIcon />}/>
    <BottomNavigationAction icon={<SettingsIcon />}/>
  </BottomNavigation>
  </ThemeProvider>
  );
}

