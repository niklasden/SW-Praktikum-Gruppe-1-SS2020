import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import PropTypes from 'prop-types';
import Checkbox from "@material-ui/core/Checkbox"
import { withStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

/**
 * Displays an list item as designed in figma
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 * 
*/

const styles = theme => ({
  root: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    borderColor: '#BDBDBD',
    borderStyle: 'solid',
    width: 'auto',
    height: 35,
    marginLeft: 5,
    marginRight: 8,
  },
});

class ListItem extends Component {
  render() {
    return (
    <Grid 
      container 
      direction='row'
      justify='space-between'
      alignItems='center'
      className={this.props.classes.root}
       >
        <Grid item xs={2}>
          <img style={{height:'25px', width: '25px', marginLeft: 10}} src={this.props.imgsrc}></img>
        </Grid>

        <Grid item xs={8}>
          <p style={{color: '#000000', fontSize: 18}}>{this.props.itemname}</p>
        </Grid>

        <Grid item xs={2}>
          <Checkbox className={this.props.classes.checkbox}></Checkbox>
        </Grid>
    </Grid>
    );
  }
}

ListItem.propTypes = {
  imgsrc: PropTypes.string.isRequired,
  itemname: PropTypes.string.isRequired,
}

export default withStyles(styles)(ListItem);