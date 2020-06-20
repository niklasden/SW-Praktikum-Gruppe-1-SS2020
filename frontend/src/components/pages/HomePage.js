import React, { Component } from 'react';
import Button from '../layout/IconButton';
import HeaderButton from '../layout/HeaderButton';
import StatisticsDashboardItem from '../layout/StatisticsDashboardItem'
import Article from '../layout/Article'
import ListItem from '../layout/ListItem'

const statistics = [
  {
    number: '#1', 
    article: 'Bier', 
    bought: '41x gekauft', 
  }, 
  {
    number: '#2', 
    article: 'Wein', 
    bought: '41x gekauft', 
  }, 
  {
    number: '#3', 
    article: 'Vodka', 
    bought: '41x gekauft', 
  }
]


export class HomePage extends Component {
  renderStatistics(){
    const components = []

    statistics.forEach(item => {
      components.push(
        <StatisticsDashboardItem
          number={item.number}
          bought={item.bought}
          article={item.article}
        />
      )
    })

    return components
  }

  render(){
    return (
      <>
        <h2>Home</h2>
        <HeaderButton />
        <Button />
 {/*
        {this.renderStatistics()}
        <Article imgsrc="https://upload.wikimedia.org/wikipedia/de/8/8b/Brights_icon_100x100.gif" itemname="test"/>
        <Article  itemname="Apfel" imgsrc="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT18SPNkehaQjo27-ZH80u919k2MvU7mM7DqmutmEbiViiIZDKA&usqp=CAU"/> */}

        <ListItem itemname='Test'></ListItem>
        </>
    )
  }
}