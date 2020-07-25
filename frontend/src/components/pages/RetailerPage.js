import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import TextInputBar from '../layout/TextInputBar'
import IconButton from '../layout/IconButton'
import RetailerListEntry from '../layout/RetailerListEntry'
import { Link } from 'react-router-dom';
import { Config } from '../../config'
import { timeout } from '../../timeout'

/**
 * Renders the retailer page, it fetches the retailers of a group and renders them as list items
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
  // TODO: add group selection to retailers
  async getRetailers(){
    this.setState({
      loadingInProgress: true, 
      loadingRetailersError: null,
    })

    await timeout(500)
    try {
      const res = await fetch(Config.apiHost + '/Retailer', {credentials: 'include'});
      const json = await res.json();

      this.setState({
        loadingInProgress: false, 
        loadingRetailersError: null, 
        retailers: json,
      })
    } catch (e){
      this.setState({
        loadingInProgress: false, 
        loadingRetailersError: '', 
      })
    } 
  }

  renderRetailers(){
    let retailers = this.state.retailers;
    if(this.state.searchValue !== ''){
      retailers = retailers.filter((retailer) => retailer.name.toLowerCase().includes(this.state.searchValue.toLowerCase()))
    }

    return retailers.map(retailer => (
      <RetailerListEntry 
        key={retailer.id}
        id={retailer.id}
        name={retailer.name}
        address={retailer.location}
        style={{marginBottom: 12}}
      /> 
    ))
  }

  render(){
    return (
      <div style={{width: '100%', marginBottom: 65}}>
        <div style={{flex: 1, flexDirection: 'row', display: 'flex', margin: 12, paddingTop: 12}}>
          {/* <text style={{flexGrow: 1}}>hello</text> */}
          <div style={{flexGrow: 1}}>
            <TextInputBar
              placeholder='search'
              icon='search'
              onChange={(elem) => this.setState({ searchValue: elem.target.value})}
            /> 
          </div>

          <Link to="/create_retailer" >
            <IconButton style={{marginLeft: 12}} icon='add'  />
          </Link>
        </div>
        <div style={{margin: 12}}>
            {this.state.loadingInProgress ?
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress size={25} />
              </div>
            :  
              this.renderRetailers()
            }
          </div>
      </div>
    ) 
  }
}