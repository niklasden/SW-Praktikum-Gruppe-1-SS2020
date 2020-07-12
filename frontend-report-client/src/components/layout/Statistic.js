import React, {Component} from 'react';
import { Grid } from '@material-ui/core';
import CanvasJSReact from './statistic/canvasjs.react'
import { withStyles } from '@material-ui/core/styles';
import {Config} from '../../config';

/**
 * Displays the timeline chat for the statistic page
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 * 
 */

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const styles = theme => ({
  chart: {
    position: 'relative',
    maxWidth: '75%'
  }
});

class Statistic extends Component {
  state = {
    time: this.props.time,
    test: [],
    options: {
      data: []
    },
  }
  async getBoughtProducts() {
    try {
      const res = await fetch(Config.apiHost + "/report/" + this.props.group);
      const json = await res.json();
      var newItem, productList = [], articleIDs = [];
      json._report_listentries.forEach(item => {
        if(!articleIDs.includes(item.id)) {
          newItem = {
            id: item.id,
            type: "spline",
            yValueFormatString: "#0.## Stk.",
            showInLegend: true,
            name: item.name,
            category: item.article_category,
            retailer: item.retailer,
            dataPoints: []
          };
          newItem.dataPoints.push(
            {
            x: new Date(item.bought),
            y: item.amount
            })
          productList.push(newItem);
          articleIDs.push(newItem.id);
        }else {
          var includedItem = productList.find(productItem => productItem.id === item.id);
          includedItem.dataPoints.forEach(dP => {
            if (Date.parse(dP.x) === Date.parse(item.bought)) {
              dP.y += item.amount;
            }else {
              includedItem.dataPoints.push(
                {
                  x: new Date(item.bought),
                  y: item.amount
                }
              )
            }
          })
        }
      })
      this.setState({options: {data: [...productList]}})
    }catch(exception) {
        this.setState({error: exception})
    }
  }
  componentDidMount() {
    this.getBoughtProducts();

  }
  isDateBeforeTimeProp(date) {
    return date.valueOf() <= new Date(this.props.endTime).valueOf();
}
isDateAfterTimeProp(date) {
  return date.valueOf() >= new Date(this.props.startTime).valueOf();
}
  getOptions() {
    var newList = {...this.state.options, data: [...this.state.options.data]}
      newList.data.forEach((data, index) => {
          newList.data[index] = {...data}
          newList.data[index].dataPoints = [...data.dataPoints]
        })
        if(this.props.retailer !== "Alle") {
        newList = {...newList, data: newList.data.filter(d => d.retailer === this.props.retailer)};
      }
      if(this.props.category !== "Alle") {
        newList = {...newList, data: newList.data.filter(d => d.cagtegory === this.props.category)};
      }
      if(this.props.article !== "Alle") {
        newList = {...newList, data: newList.data.filter(d => d.name === this.props.article)};
      }
      if(this.props.startTime && this.props.endTime) {
        newList.data.forEach(d => {
          d.dataPoints = d.dataPoints.filter(dd => this.isDateBeforeTimeProp(dd.x) && this.isDateAfterTimeProp(dd.x));
        })
      }
      return newList;
    }
    
  componentDidUpdate() {
  }
    render() {
      const classes = this.props.classes;
      const chartItems = this.getOptions();
      return (
        chartItems.data.length > 0 ?
          <Grid item>
            <CanvasJSChart options = {this.getOptions()} className={classes.chart} />
          </Grid>
        :
          <Grid item>
            <p>No items to show.</p>
          </Grid>
      )
    }
}
export default (withStyles)(styles)(Statistic);