import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MaterialIconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/PeopleAlt'
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import Box from '@material-ui/core/Box'

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5, 
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
        <MaterialIconButton 
          className={classes.root}
          style={{padding: '9px' , width:'100px',height:'100px', alignSelf: 'center'}}
        >
        <div style={{height:'100%',width:'100%',margin:'9px'}}>
        
        <GroupIcon 
        classes={{root: classes.iconRoot}}
        style={{height:'80%',width:'80%'}}> 
        <img className={classes.imageIcon} style={{margin:'3px',height:'100%',width:'100%'}} src={this.props.imgsrc}/>
        </GroupIcon>
        <p style={{fontSize: "12px" ,color: "black"}}>{this.props.groupname}</p>
        </div>

        </MaterialIconButton>
    )
  }
}

GroupButton.propTypes = {
  icon: PropTypes.string,
}

export default withStyles(styles)(GroupButton);