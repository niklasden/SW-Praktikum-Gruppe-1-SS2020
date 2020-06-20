import React, { Component, memo } from 'react'
import PropTypes from 'prop-types';
import MaterialIconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import MainButton from '../layout/MainButton.js'
import createPalette from '@material-ui/core/styles/createPalette';

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import GroupMember from '../layout/GroupMember.js'
import GroupListItem from '../layout/GroupListItem.js'

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5,
    
  },
  Groupnameheader:{
    ...theme.typography.button,
    backgroundColor: '#000000',
    borderRadius: 5,
    color: theme.palette.white,
    textAlign:"center",
    marginTop:"3%",
    fontSize: '115%'
  },
  accordion:{
    width: '100%',
    marginTop:"3%"
  },
  heading:{
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  }
});

const ShoppingLs=[
  {id:"1",name:"liste 2"},
  {id:"2",name:"list 2.4"}
]
const mem=[
  {id:"1",name:"Julius"},
  {id:"2",name:"Niklas"}]

/**
 * Bildet eine Spezifische Gruppe ab
 * 
 * Beim Aufruf der Specific group muss der name auf den Gruppennamen gesetzt werden
 * 
 * @author [Julius Jacobitz]()
 * 
 */
class SpecificGroup extends Component {
  renderShoppinglists(){
  const ShoppingLists = []
  ShoppingLs.forEach( elem => {
    ShoppingLists.push(<GroupListItem key={elem.id} Listname={elem.name} ></GroupListItem>)
})
return ShoppingLists
  }

  renderGroupMembers(){
    const GroupMembers = []
    mem.forEach( elem => {
      GroupMembers.push(<GroupMember key={elem.id} imgsrc="" membername={elem.name}></GroupMember>)
    })
    return GroupMembers
  }

  render(){
    const { classes } = this.props;
    

    return (
        <div className={classes.accordion}>
        {/*<div className={classes.Groupnameheader}>{"Gruppenname"}</div>*/}

        <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Shopping Lists</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          
           {this.renderShoppinglists()}
        
        </ExpansionPanelDetails>
        </ExpansionPanel>

{/* Members: ---------------------------------------------------------*/}


        <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Members</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          
          
        {this.renderGroupMembers()}
          

        </ExpansionPanelDetails>
        </ExpansionPanel>

        </div>


      
    
    )
  }
}

SpecificGroup.propTypes = {
  icon: PropTypes.string,
}

export default withStyles(styles)(SpecificGroup);