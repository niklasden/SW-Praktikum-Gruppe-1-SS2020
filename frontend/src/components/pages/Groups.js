import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import MainButton from '../layout/MainButton'
import Grid from '@material-ui/core/Grid';
import GroupButton from '../layout/GroupButton.js';
import {Link} from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

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
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  deleteGroup(id) {
    this.setState({
        groupItemss: this.state.groupItemss.filter(elem => elem.id !== id)

        // request to db! > delete Group      
   })}
  

  async fetchGroups(){
    const res = await fetch('http://localhost:8081/api/shoppa/groups')
    const resjson = await res.json()
    console.log( resjson)
    this.setState({groupItemss:resjson}) 
  }


  componentDidMount(){
    this.fetchGroups()
  };


  renderGroups(){
      const {classes } = this.props;
      const Groups =[];
      this.state.groupItemss.forEach( elem => {
          Groups.push(
          <Grid item xs={6}>
              {/* @Julius here we need a parameter to fetch the right group, all groups a user is part of, then specific group hes clicking on */}
              <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{marginTop:20}}>

                  <GroupButton  key={elem.id} groupname={elem.name}></GroupButton>
                  <IconButton  aria-label="delete" className={this.props.classes.margin} style={{padding:0}}>
                    <DeleteIcon onClick={() => this.deleteGroup(elem.id)}  />
                  </IconButton>
                </Grid>
            </Grid>)
      })
      return Groups}
    
      
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