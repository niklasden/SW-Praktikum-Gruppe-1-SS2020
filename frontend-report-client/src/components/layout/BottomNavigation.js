import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from '../../Theme';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';
import {Link} from 'react-router-dom';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    bottom: 0,
    position: 'fixed',
    width: '100%',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.white,
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
      value: 'home'
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
      
      <BottomNavigationAction component={Link} icon={<HomeIcon />} to="./" value="home" onChange={this.changeValue}/>
      <BottomNavigationAction component={Link} icon={<TimelineIcon />} value="./show" to="/show" onChange={this.changeValue}/>
    </BottomNavigation>
    </ThemeProvider>
    );
  } 
}
export default withStyles(useStyles, { withTheme: true})(BottomNavi)

