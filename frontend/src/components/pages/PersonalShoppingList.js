import React, {Component} from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import ListItem from '../layout/ListItem'
import Heading from '../layout/Heading'
import EditListItem from '../layout/EditListItem'
import Popover from '@material-ui/core/Popover'
import { checkPropTypes } from 'prop-types';
import ListItemCheckbox from '../layout/ListItemCheckbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '../layout/IconButton'


/**
 * Displays the PersonalShoppingList as designed in Figa. All items to be purchased by a person are listed on the list and can be ticked off the list. Finally the user can complete the shopping. 
 * 
 * @author [Pascalv Illg](https://github.com/pasillg)
 */


export default class PersonalShoppingList extends Component {

  state={
    items: [
      {id: 1, name: "Apfel", category: "fruits", amount: "3", unit: "Stk.", person: 'Herbert', userID: 1, checkbox: true, retailer: 'Aldi'},
      {id: 2, name: "Birne", category: "fruits", amount: "2", unit: "Stk.", person: 'Herbert', userID: 1, checkbox: true, retailer: 'Edeka' },
      {id: 3, name: "Erdbeerkäse", category: "vegetables", amount: "2", unit: "Stk.", person: 'Herbert', userID: 2, checkbox: true, retailer: 'Lidl' },
      {id: 2, name: "Mango", category: "vegetables", amount: "2", unit: "g", person: 'Manfred', userID: 1, checkbox: true, retailer: 'Aldi' },
      {id: 3, name: "Lyoner", category: "vegetables", amount: "2", unit: "Stk.", person: 'Herbert', userID: 1, checkbox: true, retailer: 'Edeka' },
  ],
  selectedRetailer : null
}

getUserItems(){
  const Useritems = this.state.items.filter(item =>{
    if (item.userID === 1) {
      return item
    }
  });
   console.log(Useritems)
  return Useritems
}

renderHeading(type){
  let fruits = []; 
  let Useritems = this.getUserItems()
  for (let item in Useritems) {
    if(Useritems[item].category === type){
     fruits.push(<Grid item xs={12}> <Heading>{type}</Heading> </Grid>)
     break
  }}
return fruits
}

renderHeadingVegetabels(){
  let vegetables = []; 
  let Useritems = this.getUserItems()
  for (let item in Useritems) 
    if(Useritems[item].category === 'vegetables'){
     vegetables.push(<Grid item xs={12}> <Heading>VEGETABLES</Heading> </Grid>)
     break
  } return vegetables
}

renderReatailer(){
  let retailer = []
  let Useritems = this.getUserItems()
  Useritems.map(item => {
    if(!retailer.includes(item.retailer)) {
      retailer.push(item.retailer)
    }
  })
return retailer
}



  render(){

  console.log(this.state.selectedRetailer)
  let Useritems = this.getUserItems()
  let shops = this.renderReatailer()

    return (
      <Grid 
        container
        direction='column'
        justify='space-between'
        alignItems="stretch"
        xs={12}
        spacing={1}        
      >
      
      <Grid 
        container
        direction= 'row'
        justify='flex-start'
        alignItems='flex-start'
        height= '20px'
        xs={12}
      >
        <Grid container xs={12}>

            <Grid item xs={2}>
            <Button style={{width: '50px'}}>ALL</Button>
            </Grid>

            {shops.map(element => {
                  return <Grid item xs={2} style={{width:'50px'}}><Button onClick={() => this.setState({selectedRetailer : element})}>{element}</Button></Grid>
                })}

            <Grid item xs={6}> 
              <IconButton style={{margin: 5}} size='small' icon='shoppingcart'></IconButton> 
              <IconButton style={{margin: 5}} size='small' icon='list'></IconButton> 
              <IconButton style={{margin: 5}} size='small' icon='done'></IconButton> 
            </Grid>
        </Grid>

      </Grid>
         {/**Category fruits and ListItems */ }
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
          <Typography>
            <Grid container xs={12} spacing={1}>
            {this.renderHeadingFruits()}
            </Grid>
          </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Grid container xs={12} spacing={1}>
                  {Useritems.map(item => {
                  if(item.category === "fruits"){
                  return <Grid item xs={12}>
                  <ListItemCheckbox itemname={item.name} amount={item.amount} unit={item.unit}></ListItemCheckbox>
                  </Grid>
                }
              })}
              </Grid>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {/**Category Vegetables and ListItems */ }
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
          <Typography>
            <Grid container xs={12} spacing={1}>
            {this.renderHeadingVegetabels()}
            </Grid>
          </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Grid container xs={12} spacing={1}>
                  {Useritems.map(item => {
                  if(item.category === "vegetables"){
                  return <Grid item xs={12}>
                  <ListItemCheckbox itemname={item.name} amount={item.amount} unit={item.unit}></ListItemCheckbox>
                  </Grid>
                }
              })}
              </Grid>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    ) 
  }
}
