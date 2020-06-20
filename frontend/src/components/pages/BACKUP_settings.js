import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MaterialIconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/PeopleAlt'
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import { Container } from '@material-ui/core';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import GroupButton from '../layout/GroupButton.js'

{/* only testing*/}
const Groupitems= [
    {id:"1",name:"Kevins WGGG"},
    {id:"2",name:"niks wg"}
]


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
class Settings extends Component {
    renderGroups(){
        const Groups =[];
        Groupitems.forEach( elem => {
            Groups.push(<GroupButton key={elem.id} groupname={elem.name}></GroupButton>)
        })
        return Groups
    }
    
    render(){
    const { classes } = this.props;
   
    return (
    <Container maxWidth="sm">
    
        <Grid container xs={12}  direction="row" spacing="0" justify="space-evenly" alignItems="center">
            {Groupitems.map(grp => (
                <Grid item xs={6} ><GroupButton key={grp.id} groupname={grp.name}></GroupButton></Grid>
            ))}
         
        
         <Grid item xs={6} >  
        
        
        {/* Add Button */}
        
         <Box 
        border={1} 
        borderColor='#e0e0e0'
        borderRadius={5}
        style={{display: 'inline-block', margin: '3px'}}
      >
        <MaterialIconButton 
          className={classes.root}
          style={{padding: '9px' , width:'100px',height:'100px'}}
        >
        <div style={{height:'100%',width:'100%',margin:'9px'}}>
        
        <AddIcon 
        classes={{root: classes.iconRoot}}
        style={{height:'80%',width:'80%'}}> 
        <img className={classes.imageIcon} style={{margin:'3px',height:'100%',width:'100%'}} src={this.props.imgsrc}/>
        </AddIcon>
        <p style={{fontSize: "12px" ,color: "black"}}>{this.props.groupname}</p>
        </div>
        </MaterialIconButton>
      </Box>
        
        </Grid>
    </Grid>
    </Container>
    )
  }
}

Settings.propTypes = {
  icon: PropTypes.string,
}

export default withStyles(styles)(Settings);