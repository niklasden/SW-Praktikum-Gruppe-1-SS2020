import React, {Component} from 'react';
import { Grid } from '@material-ui/core';
import CanvasJSReact from './statistic/canvasjs.react'
import { withStyles } from '@material-ui/core/styles';
import {Config} from '../../config';
import LineChart from '../layout/LineChart'

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
  /*
  Method to fetch all bought products
  */
  async getBoughtProducts() {
    try {
      const res = await fetch(Config.apiHost + "/report/" + this.props.group);
      const json = await res.json();
      var newItem, productList = [], articleIDs = [];
      json._report_listentries.forEach(item => {
        /* If item of json isn't already fetched, then create a new item*/
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
          /* add data to that item to be displayed in the timeline */
          newItem.dataPoints.push(
            {
            x: new Date(item.bought),
            y: item.amount
            })
          newItem.dataPoints.sort((a, b) => b.x - a.x);
          productList.push(newItem);
          articleIDs.push(newItem.id);
        }else { // else if the item already exists or is fetched, add the incoming data to the existing item 
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
              includedItem.dataPoints.sort((a, b) => b.x - a.x); // sort datapoints after the date
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
    /* Everytime the chart is filtered by date or products, the state is getting filtered, this avoids the data to be lost after filtering */
    var newList = {...this.state.options, data: [...this.state.options.data]}
      newList.data.forEach((data, index) => {
          newList.data[index] = {...data}
          newList.data[index].dataPoints = [...data.dataPoints]
        })
        /* Filter list by selected retailer */
        if(this.props.retailer !== "Alle") {
        newList = {...newList, data: newList.data.filter(d => d.retailer === this.props.retailer)};
      }
        /* Filter list by selected category */
      if(this.props.category !== "Alle") {
        newList = {...newList, data: newList.data.filter(d => d.cagtegory === this.props.category)};
      }
        /* Filter list by selected article */
      if(this.props.article !== "Alle") {
        newList = {...newList, data: newList.data.filter(d => d.name === this.props.article)};
      }
        /* Filter list by start- and end-date */
      if(this.props.startTime && this.props.endTime) {
        newList.data.forEach(d => {
          d.dataPoints = d.dataPoints.filter(dd => this.isDateBeforeTimeProp(dd.x) && this.isDateAfterTimeProp(dd.x));
        })
      }
      // console.log(newList)

      return newList;
    }

    // we need the elements in another format as we switched from canvas js to a custom solution
    getCustomizedOptions(){
      const options = this.getOptions().data
      const customOptions = []

      const newCustomOption = (article_id, article_name, amount, date) => {
        return {
          article_id,
          article_name, 
          amount,
          date
        }
      }

      options.forEach((el, i) => {
        el.dataPoints.forEach(dataPoint => {
          let coption = newCustomOption(el.id, el.name, dataPoint.y, dataPoint.x)
          customOptions.push(coption)
        })
      })

      // console.log(customOptions)

      return customOptions
    }

    /* Renders the component */
    render() {
      const classes = this.props.classes;
      const chartItems = this.getOptions()
      const customOptions = this.getCustomizedOptions();

      return (
        chartItems.data.length > 0 ?
          <Grid item>
            {/* this is the old chart using canvas js */}
            {/* <CanvasJSChart options = {this.getOptions()} className={classes.chart} /> */}
            <LineChart
              minDate={this.props.startTime}
              maxDate={this.props.endTime}
              options={customOptions}
            />
          </Grid>
        :
          <Grid item>
            <p>No items to show.</p>
          </Grid>
      )
    }
}
export default (withStyles)(styles)(Statistic);