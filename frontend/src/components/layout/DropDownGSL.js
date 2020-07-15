import React, {Component} from 'react';
import ListItemCheckbox from '../layout/ListItemCheckbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ListItem from '../layout/ListItem';
import ShoppingAPI from '../../api/ShoppingAPI';
import UserBO from '../../api/UserBO';
import ShoppingSettings from '../../../src/shoppingSettings';

const settingsobj = ShoppingSettings.getSettings()

/**
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 * 
*/

class DropDownGSL extends Component {


  constructor(props) {
    super(props)
  }
  state = {
    user:[],
    retailer: [],
  }
 
  handleClick(event){
    this.setState({anchorEl: event.currentTarget});
  };

  handleChangeUnit(v) {
    this.setState({unit: v});
    var newList = [...this.state.items];
    newList.filter(item => item.id !== this.state.selectedID);
    var newObject = this.state.items.find(item => item.id === this.state.selectedID);
    if(v !== "null" || v !== "undefined") {
      newObject.unit = v;
    }
    this.setState({items: newList});
  }
  
  fetchGroupMembers = () => {
    ShoppingAPI.getAPI().getUsers(settingsobj.getGroupID()).then(userBOs => {
      this.setState({
        user: userBOs
      })
      /* console.info(userBOs); */
    }).catch(e => 
        console.log(e)
      );
    
  }
 
  fetchRetailers = () => {
    ShoppingAPI.getAPI().getRetailers(settingsobj.getGroupID()).then(retailerBOs => {
      this.setState({
        retailer: retailerBOs
      })
      /* console.info(retailerBOs); */
    }).catch(e => 
        console.log(e)
      );
  }

  componentDidMount()  {
    this.fetchRetailers();
    this.fetchGroupMembers();
  }

  render(){
    //this.getGroupMembers(); is not working rn, need user objects from julius
    
    return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
      <Typography>
        <Grid container spacing={1}>
        {this.props.ArrCategory[this.props.item]}
        </Grid>
      </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
              {this.props.Useritems.map(element => {
              if(element.category === this.props.ArrCategory[this.props.item]){
              return <ListItem key={element.id} onClickDeleteButton={()=>this.props.onClickDeleteButton(element.id)} item={element} user={this.state.user} retailer={this.state.retailer}></ListItem>
            }
          })}
      </ExpansionPanelDetails>
    </ExpansionPanel>
    )
  }
}

DropDownGSL.propTypes = {
  Useritems: PropTypes.array.isRequired,
  ArrCategory: PropTypes.array.isRequired,
  item: PropTypes.string.isRequired,
}

export default (DropDownGSL);