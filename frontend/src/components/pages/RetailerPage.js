import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Grid from '@material-ui/core/Grid/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container/Container'
import Searchbar from '../layout/Searchbar'
import IconButton from '../layout/IconButton'
import RetailerListEntry from '../layout/RetailerListEntry'
import {
  Link
} from 'react-router-dom';

const RETAILERS = [
  {
    id: 'retailer0', 
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
  {
    id: 'retailer3', 
    name: 'Edeka',
    address: ''
  }
]

/**
 * Renders the retailer page
 * 
 * @see RetailerPage
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 */
export class RetailerPage extends Component {
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
    }, 10)
  }

  renderRetailers(){
    return this.state.retailers.map(retailer => (
      <RetailerListEntry 
        id={retailer.id}
        name={retailer.name}
        address={retailer.address}
        style={{marginBottom: 12}}
      /> 
    ))
  }

  render(){
    return (
      <div style={{width: '100%'}}>
        <div style={{flex: 1, flexDirection: 'row', display: 'flex', margin: 12}}>
          {/* <text style={{flexGrow: 1}}>hello</text> */}
          <Searchbar />

          <Link to="/create_retailer" >
            <IconButton style={{marginLeft: 12}}  />
          </Link>
        </div>
        


        <div style={{margin: 12}}>
          <div>
            {this.state.loadingInProgress ?
              <CircularProgress />
            : 
              this.renderRetailers()
            }
          </div>
        </div>

      </div>

    ) 
  }
}