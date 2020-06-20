import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import { Container } from '@material-ui/core';
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
 * Displays all Groups
 * 
 * @author [Julius Jacobitz]()
 * 
 * @property icon (string): the icon name to display, can be either: add, shopping_cart, shopping_cart_outline, shopping_list, shopping_list_outline, checkmark, people
 */
class Groups extends Component {
    renderGroups(){
        const Groups =[];
        Groupitems.forEach( elem => {
            Groups.push(<Grid item xs ={12}><GroupButton key={elem.id} groupname={elem.name}></GroupButton></Grid>)
        })
        return Groups
    }
    
    render(){
    const { classes } = this.props;
   
    return (
    <>

<Grid container spacing={3} direction="column" justify="center" alignItems="center">
{this.renderGroups()}



</Grid>

        </>
    )
  }
}

Groups.propTypes = {
  icon: PropTypes.string,
}

export default withStyles(styles)(Groups);