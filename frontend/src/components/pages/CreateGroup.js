import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { 
  TextField, 
  Container, 
  Grid, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemSecondaryAction, 
  ListItemText, 
  Avatar, 
  Typography, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Button
} from '@material-ui/core';
import MainButton from '../layout/MainButton';
import IconButton from '../layout/IconButton';
import avatar from '../img/avatar.jpg';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { Config } from '../../config';
import { withRouter } from "react-router";
import ShoppingAPI from '../../api/ShoppingAPI';
import GroupBO from '../../api/GroupBO';
import ShoppingSettings from '../../shoppingSettings'

const settingsObject = ShoppingSettings.getSettings()

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
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz)
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
        
      ],
      inputval: '',
      groupnameval:'',
      fetchuser: ''
    }
    this.deleteMember = this.deleteMember.bind(this);
    // this.saveGroup = this.saveGroup.bind(this);
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
    const UserExistCheck = (id) => {
      var r = false 
      this.state.groupMembers.forEach(elem => {
        if(elem.id == id){r = true }  
			})
			
      if(r == true){
        alert("User already exists !")
        return true
      } else {
				return false; 
			}  
    } 

    const fetchUser = async (email) => {
			try {
					
				let response = await fetch(Config.apiHost + '/User/email/' + email );
				let data = await response.json()
				console.log(data);
				if (data.name != null){
					if(UserExistCheck(data.id) == false){
						this.setState({groupMembers: this.state.groupMembers.concat(data)})
					}
				} else {
					alert("No user with this email!")
				}
			}
			catch (error) {
				console.log(error)
				alert(error)
			}
    };

    /** 
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

    */

    const clear = () => {
      this.setState({inputval: '', fetchuser: '',groupnameval:''})
    }


    const saveMembershipForCurrentUser = async (gid) => {
      try{
				const rb = {
					User_ID: settingsObject.getCurrentUserID(), 
					Group_ID: gid 
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
					console.log(resp)
				}
			}
			catch (error){
				console.log(error)
			} 
		}

    const saveMemberships = async (gid) => {
      try{

        this.state.groupMembers.forEach(async elem => { 
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
        })

      }catch (error){
        console.log(error)
      }
    
    }

    
    const saveGroup = async () => {
      try {
        const group = {
          id: 1, 
          name: this.state.groupnameval, 
          description: "no description defined in frontend",
          creationdate: "2020-03-20T14:30:43"
        }
        const requestBody = JSON.stringify(group)
        console.log(requestBody)

        const rInit = {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: requestBody
        } 
        
        const resp = await fetch(Config.apiHost + '/Group', rInit)
        if(resp.ok){
          try{
            var respjson = await resp.json()
            //console.log(respjson.id)
            saveMembershipForCurrentUser(respjson.id)
            saveMemberships(respjson.id)

          } catch (error){
            console.log(error)
          }

					this.props.history.push('/settings')
        } else {
          alert("error")
        }
        // alert('The group was saved')
      }
      catch (error) {
				//needs more advanced error handling
				console.log(error)
      } 
    }
 
 /*
   const saveGroup = () => {
     alert();
      let newGroup = new GroupBO(this.state.groupnameval, "no description defined in frontend")
      ShoppingAPI.getAPI().saveGroup(newGroup).then(
        this.props.history.push('/settings')
      ).catch(e =>
        alert(e))
  }; */
    
    return (
        <Container maxWidth="sm" style={{justifyContent: 'center'}}>
            <Grid container style={{ marginTop: "40px", justifyContent: 'center'}}>
                <Grid container spacing={1} alignItems="flex-end" style={{ justifyContent: 'center' }}>
                    <Grid item style={{padding:0, bottom: '0px'}}>
                        <PeopleOutlineIcon className={classes.icon} style={{display: "none", padding: 0, textAlign: "center"}}/>
                    </Grid>
                    <Grid item>
                        <TextField onChange= {(e) => this.setState({groupnameval:e.target.value})} required id="input-with-icon-grid" label="Group Name" style= {{ fontWeight: 'bold'}} />
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
                              <Button onClick={() => {fetchUser(this.state.inputval); handleClose();}} color="primary">
                                ADD
                              </Button>
                            </DialogActions>
                          </Dialog>
                        
                          {groupMembers.map((item) => (
                            <ListItem key={item} style={{marginTop: '5px'}}>
                            <ListItemAvatar>
                                <Avatar>
                                <Avatar alt="Sabine Mustermann" src={avatar}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                //primary={item.firstname +" "+ item.lastname}
                                primary={item.name}
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
                    <MainButton className={classes.CreateButton} onclick={() => saveGroup() }>Create Group</MainButton>
            </Grid>
        </Grid>
        </Container>

    )
  }
}

CreateGroup.propTypes = {
  icon: PropTypes.string,
}

//export default withStyles(useStyles, {withTheme: true})(CreateGroup);
export default withRouter(withStyles(useStyles, {withTheme: true})(CreateGroup));