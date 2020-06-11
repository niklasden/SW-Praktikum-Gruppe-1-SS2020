import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Grid from '@material-ui/core/Grid/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container/Container'


const RETAILERS = [
  {
    id: 'retailer1', 
    name: 'REWE',
    address: 'Esslingen',  
  },
  {
    id: 'retailer1', 
    name: 'REWE',
    address: 'Stuttgart Königsstraße',  
  },
  {
    id: 'retailer2', 
    name: 'Aldi',  
    address: 'neben Pigspoint'
  },
]

export class RetailerPage extends Component {
  render(){
    return (
      <Grid container spacing={3}>
        <Grid item>
          <RetailerList />
        </Grid>
        <Grid item>
          <TextField id="standard-basic" label="Standard" />
          <div>
            <Button variant="contained">Default</Button>
          </div>
        </Grid>
      </Grid>
    ) 
  }
}

/**
 * Renders a list of RetailerEntry objects
 * 
 * @see RetailerEntry
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 */
class RetailerList extends Component {
  state = {
    retailers: [], 
    loadingInProgress: false, 
    loadingRetailersError: null, 
    addingRetailerError: null, 
  }

  componentDidMount(){
    this.getRetailers()
  }

  /** Fetches RetailerBOs for the current group */
  async getRetailers(){
    this.setState({
      loadingInProgress: true, 
      loadingRetailersError: null 
    })

    // TODO: load from server (global API object)

    setTimeout(() => {
      this.setState({
        loadingInProgress: false, 
        loadingRetailersError: null, 
        retailers: RETAILERS
      })
    }, 2000)
  }

  renderRetailers(){
    return this.state.retailers.map(retailer => (
      <RetailerListEntry 
        id={retailer.id}
        name={retailer.name}
        address={retailer.address}
      /> 
    ))
  }

  render(){
    return (
      <div>
        {this.state.loadingInProgress ?
          <CircularProgress />
        : 
          this.renderRetailers()
        }
      </div>
    )
  }
}

/**
 * Renders a list of RetailerEntry objects
 * 
 * @see RetailerEntry
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 * @prop id: string with retailer id
 * @prop name: string with retailer name
 * @prop address: string with retailer address
 */
class RetailerListEntry extends Component {
  render(){
    return (
      <div>
        <p>{this.props.id}</p>
        <p>{this.props.name}</p>
        <p>{this.props.address}</p>
      </div>
    )
  }
}