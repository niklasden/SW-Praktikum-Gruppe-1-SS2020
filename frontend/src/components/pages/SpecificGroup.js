import React, { Component } from 'react'
import PropTypes, { object } from 'prop-types';
import AddCircleItem from '@material-ui/icons/AddCircle'
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/styles";
import { Grid, Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GroupMember from '../layout/GroupMember.js'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Config } from '../../config';
import { withRouter } from "react-router";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/List';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import MainButton from '../layout/MainButton';
import Autocomplete from '@material-ui/lab/Autocomplete';

import ShoppingSettings from '../../../src/shoppingSettings'

const settingsobj = ShoppingSettings.getSettings()

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5,
    
  },
  Groupnameheader:{
    ...theme.typography.button,
    backgroundColor: '#000000',
    borderRadius: 5,
    color: theme.palette.white,
    textAlign:"center",
    marginTop:"3%",
    fontSize: '115%'
  },
  accordion:{
    width: '100%',
    marginTop:"3%"
  },
  shoppingListItem: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    borderColor: '#BDBDBD',
    borderStyle: 'solid',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    height: '45px'
  },
  deleteIcon: {
  },
  heading:{
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },margin: {
    margin: theme.spacing(1),
  }
});
/**
 * Bildet eine Spezifische, editierbare Gruppe ab
 * 
 * Beim Aufruf der Specific group muss der name auf den Gruppennamen gesetzt werden
 * 
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz)
 * 
 */
class SpecificGroup extends Component {
  constructor(props){
    super(props);

    this.state ={
      groupID : settingsobj.onlySettingsGetSettingsGroupID(),
      dense: 'false',
      openAddMemberDialog: false,
      openAddShoppinglistDialog: false,
      users: [],
      groupmembers: [],
      inputval: '',
      groupnameval:settingsobj.onlySettingsGetSettingsGroupName(),
      newShoppinglistName: '',
      shoppinglists: [],
      error: null,
      newMemberName: ''
    }
    this.deleteMember = this.deleteMember.bind(this);
    this.saveGroup = this.saveGroup.bind(this);
    this.deleteShoppingList = this.deleteShoppingList.bind(this);
    this.fetchspecificShoppinglist = this.fetchspecificShoppinglist.bind(this);
  }

  async saveGroup() {
      try{
          const rb = {
            id: settingsobj.onlySettingsGetSettingsGroupID(),
            name: this.state.groupnameval,
            description: ''
          }
          const requestBody = JSON.stringify(rb)
          const rInit = {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: requestBody
          } 
          
          const resp = await fetch(Config.apiHost + '/Group/' + settingsobj.onlySettingsGetSettingsGroupID(), rInit)
      }catch(e) {
      this.setState({error: e})

      }
  }

  deleteMember(id) {
    //array kopieren, element löschen, neues array als state setzen
    this.setState(prevState => ({
      groupmembers: prevState.groupmembers.filter(item => item !== id)
    }))
  };
  async fetchspecificShoppinglist() {
    try {
        let response = await fetch(Config.apiHost + '/shoppinglist/?group_id=' + settingsobj.onlySettingsGetSettingsGroupID());
        let data = await response.json();
        this.setState({shoppinglists: data});
    }
    catch (e) {
      this.setState({error: e})
    }
  };
  async fetchspecificUser() {
    try {
      let response = await fetch(Config.apiHost + '/User/email/' + this.state.newMemberName);
      let newUser = await response.json()
      console.log("NEWUSER?", newUser);
      if((newUser && newUser.id)) {
        if(this.state.groupmembers.find(gmember => gmember.id === newUser.id)) {
          alert("User bereits in der Gruppe");
        }else {
          let response = await fetch(Config.apiHost + '/Group/Usergroup/' + newUser.id);
          alert("User existiert UND ist NICHT in der Gruppe, allerdings gibts noch keine Funktion ihn zur Gruppe hinzuzufügen");
        }
      }
  }
  catch (e) {
    this.setState({error: e})
  }
  }
  
  async fetchGroupMembers(){ //fetch group members for specific gorup
    try {
      const res = await fetch(Config.apiHost + '/membership/' + settingsobj.onlySettingsGetSettingsGroupID()) //Hier ID übergabe bei getmembersbygroupid = id = settingsobj.onlySettingsGetSettingsGroupID()
      const resjson = await res.json()
      const memberids = resjson.User_IDs
      const gmembers = []
      
      memberids.forEach(async elem => {
        const resu = await fetch(Config.apiHost + '/User/'+ elem)
        const resujson = await resu.json()
        gmembers.push(resujson)
        this.setState({groupmembers: gmembers});
  
      })
      //for i in memberids fetch get user member by id append gmembers 
      this.setState({groupmembers:gmembers}) 
    }catch(e) {
      this.setState({error: e});

    }
    
  }
  async getAllShoppingLists() {
    try {
      const res = await fetch(Config.apiHost + '/shoppinglist/all')
      const resjson = await res.json()
      return resjson[0][0];
    }catch(e) {
      this.setState({error: e});
    }
  }

  async fetchAllUsers() {
    try {
      const res = await fetch(Config.apiHost + '/User')
      const resjson = await res.json()
      this.setState({users: resjson})
    }catch(e) {
      this.setState({error: e});
    }
  }

  async addShoppingList(event) {
    var latestShoppinglistID = await this.getAllShoppingLists();
    var newShoppinglistName = this.state.newShoppinglistName;
      try{
          const rb = {
            id: latestShoppinglistID,
            name: newShoppinglistName,
            group_id: settingsobj.onlySettingsGetSettingsGroupID()
          }
          const requestBody = JSON.stringify(rb)
          const rInit = {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: requestBody
          } 
          
          const resp = await fetch(Config.apiHost + '/shoppinglist/', rInit)
          if(resp.ok){
            this.fetchspecificShoppinglist();
          }
      }catch(e) {
      this.setState({error: e})

      }
  }
  async deleteShoppingList(groupID) {
    const shoppinglist = {
      id: parseInt(groupID), 
    }
    try {
      const rInit = {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(shoppinglist)
      } 
      const resp = await fetch(Config.apiHost + '/shoppinglist/' + groupID, rInit)
      if(resp.ok){
        this.fetchspecificShoppinglist();
      }
    }catch(e) {
      this.setState({error: e});
    }
  }
    
  componentDidMount(){
    this.fetchGroupMembers()
    this.fetchAllUsers();
    this.fetchspecificShoppinglist();
  }


  renderGroupMembers(){
    const GroupMembers = []
    this.state.groupmembers.forEach( elem => {   
      GroupMembers.push(
        <GroupMember onclick={ this.deleteMember.bind(this, elem)} key={elem.id} imgsrc={elem.imgsrc} membername={elem.name}></GroupMember>
      )
    })
    return GroupMembers
  }

  render(){
    const {error, errorMsg} = this.state;
    const { classes } = this.props;
    var openAddMemberDialog = this.state.openAddMemberDialog;
    var openAddShoppinglistDialog = this.state.openAddShoppinglistDialog;
    
    const handleClickOpenAddMemberDialog = () => {
        this.setState({openAddMemberDialog:true});
    };
    const handleClickCloseAddMemberDialog = () => {
      this.setState({openAddMemberDialog:false})
    };
    const handleClickOpenAddMShoppinglistDialog = () => {
      this.setState({openAddShoppinglistDialog:true});
  };
  const handleClickCloseAddShoppinglistDialog = () => {
    this.setState({openAddShoppinglistDialog:false})
  };
    return (
      <div className={classes.accordion}>
        {error ? 
        <ContextErrorMessage error={error} message={errorMsg} />
        :
        <>
       <TextField
          onChange= {(e) => this.setState({groupnameval:e.target.value})}
          id="standard-helperText"
          label="Group Name"
          defaultValue= {settingsobj.onlySettingsGetSettingsGroupName()}
          helperText=""
        />
        <ExpansionPanel style={{border:"1px solid #5a5a5a", margin:4}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <Typography className={classes.heading}>Members</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12} direction="column" justify="center" alignItems="center" >
                <AddCircleItem style={{alignSelf:"center", margin: 12,fontSize:"40px" }} onClick={() => { handleClickOpenAddMemberDialog() }}></AddCircleItem>
                <Grid style={{marginLeft: 2}} item direction='column' justify='space-between' alignItems="stretch" xs={12}>
                  {this.renderGroupMembers()}
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel style={{border:"1px solid #5a5a5a", margin:4}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <Typography className={classes.heading}>Shoppinglists</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12} direction="column" justify="center" alignItems="center" >
                <AddCircleItem style={{alignSelf:"center", margin: 12,fontSize:"40px" }} onClick={() => { handleClickOpenAddMShoppinglistDialog() }}></AddCircleItem>
                <Grid style={{marginLeft: 2}} item direction='column' justify='space-between' alignItems="stretch" xs={12}>
                  {
                    this.state.shoppinglists.length > 0 ?
                      this.state.shoppinglists.map(list => (
                        <Grid container xs={12} className={classes.shoppingListItem}>
                          <Grid item xs={2}>
                            <ListIcon />
                          </Grid>
                          <Grid item xs={8}>
                          <t style={{color: '#000000', fontSize: 18}}>{list.name}</t>
                          </Grid>
                          <Grid item xs={2}>
                              <IconButton style={{padding:0}} className={classes.deleteIcon} onClick={() => { this.deleteShoppingList(list.id) }}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))
                      :
                      <div />
                  }
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <MainButton onclick={this.saveGroup}>SAVE GROUP</MainButton>

        <Dialog onClose={handleClickCloseAddMemberDialog} aria-labelledby="form-dialog-title" style={{display: 'inline-block'}} open={openAddMemberDialog}>
        <DialogTitle id="form-dialog-title">Add Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please put in the email address, which the user used to signup for our app.
          </DialogContentText>
          <Autocomplete
            id="combo-box-demo"
            options={this.state.users}
            getOptionLabel={(user) => user.email}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(e) => {this.setState({newMemberName: e.target.value })}}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseAddMemberDialog} color="primary">
            CANCEL
          </Button>
          <Button onClick={() => {this.fetchspecificUser();  handleClickCloseAddMemberDialog();}} color="primary">
            ADD
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={handleClickCloseAddShoppinglistDialog} aria-labelledby="form-dialog-title" style={{display: 'inline-block'}} open={openAddShoppinglistDialog}>
        <DialogTitle id="form-dialog-title">Add Shoppinglist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please put in the name of the new shoppinglist.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={(e) => {this.setState({newShoppinglistName: e.target.value })}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseAddShoppinglistDialog} color="primary">
            CANCEL
          </Button>
          <Button onClick={(e) => {this.addShoppingList(e); handleClickCloseAddShoppinglistDialog(); }} color="primary">
            ADD
          </Button>
        </DialogActions>
      </Dialog>
      </>
      }
    </div>
    )
  }
}

SpecificGroup.propTypes = {
  icon: PropTypes.string,
}

export default withRouter(withStyles(styles)(SpecificGroup));