import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import TextInputBar from '../layout/TextInputBar'
import MultilineTextInput from '../layout/MultilineTextInput'
import Icon from '@material-ui/core/Icon'
import MainButton from '../layout/MainButton'
import {
  Link
} from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button'

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
  state = { 
    snackbarOpen: false
  }

  onClickSave(){
    this.setState({ snackbarOpen: true })
    setTimeout(() => {
      this.setState({ snackbarOpen: false })
    }, 2000)
  }

  render(){
    // const transition = (props) => (
    //   <Slide {...props} direction="left" />
    // )
    return (

      <div>
        <div style={{margin: 12}}>
          <TextInputBar 
            icon='storefront'
            placeholder='Name'
            onChange={(text) => alert(text)}
          />
        </div>      
          <MultilineTextInput 
            placeholder='Ort des Einzelhändlers' 
            style={{margin: 12, marginTop: 0}}  
          />

          <div style={{margin: 24}}>
            <Icon size='small'>info</Icon>
            <text>Beim Ort kann es sich um eine Adresse oder um eine zusätzliche Bezeichnung handeln, hauptsache du und die Mitglieder deiner Gruppe wissen, was damit gemeint ist</text>
          </div>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
          >
            <Grid item  >
              <MainButton onClick={this.onClickSave.bind(this)}>Speichern</MainButton>
            </Grid>

            <Snackbar
              open={this.state.snackbarOpen}
              onClose={() => this.setState({snackbarOpen: false})}
              // TransitionComponent={transition}
              message="Keine Netzwerkverbindung"
              // key={transition ? transition.name : ''}
              action={
                <Button 
                  color="inherit" 
                  size="small"
                  onClick={() => this.setState({ snackbarOpen: false })}
                >
                  Undo
                </Button>
              }
            />
          </Grid>
 
      </div>
    )
  }
} 

export default withStyles(styles)(CreateRetailerPage);