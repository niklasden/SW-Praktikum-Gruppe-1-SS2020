import React, { Component } from 'react'
import PropTypes from 'prop-types';
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
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import ShoppingAPI from '../../api/ShoppingAPI';

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
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
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
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
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
      newgroupmembers:[],
      inputval: '',
      groupnameval:settingsobj.onlySettingsGetSettingsGroupName(),
      newShoppinglistName: '',
      shoppinglists: [],
      error: null,
      newMemberName: '',
      isLoading: false, 
      
    }
    this.deleteMember = this.deleteMember.bind(this);
    this.saveGroup = this.saveGroup.bind(this);
    this.deleteShoppingList = this.deleteShoppingList.bind(this);
    this.fetchspecificShoppinglist = this.fetchspecificShoppinglist.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  async saveGroup() {
    try{
      const rb = {
        id: settingsobj.onlySettingsGetSettingsGroupID(),
        name: this.state.groupnameval,
        description: '',
        creationdate: "2020-03-20T14:30:43"
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
      if(resp.ok){
        this.props.history.push('/Groups')
      }
    } catch(e) {
      this.setState({error: e})
    }
  }
  async deleteGroup(id) {
    this.setState({ isLoading: true })
    try{
    const rInit = {
      method: 'DELETE'
    }
    const resp = await fetch(Config.apiHost + '/Group/' + id, rInit)
    if(resp.ok){
      this.props.history.push('/Groups')
      alert("group and all memberships deleted")
    } else {
     alert("Fehler !")
    }
  } catch(e){alert(e)}
    this.setState({
      groupItemss: this.state.groupItemss.filter(elem => elem.id !== id)       
     // request to db! > delete Group      
    })
  
    if(settingsobj.onlySettingsGetSettingsGroupID() == id){
      settingsobj.onlySettingsSetSettingsGroupID(0)
      settingsobj.onlySettingsSetSettingsGroupName("")
    }

    this.setState({ isLoading: false })
  }
  
  
  deleteMember(usr) {
    //array kopieren, element löschen, neues array als state setzen
    this.setState(prevState => ({
      groupmembers: prevState.groupmembers.filter(item => item !== usr)
    }))
 
    //fetch request zum delete aus der Membership tabelle
    try{
        const rb = {
          User_ID: usr.id,
          Group_ID: settingsobj.onlySettingsGetSettingsGroupID() 
        }
        const requestBody = JSON.stringify(rb)
        const rInit = {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: requestBody
        } 
        
        fetch(Config.apiHost + '/membership/del', rInit) 
        alert("Deleted user with id: " +usr.id + " from this group")
        
        if(this.checkGroupMembers() == false){
          alert("deleting group")
          this.deleteGroup(settingsobj.onlySettingsGetSettingsGroupID())
        }
        
    }catch (error){
      console.log(error)
    }


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
    try{
      let response = await fetch(Config.apiHost + '/User/email/' + this.state.newMemberName);
      let newUser = await response.json() 
      console.log("NEWUSER?", newUser);
      if((newUser && newUser.id)) {
        if(this.state.groupmembers.find(gmember => gmember.id === newUser.id)) {
          alert("User bereits in der Gruppe");
        }else {
          const rb = {
            "User_ID": newUser.id,
            "Group_ID": settingsobj.onlySettingsGetSettingsGroupID()
              }
              const requestBody = JSON.stringify(rb)
              
              const rInitt = {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json'
                }, 
                body: requestBody
              }           
              let res = await fetch(Config.apiHost + '/membership',rInitt)
              this.setState({groupmembers: [...this.state.groupmembers, newUser ]})

        }
      }
    }
  catch (e) {
    
    this.setState({error: e})
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
    this.setState({ isLoading: true })
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
    } catch(e) {
      this.setState({error: e})
    }
    this.setState({ isLoading: false })

  }
  async deleteShoppingList(groupID) {
    this.setState({ isLoading: true })
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
        this.props.history.push('/groups')
      }
    } catch(e) {
      this.setState({error: e});
    }
    this.setState({ isLoading: false })
  }

  async checkGroupMembers(){
    const res = await fetch(Config.apiHost + '/membership/' + settingsobj.onlySettingsGetSettingsGroupID()) //Hier ID übergabe bei getmembersbygroupid = id = settingsobj.onlySettingsGetSettingsGroupID()
    const memberobjects = await res.json()
    
    if(memberobjects.lenght < 1){
      return false
    }else{
      return true
    }
  }

  async fetchGroupMembers(){ //fetch group members for specific gorup
    const res = await fetch(Config.apiHost + '/membership/' + settingsobj.onlySettingsGetSettingsGroupID()) //Hier ID übergabe bei getmembersbygroupid = id = settingsobj.onlySettingsGetSettingsGroupID()
    const gmembers = await res.json()
    
    this.setState({groupmembers:gmembers}) 
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
    this.setState({openAddShoppinglistDialog:false})};
    
    const UserExistCheck = (id) => {
      var r = false
      //console.log("userxc gm: ", this.state.groupmembers)
      this.state.groupmembers.forEach(elem => {
        if(elem.id == id){r = true }  
      }
      )
      if(r == true){
        alert("User already exists !")
        return true
      }else{return false; }
    } 

    const clear = () => {
      this.setState({ fetchuser: '',groupnameval:''})
    }

    /*
    const fetchspecificUser = async () => {
      try {
          let response = await fetch(`http://localhost:8081/api/shoppa/groupmembers/$email`);
          let data = await response.json()
          this.setState({groupmembers: this.state.groupmembers.concat(data)})
          
      }
      catch (error) {
          console.log(error)
      }
    };
    */
  /* 
    const fetchspecificUser = async (email) => {
      try {
          
          let response = await fetch(Config.apiHost + '/User/email/' + email );
          let data = await response.json()
          if (data.name != null){
            const a = UserExistCheck()
            console.log(a)
            
            /* if(UserExistCheck(data.id) == false)
            {
              this.setState({groupmembers: this.state.groupmembers.concat(data)})
              this.setState({newgroupmembers: this.state.newgroupmembers.concat(data)})
            }
            }
          else{
            alert("No user with this email!")
            
          } 
         
      }
      catch (error) {
          console.log(error)
          alert(error)
      }
      
  }; 
  */
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
            <Grid container direction="column" justify="center" alignItems="center" >
            <Grid item xs={12} style={{width: 'inherit'}}>
                <AddCircleItem style={{alignSelf:"center", margin: 12,fontSize:"40px", marginLeft: '45%' }} onClick={() => { handleClickOpenAddMemberDialog() }}></AddCircleItem>
                  {this.renderGroupMembers()}
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel style={{border:"1px solid #5a5a5a", margin:4}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <Typography className={classes.heading}>Shoppinglists</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container direction="column" justify="center" alignItems="center">
              <Grid item xs={12} style={{width: 'inherit'}}>
                <AddCircleItem style={{alignSelf:"center", margin: 12,fontSize:"40px", marginLeft: '45%'}} onClick={() => { handleClickOpenAddMShoppinglistDialog() }}></AddCircleItem>
                <Grid style={{marginLeft: 2}} item xs={12}>
                  {
                    this.state.shoppinglists.length > 0 ?
                      this.state.shoppinglists.map(list => (
                        <Grid container className={classes.shoppingListItem} key={list.id}>
                          <Grid item xs={2}>
                            <ListIcon />
                          </Grid>
                          <Grid item xs={8}>
                          {list.name}
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
        
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
          >
          <Grid item>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <MainButton onclick={this.saveGroup}>SAVE GROUP</MainButton>
              <div style={{marginLeft: 12}}>
                <MainButton onclick={() => this.deleteGroup(this.state.groupID)}>DELETE GROUP</MainButton>
              </div>
            </div>

            {this.state.isLoading &&
              <div style={{display: 'flex', justifyContent: 'center', marginTop: 12}}>
                <CircularProgress size={20} />
              </div>
            }
          </Grid>
        </Grid>


        {/* Dialogs, not part of ui anymore */}
        <Dialog onClose={handleClickCloseAddMemberDialog} aria-labelledby="form-dialog-title" style={{display: 'inline-block'}} open={openAddMemberDialog}>
        <DialogTitle id="form-dialog-title">Add Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please put in the email address, which the user used to signup for our app.
          </DialogContentText>
          
           {/* <Autocomplete
            inputValue={this.state.inputval}
            onInputChange={(event) => {this.setState({inputval: event.target.value})}}
            onChange={() => {this.setState({newMemberName: this.state.inputval})}}

            id="combo-box-demo"
            options={this.state.users}
            getOptionLabel={(user) => user.email}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
          /> */}
          
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(e) => {this.setState({newMemberName: e.target.value })}}
          /> 
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