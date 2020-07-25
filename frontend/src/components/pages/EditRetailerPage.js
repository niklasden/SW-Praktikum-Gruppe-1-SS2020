import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import TextInputBar from '../layout/TextInputBar';
import MultilineTextInput from '../layout/MultilineTextInput';
import Icon from '@material-ui/core/Icon';
import MainButton from '../layout/MainButton';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { withRouter } from "react-router";
import { Redirect } from 'react-router';
import { Config } from '../../config';

/**
 * Renders the page to create, edit or delete a retailer
 * 
 * @see RetailerEntry
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 */
class CreateRetailerPage extends Component {
  state = { 
    snackbarOpen: false, 
    isSaving: false, 
    redirectToRetailerPage: false, 

    id: 0, 
    name: '', 
    address: '', 
  }

  async onClickSave(){
    this.setState({ isSaving: true })
    setTimeout(async () => {
      let id = this.state.id
      if (id === ""){
        id = 0
      } 

      const retailer = {
        id: id, 
        name: this.state.name, 
        location: this.state.address
      }

      const requestBody = JSON.stringify(retailer)
      const rInit = {
        method: 'POST', 
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: requestBody
      } 
      const resp = await fetch(Config.apiHost + '/Retailer', rInit)
      if(resp.ok){
        this.props.history.push('/retailers')
      } else {
        this.showErrorSnackBar()
      }
  
      this.setState({ isSaving: false })
    }, 1000)
  }

  onClickDelete(){
    this.setState({ isSaving: true })
    setTimeout(async () => {
      const retailer = {
        id: parseInt(this.state.id), 
        name: this.state.name, 
        address: this.state.address
      }
  
      const rInit ={
        method: 'DELETE', 
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(retailer)
      } 
      const resp = await fetch(Config.apiHost + '/Retailer/' + retailer.id, rInit)
      if(resp.ok){
        this.props.history.push('/retailers')
      } else {
        this.showErrorSnackBar()
      }
  
      this.setState({ isSaving: false })
    }, 1000)
  }

  showErrorSnackBar(){
    this.setState({ snackbarOpen: true })
    setTimeout(() => {
      this.setState({ snackbarOpen: false })
    }, 2000)
  }

  componentDidMount(){
    let address = ''
    let name = ''
    let id = ''
    // checks if there has been a redirect from retailer page to this page with a selected retailer
    // if yes it takes name and address from there
    if (this.props.location.state !== undefined){
      address = this.props.location.state.address
      if (address === undefined){
        address = ''
      }
      name = this.props.location.state.name
      id = this.props.location.state.id
      if (id === undefined || id === ''){
        id = 0
      }
    }
    this.setState({
      name: name, 
      address: address,
      id: id
    })
  }

  render(){
    if (this.state.redirectToRetailerPage) {
      return <Redirect push to="/retailers" />;
    }

    return (

      <div>
        <div style={{margin: 12, paddingTop: 12}}>
          <TextInputBar 
            icon='storefront'
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
            value={this.state.name}
          />
        </div>      
          <MultilineTextInput 
            placeholder='Location of the retailer' 
            style={{margin: 12, marginTop: 0}}  
            value={this.state.address}
            onChange={(e) => this.setState({address: e.target.value})}
          />

          <div style={{margin: 24}}>
            <Icon size='small'>info</Icon>
            <text>The location does not necessarily have to be an address</text>
          </div>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
          >
            <Grid item>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <MainButton onclick={this.onClickSave.bind(this)}>Save</MainButton>
                <div style={{marginLeft: 12}}>
                  <MainButton 
                    onclick={this.onClickDelete.bind(this)}
                    disabled={this.state.id === ''}
                  >Delete</MainButton>
                </div>
              </div>
  
              {this.state.isSaving &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 12}}>
                  <CircularProgress size={20} />
                </div>
              }
            </Grid>

            <Snackbar
              open={this.state.snackbarOpen}
              onClose={() => this.setState({snackbarOpen: false})}
              // TransitionComponent={transition}
              message="No network connection"
              // key={transition ? transition.name : ''}
              action={
                <Button 
                  color="inherit" 
                  size="small"
                  onClick={() => this.setState({ snackbarOpen: false })}
                >
                  Close
                </Button>
              }
            />
          </Grid>
 
      </div>
    )
  }
} 

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5, 
  },
})

export default withRouter(withStyles(styles)(CreateRetailerPage));