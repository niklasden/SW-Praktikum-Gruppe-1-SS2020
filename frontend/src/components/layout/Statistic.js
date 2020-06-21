import React, {Component} from 'react';
import { Grid } from '@material-ui/core';
import CanvasJSReact from './statistic/canvasjs.react';
import { withStyles } from '@material-ui/core/styles';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
const styles = theme => ({
  chart: {
    position: 'relative',
    maxWidth: '75%'
  }
});

class Statistic extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    time: this.props.time,
    options: {
      title: {
        text: "Diagramm"
      },
      data: [{
        name: "Apfel",
        type: "spline",
        retailer: "DM",
        category: "fruits",
        yValueFormatString: "#0.## °C",
        showInLegend: true,
        dataPoints: [
          { x: new Date(2020,5,24), y: 4 },
          { x: new Date(2020,5,25), y: 0 },
          { x: new Date(2020,5,26), y: 0 },
          { x: new Date(2020,5,27), y: 0 },
          { x: new Date(2020,5,28), y: 4 },
          { x: new Date(2020,5,29), y: 2 },
          { x: new Date(2020,5,30), y: 1 }
        ]
      },
      {
        name: "Pesto",
        retailer: "ALDI",
        category: "groceries",
        type: "spline",
        yValueFormatString: "#0.## °C",
        showInLegend: true,
        dataPoints: [
          { x: new Date(2020,5,24), y: 2 },
          { x: new Date(2020,5,25), y: 2 },
          { x: new Date(2020,5,26), y: 2 },
          { x: new Date(2020,5,27), y: 1 },
          { x: new Date(2020,5,28), y: 2 },
          { x: new Date(2020,5,29), y: 2 },
          { x: new Date(2020,5,30), y: 2 }
        ]
      },
      {
        name: "Bier",
        type: "spline",
        retailer: "ALDI",
        category: "groceries",
        yValueFormatString: "#0.## °C",
        showInLegend: true,
        dataPoints: [
          { x: new Date(2020,5,24), y: 1 },
          { x: new Date(2020,5,25), y: 3 },
          { x: new Date(2020,5,26), y: 3 },
          { x: new Date(2020,5,27), y: 2 },
          { x: new Date(2020,5,28), y: 10 },
          { x: new Date(2020,5,29), y: 7 },
          { x: new Date(2020,5,30), y: 4 }
        ]
      }]
    }
  }
  getOptions() {
    var newList = {...this.state.options}
      if(this.props.retailer !== "Alle") {
        newList = {...newList, data: newList.data.filter(d => d.retailer === this.props.retailer)};
      }
      if(this.props.category !== "Alle") {
        newList = {...newList, data: newList.data.filter(d => d.cagtegory === this.props.category)};
      }
      if(this.props.article !== "Alle") {
        newList = {...newList, data: newList.data.filter(d => d.name === this.props.article)};
      }
      return newList;
    }
    
  componentDidUpdate() {
  }
    render() {
      const classes = this.props.classes;
      return (
        <Grid item>
          <CanvasJSChart options = {this.getOptions()} className={classes.chart} />
      </Grid>
      )
    }
}
export default (withStyles)(styles)(Statistic);