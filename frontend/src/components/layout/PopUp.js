import React, { Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class PopUp extends Component {
  render(){

    return(
      <Dialog
        /* open={open}
        onClose={handleClose} */
        aria-labelledby="alert title"
        aria-describedby="description" 
      >
      <DialogTitle id="alert title">{"Einkauf abschließen?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="description">
          Möchtest Du den Einakuf wirklich abschließen?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button /* onClick={handleClose} */ color="primary">
          YES
        </Button>
        <Button /* onClick={handleClose} */ color="primary" autoFocus>
          NO
        </Button>
      </DialogActions>
    </Dialog>
    )
}}


export default (PopUp);


