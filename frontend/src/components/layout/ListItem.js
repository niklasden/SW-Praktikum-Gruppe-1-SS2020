import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import PropTypes from 'prop-types';
import Checkbox from "@material-ui/core/Checkbox"
import { withStyles } from "@material-ui/styles";
import Box from '@material-ui/core/Box'
import MaterialIconButton from '@material-ui/core/IconButton';

/**
 * Displays an list item as designed in figma
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 * 
*/

const styles = theme => ({
  root: {
    backgroundColor: '#F2F2F2',
    width: 'auto',
    height: "35px",
    display: 'flex',
    alignItems: 'center'
  },

  checkbox: {
    marginLeft: '210px'
  },
});

class ListItem extends Component {
  render() {
    return (
     <Box
        border={1}
        borderColor='#BDBDBD'
        borderRadius={10}
        style={{margin: '10px'}}
      >

        <div className={this.props.classes.root}>

          <img style={{height:25, width: 25, marginLeft: '15px'}} src={this.props.imgsrc}></img>

          <p style={{color: '#000000', marginLeft: '20px', fontSize: 18}}>{this.props.itemname}</p>

          <Checkbox className={this.props.classes.checkbox}></Checkbox>

        </div>
    </Box>

    );
  }
}

ListItem.propTypes = {
  imgsrc: PropTypes.string.isRequired,
  itemname: PropTypes.string.isRequired,
}

export default withStyles(styles)(ListItem);