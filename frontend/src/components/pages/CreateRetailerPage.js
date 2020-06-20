import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import TextInputBar from '../layout/TextInputBar'
import MultilineTextInput from '../layout/MultilineTextInput'
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5, 
  },
});

class CreateRetailerPage extends Component {
  render(){
    return (
      <div>
        <TextInputBar />

        <MultilineTextInput 
          placeholder='Ort des Einzelhändler' 
          style={{margin: 12}}  
        />

        <div style={{margin: 24}}>
          <Icon>info</Icon>
          <text>Beim Ort kann es sich um eine Adresse oder um eine zusätzliche Bezeichnung handeln, hauptsache du und die Mitglieder deiner Gruppe wissen, was damit gemeint ist</text>
        </div>
      </div>
    )
  }
} 

export default withStyles(styles)(CreateRetailerPage);