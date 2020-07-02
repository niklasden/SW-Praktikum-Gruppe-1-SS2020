import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import PropTypes from 'prop-types';
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
  /*   width: 'auto', */
    marginLeft: 13,
    height: 35,
    marginRight: 0,
 /*    minWidth: '100%' */
    maxWidth: '100vh'
  },
});

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item
    }
  }
  render() {
    return (
    <Grid 
      container
      direction='row'
      justify='center'
      alignItems='center'
      className={this.props.classes.root}
      handleChange={this.props.handleChange}
    >
        <Grid item xs={2}>
          <Icon style={{marginLeft:10, color: '#00BCD4', marginTop: 3}}>fastfood</Icon>
        </Grid>

        <Grid item xs={6} onClick={() => this.props.onClickListItem()} style={{maxWidth:'165px'}} >
          <t style={{color: '#000000', fontSize: 18, margin:0, padding: 0}}>{this.props.itemname}</t>
        </Grid>         

        <Grid item xs={2}>
          <t style={{color: '#000000', fontSize: 18}}>{this.props.amount}</t>
          <t style={{color: '#000000', fontSize: 18}}>{this.props.unit}</t>
        </Grid>

        <Grid item xs={2} onClick={() => this.props.onClick()} >
          <Icon style={{marginLeft:10, color: '#00BCD4', marginTop: 5}}>delete</Icon>
        </Grid>
    </Grid>
    );
  }
}

ListItem.propTypes = {
  imgsrc: PropTypes.string.isRequired,
  itemname: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  handleChange: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickListItem: PropTypes.func.isRequired,
}

export default withStyles(styles)(ListItem);