import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export class AboutPage extends Component {
  render(){
    return (
      <div>
        <h2>About</h2>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>

    )
  }
}