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
  {id:"2",imgsrc: "", name:"Niklas"}];


    
  
/**
 * Bildet eine Spezifische, editierbare Gruppe ab
 * 
 * Beim Aufruf der Specific group muss der name auf den Gruppennamen gesetzt werden
 * 
 * @author [Julius Jacobitz]()
 * 
 */
class SpecificGroup extends Component {
  constructor(props){
    super(props);

    this.state ={
      groupmembers: [],
    };
  }
  async fetchGroupMembers(){
    const res = await fetch('http://jj-surface:8081/api/shoppa/groupmembers')
    const resjson = await res.json()
    console.log( resjson)
    this.setState({groupmembers:resjson})}
  
  
  componentDidMount(){
    this.fetchGroupMembers()
  }
  
  renderShoppinglists(){
  const ShoppingLists = []
  ShoppingLs.forEach( elem => {
    ShoppingLists.push(<GroupListItem key={elem.id} Listname={elem.name} ></GroupListItem>)
})
return ShoppingLists
  }

  renderGroupMembers(){
    const GroupMembers = []
    this.state.groupmembers.forEach( elem => {
      GroupMembers.push(<GroupMember key={elem.id} imgsrc={elem.imgsrc} membername={elem.name}></GroupMember>)
    })
    return GroupMembers
  }

  render(){
    const { classes } = this.props;
    

    return (
        <div className={classes.accordion}>
        {/*<div className={classes.Groupnameheader}>{"Gruppenname"}</div>*/}

        {/*

          //commented, because we don't need multiple lists per group


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

        */}

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