import React from 'react';
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
import {Link} from 'react-router-dom';


/**
 * @author Niklas Denneler (https://github.com/niklasden)
 * Bottom Menu
 * Allows us to navigate the application, makes use of the ThemeProvider for styling.
 * Uses Material UI native BottomNavigationAction with passed components to render new pages
 * 
 */

class BottomNavi extends React.Component {
  constructor(props){
    super(props)
    this.changeValue = this.changeValue.bind(this)
   
  this.state = {
      value: '0'
    }
  }
    changeValue(e, newValue) {
      this.setState({value: newValue});
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
          <BottomNavigationAction 
            className={classes.actionItemStyle} 
            component={Link} 
            icon={<ImportContactsIcon />} 
            to="/products"
          />
          <BottomNavigationAction 
            className={classes.actionItemStyle} 
            component={Link} 
            icon={<PeopleAltIcon />} 
            to="/groupshoppinglist"
          />
          <BottomNavigationAction 
            className={classes.actionItemStyle} 
            component={Link} 
            icon={<HomeIcon />} 
            to="/home"
          />
          <BottomNavigationAction 
            className={classes.actionItemStyle} 
            component={Link} 
            icon={<ListIcon />} 
            to="/personalshoppinglist"
          />
          <BottomNavigationAction 
            className={classes.actionItemStyle} 
            component={Link} 
            icon={<SettingsIcon />} 
            to="/settings"
          />
      </BottomNavigation>
    </ThemeProvider>
    );
  } 
}

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    bottom: 0,
    position: 'fixed',
    width: '100%',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.white,
    marginTop: '60px'
  },
  actionItemStyle: {
    '&$selected': {
        color: "#000 !important"
    },
    color: '#d8d8d8'
  }
});
export default withStyles(useStyles, { withTheme: true})(BottomNavi)

