import React, { Component } from 'react'
import PropTypes, { object } from 'prop-types';
import AddCircleItem from '@material-ui/icons/AddCircle'
import MaterialIconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import createPalette from '@material-ui/core/styles/createPalette';
import { Grid, Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GroupMember from '../layout/GroupMember.js'
import GroupListItem from '../layout/GroupListItem.js'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MainButton from '../layout/MainButton';
import { Config } from '../../config';
import { withRouter } from "react-router";
import Groups from './Groups'
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
  heading:{
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },margin: {
    margin: theme.spacing(1),
  }
});


const ShoppingLs=[
  {id:"1",name:"liste 2"},
  {id:"2",name:"list 2.4"}
]
  

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
      open: false,
      groupmembers: [],
      newgroupmembers:[],
      inputval: '',
      groupnameval:settingsobj.onlySettingsGetSettingsGroupName()
    
    }

    this.deleteMember = this.deleteMember.bind(this);
  }
  async deleteGroup(id) {
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
  }catch(e){alert(e)}
    this.setState({
            groupItemss: this.state.groupItemss.filter(elem => elem.id !== id)       
     // request to db! > delete Group      
   })
  
   if(settingsobj.onlySettingsGetSettingsGroupID() == id){
      settingsobj.onlySettingsSetSettingsGroupID(0)
      settingsobj.onlySettingsSetSettingsGroupName("")
  }
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
  async checkGroupMembers(){
    const res = await fetch(Config.apiHost + '/membership/' + settingsobj.onlySettingsGetSettingsGroupID()) //Hier ID übergabe bei getmembersbygroupid = id = settingsobj.onlySettingsGetSettingsGroupID()
    const resjson = await res.json()
    const memberids = resjson.User_IDs
    if(memberids.lenght < 1){
      return false
    }else{
      return true
    }
  }

  async fetchGroupMembers(){ //fetch group members for specific gorup
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
  }
    
  componentDidMount(){
    this.fetchGroupMembers()
  }
  
  renderShoppinglists(){
    const ShoppingLists = []
    ShoppingLs.forEach( elem => {
      ShoppingLists.push(<GroupListItem key={elem.id} Listname={elem.name} ></GroupListItem>)
    })
    return ShoppingLists
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
    //console.log("specific gorupmembers: ",this.state.groupmembers)
    const { classes } = this.props;
    var open = this.state.open;
    
    const handleClickOpen = () => {
        this.setState({open:true});
    };
    const handleClose = () => {
      this.setState({open:false})
    };
    
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
            */
          } 
         
      }
      catch (error) {
          console.log(error)
          alert(error)
      }
      
  };

  const saveMemberships = async (gid) => {
    try{

      this.state.newgroupmembers.forEach(async elem => { 
        const rb = {
          User_ID: elem.id,
          Group_ID: gid // irgendwo her aus der gespeicherten gruppe 
        }
        const requestBody = JSON.stringify(rb)
        const rInit = {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: requestBody
        } 
        
        const resp = await fetch(Config.apiHost + '/membership', rInit)
        if(resp.ok){
          console.log(resp)}
          else{
            console.log("savemembership went wrong", requestBody)
          }
      })
      


    }catch (error){
      console.log(error)
    }try{

      this.state.newgroupmembers.forEach(async elem => { 
        const rb = {
          User_ID: elem.id,
          Group_ID: gid // irgendwo her aus der gespeicherten gruppe 
        }
        const requestBody = JSON.stringify(rb)
        const rInit = {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: requestBody
        } 
        
        const resp = await fetch(Config.apiHost + '/membership', rInit)
        if(resp.ok){
          console.log(resp)}
          else{
            console.log("savemembership went wrong", requestBody)
          }
      })
      


    }catch (error){
      console.log(error)
    }
  
  }

    const saveGroup = async () => {
      try {
        const group = {
          id: settingsobj.onlySettingsGetSettingsGroupID(), 
          name: this.state.groupnameval, 
          description: "no description defined in frontend"
        }
        const requestBody = JSON.stringify(group)
      
        const rInit = {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: requestBody
        } 
        
        const resp = await fetch(Config.apiHost + '/Group/' + group.id, rInit)
        
        if(resp.ok){
          try{
            var respjson = await resp.json()
            console.log(respjson)
            
            saveMemberships(group.id)
            
            this.setState({newgroupmembers:[]})

          }catch (error){
            console.log(error)
            alert(error)
          }

            this.props.history.push('/settings')
        } else {
          alert("error")
        }

          alert('The group was saved')
      }
      catch (error) {
          //needs more advanced error handling
          console.log(error)
          
      } 
    }
      
      /**
      try {
        
        //put oder so zu group //send request with paramets to backend for the group to be saved 
        alert('The group was saved')
      
      }
      catch (error) {
        //
        console.log(error)
      } 
    } */

    return (
      <div className={classes.accordion}>
       <TextField
          onChange= {(e) => this.setState({groupnameval:e.target.value})}
          id="standard-helperText"
          label="Group Name"
          defaultValue= {settingsobj.onlySettingsGetSettingsGroupName()}
          helperText=""
        />

        {/*<div className={classes.Groupnameheader}>{"Gruppenname"}</div>*/}


          {/* commented out, because we don't need multiple lists per group */}

        <ExpansionPanel style={{border:"1px solid #5a5a5a", margin:4}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <Typography className={classes.heading}>Members</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12} direction="column" justify="center" alignItems="center" >
                <AddCircleItem style={{alignSelf:"center", margin: 12,fontSize:"40px" }} onClick={() => { handleClickOpen() }}></AddCircleItem>
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
                <AddCircleItem style={{alignSelf:"center", margin: 12,fontSize:"40px" }} onClick={() => { handleClickOpen() }}></AddCircleItem>
                <Grid style={{marginLeft: 2}} item direction='column' justify='space-between' alignItems="stretch" xs={12}>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <MainButton className={classes.CreateButton} onclick={() => {saveGroup()} }>Save Group</MainButton>
        <Dialog onClose={handleClose} aria-labelledby="form-dialog-title" style={{display: 'inline-block'}} open={open}>
        <DialogTitle id="form-dialog-title">Add Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please put in the email address, which the user used to signup for our app.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(e) => {this.setState({inputval: e.target.value })}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleClose();clear();}} color="primary">
            CANCEL
          </Button>
          <Button onClick={() => {fetchspecificUser(this.state.inputval);  handleClose();}} color="primary">
            ADD
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    
    )
  }
}

SpecificGroup.propTypes = {
  icon: PropTypes.string,
}

//export default withStyles(styles)(SpecificGroup);
export default withRouter(withStyles(styles)(SpecificGroup));