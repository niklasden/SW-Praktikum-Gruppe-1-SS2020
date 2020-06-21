import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import GroupButton from '../layout/GroupButton.js'

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5, 
  },
});

/**
 * Displays all Groups specific for one user 
 * 
* @author [Julius Jacobitz](https://github.com/JuliusJacobitz) * 
 * @property icon (string): the icon name to display, can be either: add, shopping_cart, shopping_cart_outline, shopping_list, shopping_list_outline, checkmark, people
 */
class Groups extends Component {
  constructor(props){
    super(props);

    this.state ={
      groupItemss: [],
    };
  }
  
  async fetchGroups(){
    const res = await fetch('http://jj-surface:8081/api/shoppa/groups')
    const resjson = await res.json()
    console.log( resjson)
    this.setState({groupItemss:resjson})
    
  }
  componentDidMount(){
    this.fetchGroups()
    
    // fetch('http://jj-surface:8081/api/shoppa/groups')
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .then(data => this.setState({groupItemss:data}))
    
  };

  componentDidUpdate(){
    this.renderGroups()
  }

    renderGroups(){
        const Groups =[];
        this.state.groupItemss.forEach( elem => {
            Groups.push(<Grid item xs ={12}><GroupButton key={elem.id} groupname={elem.name}></GroupButton></Grid>)
        })
        return Groups
    }
    
    render(){
    const { classes } = this.props;
    var groupI = this.state.groupItems
   
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