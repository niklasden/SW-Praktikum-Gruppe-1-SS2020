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
import ListEntry from '../layout/ListEntry'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

const settingsobj = ShoppingSettings.getSettings()

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

    this.state = {
      groupItems: [],
      loadingInProgress: false,
      loadingError: null,
      loadingGroupsError: null,
      
    };
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  deleteGroup = (id) => {
    ShoppingAPI.getAPI().deleteGroup(id).then(groupBOs => {
      this.props.history.push('/Groups')
      this.setState({groupItems: this.state.groupItems.filter(elem => elem.id !== id)})
      alert("Group and all Members deleted")
  }).catch(e =>
      alert(e)
      )
       if(settingsobj.onlySettingsGetSettingsGroupID() == id){
         settingsobj.onlySettingsSetSettingsGroupID("")
         settingsobj.onlySettingsSetSettingsGroupName("")
       }
  }

  getGroups = () => {
    ShoppingAPI.getAPI().getGroupsforUser(settingsobj.getCurrentUserID()).then(groupBOs => {
      this.setState({  // Set new state when AccountBOs have been fetched
        groupItems: groupBOs,
        loadingInProgress: false,
        loadingerror: null
      })
     }).catch(e => 
        this.setState({
          groupItems: [],
          loadingInProgress: false,
          loadingGroupsError: e
        })
      );
      this.setState({
              loadingInProgress: true,
              loadingError:null
            })
     };


   /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount(){
    this.getGroups()
    settingsobj.onlySettingsSetSettingsGroupID("")
    settingsobj.onlySettingsSetSettingsGroupName("")
  };


  renderGroupsBackup(){
    const { classes } = this.props;
    const Groups=[];
    
    this.state.groupItems.forEach( elem => {
      Groups.push(
        <Grid item xs={6}>
            {/* Now by clicking on a group we set the settingsgroupid @Julius here we need a parameter to fetch the right group, all groups a user is part of, then specific group hes clicking on */}
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{marginTop:20}}
          >
            <Link to="" onClick={ () => {settingsobj.onlySettingsSetSettingsGroupID(elem.id); settingsobj.onlySettingsSetSettingsGroupName(elem.name)}}>
              <GroupButton key={elem.id} groupname={elem.name}></GroupButton>
            </Link>
            <IconButton  aria-label="delete" className={this.props.classes.margin} style={{padding:0}}>
              <DeleteIcon onClick={() => this.deleteGroup(elem.id)}  />
            </IconButton>
          </Grid>
        </Grid>
      )
    })
    return Groups
  } 

  renderGroups(){
    const groups = []

    this.state.groupItems.forEach(group => {
      groups.push(
        <ListEntry 
          iconName='people'
          text={group.name} 
          style={{marginBottom: 12}}
          onClick={ () => {settingsobj.onlySettingsSetSettingsGroupID(group.id); settingsobj.onlySettingsSetSettingsGroupName(group.name)}}
          linkTo='specificGroup'
        />
      )
    })

    return groups
  }
      
  render1(){
    const { classes } = this.props;
    const { loadingInProgress, loadingError, loadingGroupsError, groupItems } = this.state;
    return (
      <>
        <Grid container spacing={3} >
          <div>
            {this.renderGroupsBackup()}
          </div>
          
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

  render(){
    const { classes } = this.props;

    return (
      <div style={{width: '100%', marginBottom: 65}}>
        <div style={{margin: 12, paddingTop: 12}}>
          <div>
            {this.state.loadingInProgress ?
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress size={25} />
              </div>
            :  
              this.renderGroups()
            }
          </div>
        </div>

        <div style={{flex: 1, flexDirection: 'row', display: 'flex', margin: 12, paddingTop: 12}}>
          {/* <text style={{flexGrow: 1}}>hello</text> */}
          <Grid item xs={12}>
            <Link to="/createGroup" className={classes.button}>
              <MainButton style={{widht: '100%'}} className={classes.CreateButton}>Create Group</MainButton>
            </Link>
          </Grid> 
        </div>
      </div>
    ) 
  }
}

Groups.propTypes = {
  icon: PropTypes.string,
}

export default withRouter(withStyles(styles)(Groups));