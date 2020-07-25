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
      unit: this.props.item.unit,
      amount: this.props.item.amount,
      anchorEl: null,
      open: false,
      user: this.props.item.user_id
    }
    this.handleClick = this.onClickItem.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.PressButtonBack = this.PressButtonBack.bind(this);
    this.PressButtonConfirm = this.PressButtonConfirm.bind(this);
    this.handleChangeUnit = this.handleChangeUnit.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
    
  }
  /* set open to true */
  onClickItem(id) {
    this.setState({open : true});
  };

  /* set open to false */
  onCloseItem() {
    this.setState({open : false});
  };

  /* set anchorEl to null */
  handleClose(){
    this.setState({anchorEl:null});
  };

  /* set open to false */
  PressButtonBack(){
    this.setState({open : false});
  };

  /* set open to false */
  PressButtonConfirm(){
    this.setState({open : false});
  };

  /* set unit to unit */
  handleChangeUnit(unit){
    this.setState({unit : unit });
  };

   /* set amount to amount */
  handleChangeAmount(amount){
    this.setState({amount : amount});
  };

  /* set user to user */
  handleChangeUser(user){
    this.setState({user : user});
  };

  render() {
    console.log(this.state.item)
    console.log(this.state.user)
    console.log(this.state.amount)
    return (
    <Grid 
      container
      direction='row'
      justify='center'
      alignItems='center'
      className={this.props.classes.root}
      style={{minWidth:'100%', marginLeft: '0', 
        borderColor: (this.state.user !== null) ? '#00BCD4' : '#BDBDBD', function(){this.forceUpdate()} }}
    >
        <Grid item xs={2}>
         {/*  Displays the Icon of the Article */}
          <CustomIcon style={{marginLeft:15, marginTop:0}} iconName={this.state.item.name}></CustomIcon>
        </Grid>
        <Grid item xs={5} style={{maxWidth:'100%'}} onClick={() => this.handleClick(this.state.item.id)} >
          {/* Displays the name of the Article */}
          {this.props.item.name}
        </Grid>         
        <Grid item xs={3}>
          {/*  Displays the amount and unit of the Article */}
        {this.state.amount !== null && this.state.unit !== 'None'  && this.state.amount+" "+this.state.unit}
        </Grid>
        <Grid item xs={2} onClick={() => this.props.onClickDeleteButton()} >
          {/*  Displays an delete Icon */}
          <Icon style={{marginLeft:10, color: '#00BCD4', marginTop: 5}}>delete</Icon>
        </Grid>
        <EditListItem 
          open={this.state.open} 
          item={this.props.item}
          user={this.props.user} 
          retailer={this.props.retailer} 
          PressButtonBack={() => this.PressButtonBack()}
          PressButtonConfirm={() => this.PressButtonConfirm()}
          onUnitChange={(unit) => this.handleChangeUnit(unit)}
          onAmountChange={(amount) => this.handleChangeAmount(amount)}
          onUserChange={(user) => this.handleChangeUser(user)}
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
  user: PropTypes.string,
}

export default withStyles(styles)(ListItem);