import React, {Component} from 'react';
import { Grid, Typography } from '@material-ui/core';
import ListItem from '../layout/ListItem'
import Heading from '../layout/Heading'

/**
 * 
 * 
 * @author [Pascalv Illg](https://github.com/pasillg)
 */

export default class GroupShoppingList extends Component {
  render(){
    return (
      <Grid 
        container
        direction='column'
        justify='space-between'
        alignItems="stretch"
        xs={12}
        spacing={1}        
      >
        <Grid item>
          <Heading>Fruits</Heading>
        </Grid>

        <Grid item>
          <ListItem itemname='Apfel' amount='3 ' unit='Stk.'></ListItem>
        </Grid>
        
        <Grid item>
          <ListItem itemname='Birne' amount='3 ' unit='Stk.'></ListItem>
        </Grid>

        <Grid item>
          <Heading>Vegetables</Heading>
        </Grid>

        <Grid item>
          <ListItem itemname='Erdbeerkäse' amount='3 ' unit='Stk.'></ListItem>
        </Grid>

        <Grid item>
          <ListItem itemname='Test' amount='3 ' unit='Stk.'></ListItem>
        </Grid>

        <Grid item>
          <ListItem itemname='Test' amount='3 ' unit='Stk.'></ListItem>
        </Grid>

        <Grid item>
          <ListItem itemname='Test' amount='3 ' unit='Stk.'></ListItem>
        </Grid>

        <Grid item>
          <ListItem itemname='Test' amount='3 ' unit='Stk.'></ListItem>
        </Grid>

        <Grid item>
          <ListItem itemname='Test' amount='3 ' unit='Stk.'></ListItem>
        </Grid>
      </Grid>
    ) 
  }
}