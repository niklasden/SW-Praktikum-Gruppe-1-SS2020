import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';

  /**
   * Displays an icon button as designed in figma
   * Niklas: onClick function to be parsed via prop onclick from the component that uses this Button
   * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
   * 
   */
  class MainButton extends Component {
    render(){
      return (
          <Grid container direction="row" justify="center" alignItems="center" style={{marginTop: '1em'}}>
              <Grid item>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  style={{borderColor: '#BDBDBD', backgroundColor: '#fafafa', width: '100%', fontWeight: 'bold'}} 
                  onClick={this.props.onclick}
                  disabled={this.props.disabled}
                >
                  {this.props.children}
                </Button>
              </Grid>
          </Grid>
      )
    }
  }
  
  export default (MainButton);