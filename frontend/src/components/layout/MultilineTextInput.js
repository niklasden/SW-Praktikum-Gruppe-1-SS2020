import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import InputBase from "@material-ui/core/InputBase";
import Box from '@material-ui/core/Box'

const styles = theme => ({
  inputInput: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 12
  },
});

/**
 * Displays a MultilineTextInput
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 * @property icon (string): The icon name to display, can be either: add, 
 * shopping_cart, shopping_cart_outline, shopping_list, shopping_list_outline, checkmark, people
 * @property onChange (func): a callback function that is called when the value changes
 * @property value (string): the value that is displayed within the input field 
 */
class MultilineTextInput extends Component {
  render(){
    return (
      <Box 
        border={1} 
        borderColor='#BDBDBD'
        borderRadius={10}
        style={{ ...this.props.style}}
      >
        <InputBase
          placeholder={this.props.placeholder}
          classes={{
            input: this.props.classes.inputInput
          }}
          inputProps={{ "aria-label": "search" }}
          fullWidth
          multiline
          rows={8}
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </Box>
    )
  }
}

export default withStyles(styles)(MultilineTextInput);