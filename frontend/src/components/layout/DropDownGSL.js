import React, {Component} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ListItem from '../layout/ListItem';
import ShoppingAPI from '../../api/ShoppingAPI';
import ShoppingSettings from '../../../src/shoppingSettings';

const settingsobj = ShoppingSettings.getSettings()

/**
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 * @author [Niklas Denneler] (https://github.com/niklasden)
 * 
*/
class DropDownGSL extends Component {
  state = {
    user:[], 
    retailer: [],
  }
 
  /*on click the state is set new*/
  handleClick(event){
    this.setState({anchorEl: event.currentTarget});
  }

  /*feteches the groupmember of the group*/
  fetchGroupMembers = () => {
    ShoppingAPI.getAPI().getUsers(settingsobj.getGroupID()).then(userBOs => {
      this.setState({
        user: userBOs
      })
      /* console.info(userBOs); */
    }).catch(e => 
      console.log(e)
    )
  }
 
  /*feteches the retailers of the group*/
  fetchRetailers = () => {
    ShoppingAPI.getAPI().getRetailers(settingsobj.getGroupID()).then(retailerBOs => {
      this.setState({
        retailer: retailerBOs
      })
       console.info(retailerBOs); 
    }).catch(e => 
      console.log(e)
    )
  }

  componentDidMount()  {
    this.fetchRetailers();
    this.fetchGroupMembers();
  }

  render(){   
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
        <Typography>
          {this.props.ArrCategory[this.props.item]}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{display: 'grid'}}>
        {this.props.items.map(element => {
          if(element.category === this.props.ArrCategory[this.props.item]){
            return (
              <ListItem 
                style={{marginLeft: 0}} key={element.id}
                onClickDeleteButton={()=>this.props.onClickDeleteButton(element.id)}
                item={element} user={this.state.user} retailer={this.state.retailer}
                fetchItems={this.props.fetchItems} 
              />
            )
          }
          return null
        })}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

DropDownGSL.propTypes = {
  ArrCategory: PropTypes.array.isRequired,
  item: PropTypes.string.isRequired,
}

export default (DropDownGSL);