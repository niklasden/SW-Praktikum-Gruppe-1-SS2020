import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import { withStyles } from '@material-ui/styles';
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
 * Renders a list of ListEntry objects
 * 
 * @see ListEntry
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 * @property text
 */
class ListEntry extends Component {
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
            <p>h</p>
          </Grid>
          <Grid item>
            <text style={{display: 'block'}}>{this.props.text}</text>
          </Grid>
        </Grid>
      </Grid> 
    )
  }
}
 
export default withStyles(styles)(ListEntry);