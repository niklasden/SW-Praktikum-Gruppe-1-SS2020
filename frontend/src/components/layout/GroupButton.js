import React, { Component } from 'react'
import PropTypes from 'prop-types';
import GroupIcon from '@material-ui/icons/PeopleAlt'
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

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
 * Displays a Button for a specific group. Used in  all groups
 * 
 * @author [Niklas Denneler](https://github.com/)
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz)
 * 
 */
class GroupButton extends Component {
  render(){
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