import React, { Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';


class PopUp extends Component {

  render(){
    return(
      <Dialog
        open={this.props.open}
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
        <Button onClick={this.props.handleChange} color="primary">
          YES
        </Button>
        <Button onClick={this.props.handleChange} color="primary" autoFocus>
          NO
        </Button>
      </DialogActions>
    </Dialog>
    )
}}

PopUp.propTypes = {
  open: PropTypes.bool.isRequired,
  handleChange: PropTypes.bool.isRequired,
}


export default (PopUp);


