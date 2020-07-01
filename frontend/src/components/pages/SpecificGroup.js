import React, { Component, memo } from 'react'
import PropTypes from 'prop-types';
import AddCircleItem from '@material-ui/icons/AddCircle'
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
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
import MainButton from '../layout/MainButton'


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
      
      dense: 'false',
        open: false,
        groupmembers: [
            {
              id: 'a',
              name: 'Robin',
              
              
            },
            {
              id: 'b',
              name: 'Dave',
              
              
            },
          ],
          inputval: ''
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

  async fetchGroupMembers(){
    const res = await fetch('http://jj-surface:8081/api/shoppa/specificGroupMembers')
    const resjson = await res.json()
    console.log( resjson)
    this.setState({groupmembers:resjson})}
    

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
      GroupMembers.push(<GroupMember onclick={ this.deleteMember.bind(this, elem)} key={elem.id} imgsrc={elem.imgsrc} membername={elem.name}></GroupMember>)
    })
    return GroupMembers
  }

  render(){
    const { classes } = this.props;
    var dense = this.state.dense;
    var open = this.state.open;
    var groupMembers = this.state.groupmembers;
    
    const handleClickOpen = () => {
        this.setState({open:true});
    };
    const handleClose = () => {
      this.setState({open:false})
  };

/*
  async function fetchspecificUser_A(email){
    try {
        let response = await fetch(`http://localhost:8081/api/shoppa/groupmembers/{$email}`);
        let data = await response.json()
        this.setState({groupmembers: this.state.groupMembers.concat(data)})
        return data;
    //getUserAsync('yourUsernameHere').then(data => console.log(data)); 
    }
    catch (error) {
        console.log(error)
    }
};
*/
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




const clear = () => {
  this.setState({inputval: '', fetchuser: ''})
}


const saveGroup = async () => {
  try {
      //send request with paramets to backend for the group to be saved
      alert('The group was saved')
  }
  catch (error) {
      //
      console.log(error)
  } 
}
    return (
        <div className={classes.accordion}>
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
         <> 
         
<Grid item xs="12" style={{}}>
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
                                onChange={(e) => this.setState({inputval: e.target.value })}
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

            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >               
        <Grid item xs="12" alignItems="center" >
        <AddCircleItem style={{alignSelf:"center", margin: 12,fontSize:"40px" }} onClick={() => { handleClickOpen() }}></AddCircleItem>
        </Grid>
        </Grid>
        <Grid item xs="12">
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
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >               
        <Grid item xs="12" alignItems="center" >
        <MainButton className={classes.CreateButton} onclick={() => {saveGroup()} }>Save Group</MainButton>
        </Grid>
        </Grid>
        </Grid>
          </>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
    
    )
  }
}
SpecificGroup.propTypes = {
  icon: PropTypes.string,
}

export default withStyles(styles)(SpecificGroup);