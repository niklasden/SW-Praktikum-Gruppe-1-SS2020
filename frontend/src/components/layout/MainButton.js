import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';

  /**
   * Displays an icon button as designed in figma
   * 
   * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
   * 
   */
  class MainButton extends Component {
    render(){
      return (
        <Grid container direction="row" justify="center" alignItems="center" style={{marginTop: '1em'}}>
            <Grid item>
              <Button 
                onClick={this.props.onClick}
                variant="outlined" 
                color="primary" 
                style={{borderColor: '#BDBDBD', backgroundColor: '#fafafa', width: '100%', fontWeight: 'bold'}}>
                  {this.props.children}
              </Button>
            </Grid>
        </Grid>
      )
    }
  }
  
  export default (MainButton);