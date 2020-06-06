import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Popover, IconButton, Avatar, ClickAwayListener, withStyles, Typography, Paper, Button, Grid, Divider } from '@material-ui/core';
import firebase from 'firebase/app';

/**
 * Shows a drop down list for the account infos and a possibility to log out. For closing the pop up menu if 
 * the mouse is clicked outside the menu, the ClickAwayListener component is used.For logging out,
 * firebase.auth().signOut() method is used.
 * 
 * @see See Material-UIs [Popover](https://material-ui.com/components/popover/)
 * @see See Material-UIs [ClickAwayListener](https://material-ui.com/components/click-away-listener/)
 * @see See Googles [firebase authentication](https://firebase.google.com/docs/web/setup)
 * @see See Googles [firebase API reference](https://firebase.google.com/docs/reference/js)
 * 
 */
class ProfileDropDown extends Component {

  // a refernce to the avatar button
  #avatarButtonRef = createRef();

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      open: false,
    }
  }

  /** Handles click events on the avatar button and toggels visibility */
  handleAvatarButtonClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

  /** 
   * Handles click events from the ClickAwayListener.
   * 
   * @see See Material-UIs [ClickAwayListener](https://material-ui.com/components/click-away-listener/)
   */
  handleClose = () => {
    this.setState({
      open: false
    });
  }

  /** 
	 * Handles the click event of the sign in button and uses the firebase.auth() component to sign in.
	 * 
	 * @see See Google [firebase.auth](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
	 * @see See Google [firebase.auth().signOut](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signout)
	 */
  handleSignOutButtonClicked = () => {
    firebase.auth().signOut();
  }

  /** Renders the profile drop down if a loggin user is given as a prop */
  render() {
    const { classes, user } = this.props;
    const { open } = this.state;

    return (
      user ?
        <div>
          <IconButton className={classes.avatarButton} ref={this.#avatarButtonRef} onClick={this.handleAvatarButtonClick}>
            <Avatar src={user.photoURL} />
          </IconButton>

          <Popover open={open} anchorEl={this.#avatarButtonRef.current} onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <ClickAwayListener onClickAway={this.handleClose}>
              <Paper className={classes.profileBox}>
                <Typography align='center'>Hi, {user.displayName}!</Typography>
                <Divider className={classes.divider} />
                <Typography align='center' variant='body2'>{user.email}</Typography>
                <Divider className={classes.divider} />
                <Grid container justify='center'>
                  <Grid item>
                    <Button color='primary' onClick={this.handleSignOutButtonClicked}>Logout</Button>
                  </Grid>
                </Grid>
              </Paper>
            </ClickAwayListener>
          </Popover>
        </div>
        : null
    )
  }
}

/** Component specific styles */
const styles = theme => ({
  avatarButton: {
    float: 'right'
  },
  divider: {
    margin: theme.spacing(1),
  },
  profileBox: {
    padding: theme.spacing(1),
    background: theme.palette.background.default,
  }
});

/** PropTypes */
ProfileDropDown.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The logged in firesbase user */
  user: PropTypes.object,
}

export default withStyles(styles)(ProfileDropDown)
