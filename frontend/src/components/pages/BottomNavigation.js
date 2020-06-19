import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from '../../Theme';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

import {
  Link
} from 'react-router-dom';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    bottom: 0,
    position: 'fixed',
    width: '100%',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.white,
    // backgroundColor + fontcolor should be done via Theme.js file, this is not clean code
  },
});

/**
 * Bottom Menu
 * Current issues: 
 * For now the Styling is done via a override via CSS, there should be a more elegant solution to do this.
 * The Icons need to be replaced by custom svgs too. So they look like the figma template.
 * Routing needs to be added
 * @author Niklas Denneler
 */


class BottomNavi extends React.Component {
    state = {
      value: '0'
    }

    changeValue(e, newValue) {
      this.setState({value: newValue});
    }
    
    constructor(props){
      super(props)
      this.changeValue = this.changeValue.bind(this)
    }   
  render(){
    const { classes } = this.props;
    return (
      <ThemeProvider theme={Theme}>
      <BottomNavigation
      value={this.state.value}
      onChange={this.changeValue}
      className={classes.root}
      >
      
      <BottomNavigationAction component={Link} icon={<ImportContactsIcon />} to="/"/>
      <Link>
      <BottomNavigationAction component={Link} icon={<PeopleAltIcon />} to="/groups"/>
      </Link>
      <Link>
      <BottomNavigationAction component={Link} icon={<HomeIcon />} to="/home"/>
      </Link>
      <Link>
      <BottomNavigationAction component={Link} icon={<ListIcon />} to="/lists"/>
      </Link>
      <Link>
      <BottomNavigationAction component={Link} icon={<SettingsIcon />} to="/settings"/>
      </Link>
    </BottomNavigation>
    </ThemeProvider>
    );
  } 
}
export default withStyles(useStyles, { withTheme: true})(BottomNavi)

