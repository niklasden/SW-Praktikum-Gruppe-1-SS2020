import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import {
  Link
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

/**
 * Menu
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 */


export default function Menu() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer("left", true)}>
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            <div onClick={toggleDrawer("left", false)} onKeyDown={toggleDrawer("left", false)}>
            <List>
            <Link to="/">
              <ListItem button key="0">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to="/about">
              <ListItem button key="1">
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
              </Link>
              <Link to="/users">
                <ListItem button key="2">
                  <ListItemIcon><PermIdentityIcon /></ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem>
              </Link>
            </List>
            </div>
          </SwipeableDrawer>
    </div>
  );
}
