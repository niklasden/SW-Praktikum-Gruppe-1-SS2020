import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import { withStyles } from '@material-ui/styles';
import IconButton from './IconButton'
import Box from '@material-ui/core/Box'
import SettingsIcon from '@material-ui/icons/Settings';
import {
  Link
} from 'react-router-dom';

const styles = theme => ({
  root: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
  },
  character: {
    fontSize: 25,
    color: '#00BCD4',
  },
});


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
        <Grid 
          container 
          alignItems='center' 
          xs={9} 
          direction='row'
        >
          <Grid item  >
            <text 
              className={classes.character}
              style={{
                marginRight: 12,
                marginLeft: 8, 
              }}
            >{this.props.name.substr(0, 1).toUpperCase()}</text>
          </Grid>
          <Grid item>
            <text style={{display: 'block'}}>{this.props.name.toUpperCase()}</text>
            <text style={{fontSize: 10}}>{this.props.address}</text>
          </Grid>
        </Grid>

        <Grid container xs={3} justify='flex-end'>
          <Link to='retailer'>
            <SettingsIcon 
              style={{ color: '#00BCD4' }} 
              // onClick={() => alert('hello')}
            />
          </Link>
        </Grid>
      </Grid> 
    )
  }
}
 
export default withStyles(styles)(RetailerListEntry);