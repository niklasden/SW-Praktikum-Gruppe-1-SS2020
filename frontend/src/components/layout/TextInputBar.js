import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/styles";
import Box from '@material-ui/core/Box'

/**
 * Displays an icon button as designed in figma
 * 
 * @author [Pia Schmid](https://github.com/PiaSchmid)
 * 
*/

const styles = theme => ({
  root: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    width: "auto",
    height: "48px"
  },

  icon: {
    paddingLeft: "16px",
    paddingTop: "12px",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  inputInput: {
    paddingLeft: "64px",
    paddingTop: "15px",
    fontSize: '18px',
  }
});

class TextInputBar extends Component {
  render() {
    return (
      <Box 
        border={1} 
        borderColor='#bdbdbd'
        borderRadius={10}
        boxShadow={0}
      >
      <div>
        <div className={this.props.classes.root}>
          <div className={this.props.classes.icon}>
            <Icon style={{ color: "#00BCD4" }} >{this.props.icon}</Icon>
          </div>

          <InputBase
            placeholder={this.props.placeholder}
            classes={{
              input: this.props.classes.inputInput
            }}
            inputProps={{ "aria-label": "search" }}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    </Box>

    );
  }
}

export default withStyles(styles)(TextInputBar);