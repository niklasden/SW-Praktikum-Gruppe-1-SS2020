import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import MainButton from '../layout/MainButton'
import Grid from '@material-ui/core/Grid';
import GroupButton from '../layout/GroupButton.js';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ShoppingSettings from '../../../src/shoppingSettings'
import { Config } from '../../config'
import { withRouter } from "react-router"
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import LoadingProgress from '../dialogs/LoadingProgress'
import ShoppingAPI from '../../api/ShoppingAPI';

const settingsobj = ShoppingSettings.getSettings()
console.log(settingsobj)

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
      loadingInProgress: false,
      loadingError: null,
      loadingGroupsError: null
    };
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  async deleteGroup(id) {
    try{
    const rInit = {
      method: 'DELETE'
    }
    const resp = await fetch(Config.apiHost + '/Group/' + id, rInit)
    if(resp.ok){
      this.props.history.push('/Groups')
    } else {
     alert("Fehler !")
    }
  }catch(e){alert(e)}
    this.setState({
            groupItemss: this.state.groupItemss.filter(elem => elem.id !== id)       
     // request to db! > delete Group      
   })
  
   if(settingsobj.onlySettingsGetSettingsGroupID() == id){
      settingsobj.onlySettingsSetSettingsGroupID("")
      settingsobj.onlySettingsSetSettingsGroupName("")
  }
  }
  

  // async fetchGroups(){
  //   const res = await fetch(Config.apiHost + '/Group/Usergroup/'+ settingsobj.getCurrentUserID())
  //   const resjson = await res.json().then(groupitems => 
  //     this.setState({
  //       groupItemss:resjson,
  //       loadingInProgress: false,
  //       loadingerror: null
  //     })).catch(e =>
  //       this.setState({
  //         groupItemss: [],
  //         loadingInProgress: false,
  //         loadingError: e
  //       })
  //     );
  //   //set loading to true  
  //   console.log(resjson)
  //    this.setState({
  //      loadingInProgress: true,
  //      loadingError:null
  //    })
  // }

  getGroups = () => {
    var a = settingsobj.getCurrentUserID()
    ShoppingAPI.getAPI().getGroupsforUser(a)
    .then(groupBOs =>
      this.setState({
        groupItemss: groupBOs 
      })).catch(e => 
        this.setState({
          groupItemss: [],
          loadingGroupsError: e
        })
      );
    };

 


   /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount(){
    this.getGroups()
    settingsobj.onlySettingsSetSettingsGroupID("")
    settingsobj.onlySettingsSetSettingsGroupName("")
  };


  renderGroups(){
      const { classes } = this.props;
      const Groups =[];
      this.state.groupItemss.forEach( elem => {
          Groups.push(
          <Grid item xs={6}>
              {/* Now by clicking on a group we set the settingsgroupid @Julius here we need a parameter to fetch the right group, all groups a user is part of, then specific group hes clicking on */}
              <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{marginTop:20}}>

                  <Link to="" onClick={ () => {settingsobj.onlySettingsSetSettingsGroupID(elem.id); settingsobj.onlySettingsSetSettingsGroupName(elem.name)}}>
                  <GroupButton key={elem.id} groupname={elem.name}></GroupButton></Link>
                  <IconButton  aria-label="delete" className={this.props.classes.margin} style={{padding:0}}>
                    <DeleteIcon onClick={() => this.deleteGroup(elem.id)}  />
                  </IconButton>
                </Grid>
            </Grid>)
      })
      return Groups}
    
      
  render(){
    const { classes } = this.props;
    const {loadingInProgress, loadingError, loadingGroupsError  } = this.state;
    var groupI = this.state.groupItems
    console.log(settingsobj.getCurrentUserID())
    return (
    <>
      <Grid container spacing={3} >
        {/* {this.renderGroups()} */}
        <Grid item xs={12}>
          <Link to="/createGroup" className={classes.button}>
            <MainButton className={classes.CreateButton}>Create Group</MainButton>
          </Link>
        </Grid> 
      </Grid>
      <LoadingProgress show={loadingInProgress}/>
      <ContextErrorMessage error={loadingError} contextErrorMsg={'The list of alll groups could not be loaded'} onReload={this.getGroups} />
      </>
      
      )
  }
}
    Groups.propTypes = {
      icon: PropTypes.string,
      }


export default withRouter(withStyles(styles)(Groups));