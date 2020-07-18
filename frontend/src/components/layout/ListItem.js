import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import EditListItem from './EditListItem';
import CustomIcon from './CustomIcon';

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
      open: false
    }
    this.handleClick = this.onClickItem.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.PressButtonBack = this.PressButtonBack.bind(this);
    this.PressButtonConfirm = this.PressButtonConfirm.bind(this);
    
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
  PressButtonConfirm(){
    this.setState({open : false})
    console.log(this.props.fetchItems());
  }

  render() {
    const open = Boolean(this.state.anchorEl);

    return (
    <Grid 
      container
      direction='row'
      justify='center'
      alignItems='center'
      className={this.props.classes.root}
      style={{minWidth:'100%', marginLeft: '0'}}
    >
        <Grid item xs={2}>
          <CustomIcon style={{marginLeft:15, marginTop:0}} iconName={this.state.item.name}></CustomIcon>
          {/* <Icon style={{marginLeft:10, color: '#00BCD4', marginTop: 3}}>fastfood</Icon> */}
        </Grid>
        <Grid item xs={5} style={{maxWidth:'100%'}} onClick={() => this.handleClick(this.state.item.id)} >
          {this.props.item.name}
        </Grid>         
        <Grid item xs={3}>
          {this.props.item.amount}
          {this.props.item.unit}
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
          PressButtonConfirm={() => this.PressButtonConfirm()}
        />
    </Grid>
    );
  }
}

ListItem.propTypes = {
  itemname: PropTypes.string,
  amount: PropTypes.string,
  unit: PropTypes.string,
  handleChange: PropTypes.string,
  onClick: PropTypes.func,
  onClickListItem: PropTypes.func,
}

export default withStyles(styles)(ListItem);