import React, {Component} from 'react';
import ListItemCheckbox from '../layout/ListItemCheckbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

/**
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 * Displays an DropDown per category. For each category the individual ListEntrys are displayed in the DropDown
 * 
*/
class CategoryDropDown extends Component {
  render(){
    return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
      <Typography>
        <Grid container xs={12} spacing={1}>
        {this.props.ArrCategory[this.props.item]}
        </Grid>
      </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>

     {/* All items of the group are contained in this.props.useritems. The map function is used to check whether there are items of the respective * category in user items. If yes, a ListItemCheckbox is created for each item.  */}
        <Typography>
              {this.props.Useritems.map(element => {
              if(element.category === this.props.ArrCategory[this.props.item]){
              return <ListItemCheckbox Checked={this.props.checkeditems.includes(element.id)} handleChange={()=>this.props.handleChange(element.id)} itemname={element.name} amount={element.amount} unit={element.unit} category={element.category} iconname={element.name}></ListItemCheckbox>
            }else {
              return null
            }
          })}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    )
  }
}

CategoryDropDown.propTypes = {
  Useritems: PropTypes.array.isRequired,
  ArrCategory: PropTypes.array.isRequired,
  item: PropTypes.string.isRequired,
  handleChange: PropTypes.string.isRequired,
  checkeditems: PropTypes.array.isRequired,
}

export default (CategoryDropDown);