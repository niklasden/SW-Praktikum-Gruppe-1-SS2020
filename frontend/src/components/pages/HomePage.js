import React, { Component } from 'react';
import Button from '../layout/IconButton';
import HeaderButton from '../layout/HeaderButton';
import Article from '../layout/Article'

export class HomePage extends Component {
  render(){
    return (
      <>
        <h2>Home</h2>
        <HeaderButton />
        <Button />
        <Article imgsrc="https://upload.wikimedia.org/wikipedia/de/8/8b/Brights_icon_100x100.gif" itemname="test"/>
        <Article  itemname="Apfel" imgsrc="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT18SPNkehaQjo27-ZH80u919k2MvU7mM7DqmutmEbiViiIZDKA&usqp=CAU"/>

      </>
    )
  }
}