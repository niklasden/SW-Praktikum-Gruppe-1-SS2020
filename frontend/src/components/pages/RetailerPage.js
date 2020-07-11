import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import TextInputBar from '../layout/TextInputBar'
import IconButton from '../layout/IconButton'
import RetailerListEntry from '../layout/RetailerListEntry'
import { Link } from 'react-router-dom';
import { Config } from '../../config'

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
    searchValue: '',
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

    setTimeout(async () => {
      try {
        // TODO: change to real api
        const res = await fetch(Config.apiHost + '/Retailer')
        const json = await res.json()
  
        this.setState({
          loadingInProgress: false, 
          loadingRetailersError: null, 
          retailers: json
        })
      } catch (e){
        this.setState({
          loadingInProgress: false, 
          loadingRetailersError: '', 
  
        })
      } 
    }, 1000)
  }

  renderRetailers(){
    let retailers = this.state.retailers
    if(this.state.searchValue != ''){
      retailers = retailers.filter((retailer) => retailer.name.toLowerCase().includes(this.state.searchValue.toLowerCase()))
    }

    return retailers.map(retailer => (
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
          <TextInputBar
            placeholder='search'
            icon='search'
            onChange={(elem) => this.setState({ searchValue: elem.target.value})}
          /> 

          <Link to="/create_retailer" >
            <IconButton style={{marginLeft: 12}} icon='add'  />
          </Link>
        </div>
        
        <div style={{margin: 12}}>
          <div>
            {this.state.loadingInProgress ?
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress size={25} />
              </div>
            :  
              this.renderRetailers()
            }
          </div>
        </div>

      </div>

    ) 
  }
}