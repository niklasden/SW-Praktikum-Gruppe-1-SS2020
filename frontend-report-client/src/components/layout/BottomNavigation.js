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
  actionItemStyle: {
    '&$selected': {
        color: "#000 !important"
    },
    color: '#d8d8d8'
  }
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
      value: '4'
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
          <BottomNavigationAction 
            className={classes.actionItemStyle} 
            onClick={() => {window.location.href="http://ikaufa.com/products"}}
            icon={<ImportContactsIcon />} 
            
          />
          <BottomNavigationAction 
            className={classes.actionItemStyle} 
            icon={<PeopleAltIcon />} 
            onClick={() => {window.location.href="http://ikaufa.com/GroupShoppingList"}}
          />
          <BottomNavigationAction 
            className={classes.actionItemStyle} 
            icon={<HomeIcon />} 
            onClick={() => {window.location.href="http://ikaufa.com/home"}}
          />
          <BottomNavigationAction 
            className={classes.actionItemStyle} 
            onClick={() => {window.location.href="http://ikaufa.com/lists"}}
            icon={<ListIcon />} 
          />
          <BottomNavigationAction 
            className={classes.actionItemStyle +  " Mui-selected"}
            selected
            icon={<SettingsIcon />} 
            onClick={() => {window.location.href="http://ikaufa.com/settings"}}
          />
      </BottomNavigation>
    </ThemeProvider>
    );
  } 
}
export default withStyles(useStyles, { withTheme: true})(BottomNavi)