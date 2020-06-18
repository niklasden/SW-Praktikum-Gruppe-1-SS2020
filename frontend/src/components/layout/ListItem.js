import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Checkbox from "@material-ui/core/Checkbox"
import { withStyles } from "@material-ui/styles";
import Box from '@material-ui/core/Box'

/**
 * Displays an list item as designed in figma
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 * 
*/

const styles = theme => ({
  root: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    width: "292px",
    height: "48px"
  },

  ListItem: {
    paddingLeft: "16px",
    paddingTop: "12px",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  Checkbox: {
    paddingLeft: "64px",
    paddingTop: "15px",
    fontSize: '18px',
    fontFamily: 'Roboto'
    
  }
});

class ListItem extends Component {
  render() {
    return (
      <Box 
        border={1}
        borderColor='#F2F2F2'
        borderRadius={10}
        style={{display: 'inline-block'}}
      >

  
      <div>
        <div className={this.props.classes.root}>
          <div className={this.props.classes.ListItem}>
            <SearchIcon style={{ color: "#00BCD4" }} fontSize="medium" />
          </div>

          <p>{this.props.itemname}</p>

          <Checkbox className={this.props.classes.Checkbox} checked='false'></Checkbox>

         
        </div>
      </div>
    </Box>

    );
  }
}

Article.propTypes = {
  itemname: PropTypes.string.isRequired,
}

export default withStyles(styles)(ListItem);