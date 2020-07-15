import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box'
import SettingsIcon from '@material-ui/icons/Settings';
import {
  Link
} from 'react-router-dom';
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'

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
 * Renders a single list entry item
 * 
 * @see ListEntry
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 * @property text (string): The text to display of the list entry
 * @property iconName (string): the name of the icon to display. 
 * All items of material icons are supported
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
        component={Button}
      >
        <Grid 
          container 
          alignItems='center' 
          direction='row'
        >
          <Grid item  >
            <Icon
              style={{ color: '#00BCD4', marginRight: 12 }}
            >{this.props.iconName}</Icon>
          </Grid>
          <Grid item>
            <p style={{display: 'block', fontWeight: 'normal', textTransform: 'none'}}>{this.props.text}</p>
          </Grid>
        </Grid>
      </Grid> 
    )
  }
}
 
export default withStyles(styles)(ListEntry);