import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {TextField, Container, Grid, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@material-ui/core';
import MainButton from '../layout/MainButton';
import IconButton from '../layout/IconButton';
import avatar from '../img/avatar.jpg';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

const useStyles = (theme) => ({
  root: {
  },
  icon: {
      fontSize: 48,
  },
  CreateButton: {
      justifyContent: 'left'
  },
  title: {
      fontWeight: "bold"
  }
});

/**
 * @author [Niklas Denneler](https://github.com/niklasden)
 * Renders a Page which allows the User to create a new group and opens a modal to add/delete members via their e-mail.
 * 
 * 
 * ToDo: Outline around Icon
 *       Avatar Image from Google, instead of hardcoded
 *       Error Handling for when user not found.
 *       Error Handling for when the group name already exists.
 * 
 * @author [Julius Jacobitz]()
 * 
 * 
 */
class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        dense: 'false',
        open: false,
        groupMembers: [
            {
              id: 'a',
              firstname: 'Robin',
              lastname: 'Wieruch',
              
            },
            {
              id: 'b',
              firstname: 'Dave',
              lastname: 'Davids',
              
            },
          ],
          inputval: '',
          fetchuser: ''
      }
      this.deleteMember = this.deleteMember.bind(this);
    }

    deleteMember(id) {
        //array kopieren, element löschen, neues array als state setzen
        this.setState(prevState => ({
            groupMembers: prevState.groupMembers.filter(item => item !== id)
       }))
    };

    addMember(id) {
        this.setState({groupMembers: [...this.state.groupMembers, {firstname: this.state.inputval, } ]})
    }

  render(){
    const { classes } = this.props;
    var dense = this.state.dense;
    var open = this.state.open;
    var groupMembers = this.state.groupMembers;
    
    const handleClickOpen = () => {
        this.setState({open:true})
    };
    
    const handleClose = () => {
        this.setState({open:false})
    };

    const fetchUser = async () => {
        try {
            let response = await fetch(`http://localhost:8081/api/shoppa/groupmembers/$email`);
            let data = await response.json()
            this.setState({groupMembers: this.state.groupMembers.concat(data)}) 
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
          //needs more advanced error handling
          console.log(error)
      } 
    }
    
    return (
        <Container maxWidth="sm" style={{justifyContent: 'center'}}>
            <Grid container style={{ marginTop: "40px", justifyContent: 'center'}}>
                <Grid container spacing={1} alignItems="flex-end" style={{ justifyContent: 'center' }}>
                    <Grid item style={{padding:0, bottom: '0px'}}>
                        <PeopleOutlineIcon className={classes.icon} style={{display: "none", padding: 0, textAlign: "center"}}/>
                    </Grid>
                    <Grid item>
                        <TextField required id="input-with-icon-grid" label="Group Name" style= {{ fontWeight: 'bold'}} />
                     </Grid>
                </Grid>
                <Grid item xs={12} md={6} style= {{ marginTop: "20px"}}>
                    <Typography variant="h6" className={classes.title}>
                        Your group members:
                    </Typography>
                    <div className={classes.demo}>
                        <List dense={dense}>
                        <ListItem style={{backgroundColor: '#fafafa', borderRadius: '1em'}} >
                            <ListItemAvatar style={{}}>
                                <IconButton style={{marginLeft: 12, marginRight: 12}} icon='add' onclick={() => { handleClickOpen() }}/>
                            </ListItemAvatar>
                            <ListItemText primary="Add member"/>
                            </ListItem>
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
                              <Button onClick={() => {handleClose(); clear();}} color="primary">
                                CANCEL
                              </Button>
                              <Button onClick={() => {fetchUser(); handleClose();}} color="primary">
                                ADD
                              </Button>
                            </DialogActions>
                          </Dialog>
                        
                          {groupMembers.map((item) => (
                            <ListItem key={item}>
                            <ListItemAvatar>
                                <Avatar>
                                <Avatar alt="Sabine Mustermann" src={avatar}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.firstname +" "+ item.lastname}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" icon="delete" onclick={this.deleteMember.bind(this, item)}></IconButton>
                            </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                        </List>
                    </div>
            </Grid>
            <Grid item xs="12" style={{}}>
                    <MainButton className={classes.CreateButton} onclick={() => {saveGroup()} }>Create Group</MainButton>
            </Grid>
        </Grid>
        </Container>

    )
  }
}

CreateGroup.propTypes = {
  icon: PropTypes.string,
}

export default withStyles(useStyles, {withTheme: true})(CreateGroup);