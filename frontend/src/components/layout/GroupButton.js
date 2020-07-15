import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MaterialIconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/PeopleAlt'
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router';

import Paper from '@material-ui/core/Paper';

import {Link} from 'react-router-dom'
const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5, 
  },
  margin: {
    margin: theme.spacing(1),
  },
  rootTwo: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    }},
});


/**
 * Displays a groupbutton for All groups
 * 
 * @author [Niklas Denneler](https://github.com/)
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz)
 * 
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
        
        
        
        <Button variant="outlined" color="primary" style={{borderColor: '#BDBDBD', backgroundColor: '#fafafa', width: '100%', fontWeight: 'bold'}}>
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