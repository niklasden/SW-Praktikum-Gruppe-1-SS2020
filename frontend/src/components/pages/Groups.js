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
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz) 
 * @author [Niklas Denneler](https://github.com/niklasden) 
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
    }).catch(e => alert(e))
    
    if(settingsobj.onlySettingsGetSettingsGroupID() === id){
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
    }).catch(e => {
      this.setState({
        groupItems: [],
        loadingInProgress: false,
        loadingGroupsError: e
      })
    });
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

  renderGroups(){
    const groups = []

    this.state.groupItems.forEach(group => {
      groups.push(
        <Link 
          to='specificGroup' 
          onClick={ () => {settingsobj.onlySettingsSetSettingsGroupID(group.id); settingsobj.onlySettingsSetSettingsGroupName(group.name)}}
          style={{ textDecoration: 'none' }}
        >
          <ListEntry 
            iconName='people'
            text={group.name} 
            style={{marginBottom: 12}}
            onClick={ () => {settingsobj.onlySettingsSetSettingsGroupID(group.id); settingsobj.onlySettingsSetSettingsGroupName(group.name)}}
          />
        </Link>
      )
    })

    return groups
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
            <Link to='/createGroup' className={classes.button}>
              <MainButton style={{widht: '100%'}} className={classes.CreateButton}>Create Group</MainButton>
            </Link>
          </Grid> 
        </div>
        <ContextErrorMessage error={this.state.loadingError} contextErrorMsg={'The list of all groups could not be loaded'} onReload={this.getGroups} />
      </div>
    ) 
  }
}

Groups.propTypes = {
  icon: PropTypes.string,
}

export default withRouter(withStyles(styles)(Groups));
