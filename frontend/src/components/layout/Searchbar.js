import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
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
    width: "292px",
    height: "48px"
  },

  searchIcon: {
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
    fontFamily: 'Roboto'
    
  }
});

class Searchbar extends Component {
  render() {
    return (
      <Box 
        border={1} 
        borderColor='#bdbdbd'
        borderRadius={10}
      >
      <div>
        <div className={this.props.classes.root}>
          <div className={this.props.classes.searchIcon}>
            <SearchIcon style={{ color: "#00BCD4" }} fontSize="medium" />
          </div>

          <InputBase
            placeholder="search…"
            classes={{
              input: this.props.classes.inputInput
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </div>
    </Box>

    );
  }
}

export default withStyles(styles)(Searchbar);