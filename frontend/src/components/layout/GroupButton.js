import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MaterialIconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/PeopleAlt'
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton' 
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5, 
  },
  margin: {
    margin: theme.spacing(1),
  },
});

/**
 * Displays an icon button as designed in figma
 * 
 * @author [Niklas Denneler](https://github.com/)
 * @author [Julius Jacobitz]()
 * 
 * @property icon (string): the icon name to display, can be either: add, shopping_cart, shopping_cart_outline, shopping_list, shopping_list_outline, checkmark, people
 */
class GroupButton extends Component {
  render(){
    const { classes } = this.props;
    

    return (
              <>
         {/** 
         <IconButton size="large" aria-label="GoToGroup" className={this.props.classes.margin} style={{padding:5}}>  
        <GroupIcon/>
        <p style={{fontSize: "12px" ,color: "black"}}>{this.props.groupname}</p>
        </IconButton>
*/}
        <Button size="large" >
          
          <GroupIcon fontSize="large"/>
          {this.props.groupname}
        </Button>

        </>
    )
  }
}

GroupButton.propTypes = {
  icon: PropTypes.string,
}

export default withStyles(styles)(GroupButton);