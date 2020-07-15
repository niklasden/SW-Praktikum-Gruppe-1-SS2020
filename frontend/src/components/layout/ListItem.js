import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import EditListItem from './EditListItem'
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
    marginLeft: 13,
    height: 35,
    marginRight: 0,
    maxWidth: '100vh',
    marginTop: '2px',
    marginBottom: '4px'
  },
});

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      anchorEl: null,
    }
    this.handleClick = this.onClickItem.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.PressButtonBack = this.PressButtonBack.bind(this);

  }
  onClickItem(id) {
    this.setState({open : true})
  }
  onCloseItem() {
    this.setState({open: false})
  }
  handleClose(){
    this.setState({anchorEl:null});
  };
  PressButtonBack(){
    this.setState({open : false})
  }

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
    <Grid 
      container
      direction='row'
      justify='center'
      alignItems='center'
      className={this.props.classes.root}
      style={{minWidth:'300px'}}
    >
        <Grid item xs={2}>
          <Icon style={{marginLeft:10, color: '#00BCD4', marginTop: 3}}>fastfood</Icon>
        </Grid>
        <Grid item xs={6} style={{maxWidth:'165px'}} onClick={() => this.handleClick(this.state.item.id)} >
          <t style={{color: '#000000', fontSize: 18, margin:0, padding: 0}}>{this.state.item.name}</t>
        </Grid>         

        <Grid item xs={2}>
          <t style={{color: '#000000', fontSize: 18}}>{this.state.item.amount}</t>
          <t style={{color: '#000000', fontSize: 18}}>{this.state.item.unit}</t>
        </Grid>

        <Grid item xs={2} onClick={() => this.props.onClickDeleteButton()} >
          <Icon style={{marginLeft:10, color: '#00BCD4', marginTop: 5}}>delete</Icon>
        </Grid>
        <EditListItem 
          open={this.state.open} 
          item={this.state.item}
          user={this.props.user} 
          retailer={this.props.retailer} 
          PressButtonBack={() => this.PressButtonBack()}
        />
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