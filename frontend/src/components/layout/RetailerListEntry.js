import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import { withStyles } from '@material-ui/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderStyle: 'solid',
    borderRadius: 5,
  },
  character: {
    fontSize: 25,
    color: '#00BCD4',
  },
});

/**
 * Renders a RetailerListEntry Object, if you click on a ListEntry object you get 
 * routet to EditRetailerPage
 * 
 * @see RetailerEntry
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 * @prop id (string): The id of the retailer
 * @prop name (string): The name of the retailer to display
 * @prop address (string): The address/location of the retailer to display
 */
class RetailerListEntry extends Component {
  render(){
    const { classes } = this.props

    return (
      <Grid 
        container 
        className={classes.root} 
        alignItems='center' 
        style={this.props.style} 
        justify='space-between'
        direction='row'
      >
        <Grid item xs={1} >
          <div 
            className={classes.character}
            style={{
              marginRight: 12,
              marginLeft: 8, 
            }}
          >{this.props.name.substr(0, 1).toUpperCase()}</div>
        </Grid>
        <Grid item xs={10} style={{paddingLeft: '5%'}}>
          <text style={{display: 'block'}}>{this.props.name.toUpperCase()}</text>
          <text style={{fontSize: 10}}>{this.props.address}</text>
        </Grid>

        <Grid item xs={1}>
          <Link 
            to={{
              pathname: 'create_retailer', 
              state: { 
                id: this.props.id, 
                name: this.props.name, 
                address: this.props.address 
              }
            }}
          >
            <SettingsIcon 
              style={{ color: '#00BCD4',float: "right", marginRight: '10%' }} 
            />
          </Link>
        </Grid>
      </Grid> 
    )
  }
}
 
RetailerListEntry.propTypes = {
  id: PropTypes.string.isRequired, 
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired, 
}

export default withStyles(styles)(RetailerListEntry);