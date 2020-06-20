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
    render() {
      const classes = this.props.classes;
      const options = {
        title: {
          text: "Teschd Header"
        },
        data: [{
          name: "Apfel",
          type: "spline",
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
      return (
        <Grid item>
        <CanvasJSChart options = {options} className={classes.chart}
        />
      </Grid>
      )
    }
}
export default (withStyles)(styles)(Statistic);