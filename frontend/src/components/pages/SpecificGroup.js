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
      inputval: '',
      groupnameval:settingsobj.onlySettingsGetSettingsGroupName()
    }

    this.deleteMember = this.deleteMember.bind(this);
  }

  deleteMember(id) {
    //array kopieren, element löschen, neues array als state setzen
    this.setState(prevState => ({
      groupmembers: prevState.groupmembers.filter(item => item !== id)
    }))
  };

  /*
  addMember(id) {
    this.setState({groupmembers: [...this.state.groupmembers, {name: this.state.inputval, } ]})
  }*/

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
    
    const { classes } = this.props;
    var open = this.state.open;
    
    const handleClickOpen = () => {
        this.setState({open:true});
    };
    const handleClose = () => {
      this.setState({open:false})
    };

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
            //console.log(respjson.id)
            //saveMemberships(respjson.id)

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

        {/*

          //commented out, because we don't need multiple lists per group

        <ExpansionPanel style={{border:"1px solid #5a5a5a", margin:4}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Shopping Lists</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <>
          <Grid 
        style={{marginLeft: 2}}
        container
        direction='column'
        justify='space-between'
        alignItems="stretch"
        xs={12}
        spacing={1}        
      >
        <IconButton aria-label="add" className={this.props.classes.margin} style={{padding:0}}>
        <AddCircleItem style={{alignSelf:"center", margin: 12}}></AddCircleItem>
          </IconButton>
        

           {this.renderShoppinglists()}
           </Grid>

        </>
        </ExpansionPanelDetails>
        </ExpansionPanel>

        */}

{/* Members: ---------------------------------------------------------*/}

        <ExpansionPanel style={{border:"1px solid #5a5a5a", margin:4}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Members</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
      <Grid item xs="12" style={{}}>
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          > 
        <AddCircleItem style={{alignSelf:"center", margin: 12,fontSize:"40px" }} onClick={() => { handleClickOpen() }}></AddCircleItem>
        <Grid 
          style={{marginLeft: 2}}
          container
          direction='column'
          justify='space-between'
          alignItems="stretch"
          xs={12}
      >
              {this.renderGroupMembers()}
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
            onChange={(e) => {this.setState({groupnameval: e.target.value })}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button onClick={() => {fetchspecificUser();  handleClose();}} color="primary">
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