import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

const styles = theme => ({

})

/**
 * Displays a snackbar to show an error, it should be inserted at the end of a component
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 * @property snackbarOpen (boolean): A boolean that indicates whether the snackbar is open
 * @property onRequestClose (function): a function that is executed when the user wants to close the snackbar
 * it should normaly change the snackbar open state to false
 * @property errorMessage (string): A string with an error message that is displayed within the snackbar
 */
class ErrorSnackbar extends Component {
  render(){
    if (this.props.snackbarOpen){
      // we only want to show the error message for max 2 seconds, so we call the
      // onRequestClose after the rendering took 2 seconds
      setTimeout(() => {
        this.props.onRequestClose()
      }, 2000)
    }
    

    return (
      <Snackbar
        open={this.props.snackbarOpen}
        onClose={this.props.onRequestClose}
        message={this.props.errorMessage}
        action={
          <Button 
            color="inherit" 
            size="small"
            onClick={this.props.onRequestClose}
          >
            Close
          </Button>
        }
      />
    )
  }
}

export default withStyles(styles)(ErrorSnackbar)