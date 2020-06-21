import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import MainButton from '../layout/MainButton';
import Container from '@material-ui/core/Container';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { Grid, } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import avatar from '../img/avatar.jpg';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';



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

var userArray = [0,1,2];
function generate(element) {
    return userArray.map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

function del(item) {
    // tbd
};

/**
 * ToDo: Outline around Icon
 * 
 * @author [Niklas Denneler](https://github.com/)
 * @author [Julius Jacobitz]()
 * 
 * @property icon (string): the icon name to display, can be either: add, shopping_cart, shopping_cart_outline, shopping_list, shopping_list_outline, checkmark, people
 */
class CreateGroup extends Component {
    state = {
        dense: 'false',
        open: false,
      }
  render(){
    const { classes } = this.props;
    var dense = this.state.dense;
    var open = this.state.open;
    
    const handleClickOpen = () => {
        this.setState({open:true});
    };
    
    const handleClose = () => {
        this.setState({open:false})
    };

    const fetchUser = () => {
        alert("added User")
    };
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
                                <AddCircleIcon style={{fontSize:40}} onClick={() => { handleClickOpen() }}/>
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
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose} color="primary">
                                CANCEL
                              </Button>
                              <Button onClick={() => {handleClose(); fetchUser();}} color="primary">
                                ADD
                              </Button>
                            </DialogActions>
                          </Dialog>
                        {generate(
                            <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                <Avatar alt="Sabine Mustermann" src={avatar}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Sabine Mustermann"
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                <DeleteIcon onClick={() => { del() }}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                            </ListItem>,
                        )}
                        </List>
                    </div>
            </Grid>
            <Grid item xs="12" style={{}}>
                    <MainButton className={classes.CreateButton} onclick={() => {} }>Create Group</MainButton>
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