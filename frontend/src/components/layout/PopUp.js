import React, { Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

/** 
 * PopUp from material UI. This popup is used again and again in the app. 
 * The name, title, open, and onClick are passed as props. 
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 * 
 */
 class PopUp extends Component {

  render(){
    return(
      <Dialog
        open={this.props.open}
        aria-labelledby="alert title"
        aria-describedby="description" 
      >
      {/* The title of the popup is set here */}
      <DialogTitle id="alert title">{this.props.title}</DialogTitle>
      <DialogContent>

      {/* The content of the popup is defined here  */}
        <DialogContentText id="description">
          {this.props.name}
        </DialogContentText>
      </DialogContent>
      <DialogActions>

        {/* Button Yes */}
        <Button onClick={this.props.clickYes} color="primary">
          YES
        </Button>

       {/* Button NO */}
        <Button onClick={this.props.clickNo} color="primary" autoFocus>
          NO
        </Button>

      </DialogActions>
    </Dialog>
    )
}}

PopUp.propTypes = {
  open: PropTypes.bool.isRequired,
  clickNo: PropTypes.bool.isRequired,
  clickYes: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}


export default (PopUp);


