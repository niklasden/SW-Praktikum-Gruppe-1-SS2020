import React, { Component, memo } from 'react'
import PropTypes from 'prop-types';
import MaterialIconButton from '@material-ui/core/IconButton';

import AddCircleItem from '@material-ui/icons/AddCircle'

import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';

import createPalette from '@material-ui/core/styles/createPalette';
import { Grid, Typography } from '@material-ui/core';

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
  },margin: {
    margin: theme.spacing(1),
  }
});

const ShoppingLs=[
  {id:"1",name:"liste 2"},
  {id:"2",name:"list 2.4"}
]
const mem=[
  {id:"1",imgsrc:"data:image/png;base64,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" ,name:"Julsddddddddddddddddddius"},
  {id:"2",imgsrc: "", name:"Niklas"}]

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
      GroupMembers.push(<GroupMember key={elem.id} imgsrc={elem.imgsrc} membername={elem.name}></GroupMember>)
    })
    return GroupMembers
  }

  render(){
    const { classes } = this.props;
    

    return (
        <div className={classes.accordion}>
        {/*<div className={classes.Groupnameheader}>{"Gruppenname"}</div>*/}

        <ExpansionPanel style={{border:"1px solid #5a5a5a", margin:4}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Shopping Lists</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <>
          <Grid 
        style={{marginLeft: 2}}
        container
        direction='column'
        justify='space-between'
        alignItems="stretch"
        xs={12}
        spacing={1}        
      >
        <IconButton aria-label="add" className={this.props.classes.margin} style={{padding:0}}>
        <AddCircleItem style={{alignSelf:"center", margin: 12}}></AddCircleItem>
          </IconButton>
        

           {this.renderShoppinglists()}
           </Grid>



        </>
        </ExpansionPanelDetails>
        </ExpansionPanel>

{/* Members: ---------------------------------------------------------*/}


        <ExpansionPanel style={{border:"1px solid #5a5a5a", margin:4}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Members</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
         <> 


        <Grid 
          style={{marginLeft: 2}}
          container
          direction='column'
          justify='space-between'
          alignItems="stretch"
          xs={12}
          spacing={1}        
      >

<IconButton aria-label="add" className={this.props.classes.margin} style={{padding:0}}>
        <AddCircleItem style={{alignSelf:"center", margin: 12}}></AddCircleItem>
          </IconButton>
              {this.renderGroupMembers()}
        </Grid>
          
          
          </>

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