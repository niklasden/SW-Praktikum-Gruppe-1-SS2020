import React, { Component } from 'react';
import Button from '../layout/IconButton';
import HeaderButton from '../layout/HeaderButton';

export class HomePage extends Component {
  render(){
    return (
      <>
        <h2>Home</h2>
        <HeaderButton />
        <Button />
      </>
    )
  }
}