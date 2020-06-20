import React, { Comonent, Component } from 'react'
import { withStyles } from '@material-ui/styles';
import InputBase from "@material-ui/core/InputBase";
import Box from '@material-ui/core/Box'

const styles = theme => ({
  inputInput: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    width: "292px",
    height: "48px"
  },
});

class MultilineTextInput extends Component {
  render(){
    return (
      <Box 
        border={1} 
        borderColor='#BDBDBD'
        borderRadius={10}
        style={{display: 'inline-block'}}
      >
        <InputBase
          placeholder={this.props.placeholder}
          classes={{
            input: this.props.classes.inputInput
          }}
          inputProps={{ "aria-label": "search" }}
          fullWidth
        />
      </Box>
    )
  }
}

export default withStyles(styles)(MultilineTextInput);