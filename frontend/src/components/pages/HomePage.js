import React, { Component } from 'react';
import Button from '../layout/IconButton';
import HeaderButton from '../layout/HeaderButton';
import StatisticsDashboardItem from '../layout/StatisticsDashboardItem'

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

        {this.renderStatistics()}
      </>
    )
  }
}