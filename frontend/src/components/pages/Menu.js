import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TimelineIcon from '@material-ui/icons/Timeline';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CodeIcon from '@material-ui/icons/Code';
import SettingsIcon from '@material-ui/icons/Settings';
import ArchiveIcon from '@material-ui/icons/Archive';
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
  listItem: {
    textDecoration: 'none',
    color: '#37474f'
  },
}));

/**
 * Menu
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 */


export default function Menu(props) {
  const classes = useStyles();
  const user = props.user;
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
            <Link to="/" className={classes.listItem}>
              <ListItem button key="0">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to="/about" className={classes.listItem}>
              <ListItem button key="1">
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </Link>
            {/* 
              geändert von chris, um im dev prozess den signin zu umgehen, muss wieder 
              TODO: true muss wieder in user umbenannt werden 
            */}
            { true &&
              <div>
                <Link to="/users" className={classes.listItem}>
                  <ListItem button key="2">
                    <ListItemIcon><PermIdentityIcon /></ListItemIcon>
                    <ListItemText primary="Users" />
                  </ListItem>
                </Link>
                <Link to="/allGroups" className={classes.listItem}>
                  <ListItem button key="2">
                    <ListItemIcon><PermIdentityIcon /></ListItemIcon>
                    <ListItemText primary="All Groups" />
                  </ListItem>
                </Link>
                <Link to="/products" className={classes.listItem}>
                  <ListItem button key="2">
                    <ListItemIcon><ArchiveIcon /></ListItemIcon>
                    <ListItemText primary="Products" />
                  </ListItem>
                </Link>
                <Link to="/retailers" className={classes.listItem}>
                  <ListItem button key="2">
                    <ListItemIcon><ArchiveIcon /></ListItemIcon>
                    <ListItemText primary="Einzelhändler verwalten" />
                  </ListItem>
                </Link>
                <Link to="/statistics" className={classes.listItem}>
                  <ListItem button key="2">
                    <ListItemIcon><TimelineIcon /></ListItemIcon>
                    <ListItemText primary="Statistik verwalten" />
                    </ListItem>
<<<<<<< HEAD
                  </Link>
                  <Link to="/GroupShoppingList" className={classes.listItem}>
                    <ListItem button key="2">
                      <ListItemIcon><ArchiveIcon/></ListItemIcon>
                      <ListItemText primary="GroupShoppingList" />
                    </ListItem>
                  </Link>
                  <Link to="/createGroup" className={classes.listItem}>
                    <ListItem button key="2">
                      <ListItemIcon><ArchiveIcon/></ListItemIcon>
                      <ListItemText primary="Create Group" />
                    </ListItem>
                  </Link>

                  <Link to="/specificGroup" className={classes.listItem}>
                    <ListItem button key="2">
                      <ListItemIcon><ArchiveIcon/></ListItemIcon>
                      <ListItemText primary="Specific Group" />
                    </ListItem>
                  </Link>

                  {/* Link to Page PersonalShoppingList @Pascal*/}
                  <Link to="/PersonalShoppingList" className={classes.listItem}>
                    <ListItem button key="2">
                      <ListItemIcon><ArchiveIcon/></ListItemIcon>
                      <ListItemText primary="My SoppingList" />
                    </ListItem>
                  </Link>
                  
                  
                  <a href="http://localhost:8081" className={classes.listItem} target="_blank" rel="noopener noreferrer">
                    <ListItem button key="2">
                      <ListItemIcon><CodeIcon /></ListItemIcon>
                      <ListItemText primary="API" />
                    </ListItem>
                  </a>
                </div>
                : <div /> }
              <Link to="/settings" className={classes.listItem}>
                <ListItem button key="2">
                  <ListItemIcon><SettingsIcon /></ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              </Link>
=======
                </Link>
                <Link to="/groups" className={classes.listItem}>
                  <ListItem button key="2">
                    <ListItemIcon><ArchiveIcon /></ListItemIcon>
                    <ListItemText primary="Gruppen anzeigen" />
                  </ListItem>
                </Link>
                <Link to="/GroupShoppingList" className={classes.listItem}>
                  <ListItem button key="2">
                    <ListItemIcon><ArchiveIcon/></ListItemIcon>
                    <ListItemText primary="GroupShoppingList" />
                  </ListItem>
                </Link>
                <Link to="/createGroup" className={classes.listItem}>
                  <ListItem button key="2">
                    <ListItemIcon><ArchiveIcon/></ListItemIcon>
                    <ListItemText primary="Create Group" />
                  </ListItem>
                </Link>
                <Link to="/specificGroup" className={classes.listItem}>
                  <ListItem button key="2">
                    <ListItemIcon><ArchiveIcon/></ListItemIcon>
                    <ListItemText primary="Specific Group" />
                  </ListItem>
                </Link>
                
                <Link to="/settings" className={classes.listItem}>
                  <ListItem button key="2">
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItem>
                </Link>

                <a href="http://localhost:8081" className={classes.listItem} target="_blank" rel="noopener noreferrer">
                  <ListItem button key="2">
                    <ListItemIcon><CodeIcon /></ListItemIcon>
                    <ListItemText primary="API" />
                  </ListItem>
                </a>
              </div>
            }
>>>>>>> d74ae78b7c86265905a56035c8ef9e5fbd3e609a
            </List>
          </div>
        </SwipeableDrawer>
    </div>
  );
}