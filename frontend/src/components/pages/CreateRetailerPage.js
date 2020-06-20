import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import Searchbar from '../layout/Searchbar'
import MultilineTextInput from '../layout/MultilineTextInput'

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
        {/* TODO: change searchbar to textinput */}
        <Searchbar />

        <MultilineTextInput placeholder='Ort des Einzelhändler'  />
      </div>
    )
  }
} 

export default withStyles(styles)(CreateRetailerPage);