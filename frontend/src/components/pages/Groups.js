import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import MainButton from '../layout/MainButton'
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import GroupButton from '../layout/GroupButton.js';
import {Link} from 'react-router-dom';



const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5, 
  },
  button: {
    textDecoration: 'none'
  }
});



/**
 * Displays all Groups specific for one user 
 * 
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz) * 
 * @author [Niklas Denneler](https://github.com/niklasden) * Just for the Routing & Styling for the button, everything else is Julius master piece.
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
    const res = await fetch('http://localhost:8081/api/shoppa/groups')
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
        const {classes } = this.props;
        const Groups =[];
        this.state.groupItemss.forEach( elem => {
            Groups.push(<Grid item xs={6}>
                {/* @Julius here we need a parameter to fetch the right group, all groups a user is part of, then specific group hes clicking on */}
                <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        style={{marginTop:20}}
                      >


                          <Link to="/specificGroup" className={classes.button}>
                            <GroupButton key={elem.id} groupname={elem.name}></GroupButton>
                          </Link>
                          </Grid>
                        </Grid>)
        })
        return Groups
        
    }
    
    render(){
    const { classes } = this.props;
    var groupI = this.state.groupItems
   
    return (
    <>
      <Grid container spacing={3} >
      {this.renderGroups()}
        
        <Grid item xs={12}>
          <Link to="/createGroup" className={classes.button}>
          <MainButton className={classes.CreateButton}>Create Group</MainButton>
          </Link>
        </Grid> 
      </Grid>
        </>
    )
  }
}
Groups.propTypes = {
  icon: PropTypes.string,
}

export default withStyles(styles)(Groups);