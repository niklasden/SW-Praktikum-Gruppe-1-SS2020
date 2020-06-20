import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import Searchbar from '../layout/Searchbar'
import MultilineTextInput from '../layout/MultilineTextInput'
import Icon from '@material-ui/core/Icon'
import MainButton from '../layout/MainButton'
import {
  Link
} from 'react-router-dom';

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5, 
  },
});

/**
 * Renders the page to create or edit a retailer
 * TODO: rename to RetailerDetailPage as it is also used to edit a retailer
 * 
 * @see RetailerEntry
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 */
class CreateRetailerPage extends Component {
  render(){
    return (

      <div>
        {/* TODO: change searchbar to textinput */}
        <div style={{margin: 12}}>
          <Searchbar />
        </div>
        

        <MultilineTextInput 
          placeholder='Ort des Einzelhändler' 
          style={{margin: 12, marginTop: 0}}  
        />

        <div style={{margin: 24}}>
          <Icon size='small'>info</Icon>
          <text>Beim Ort kann es sich um eine Adresse oder um eine zusätzliche Bezeichnung handeln, hauptsache du und die Mitglieder deiner Gruppe wissen, was damit gemeint ist</text>
        </div>

        <MainButton>Specihern</MainButton>
      </div>
    )
  }
} 

export default withStyles(styles)(CreateRetailerPage);