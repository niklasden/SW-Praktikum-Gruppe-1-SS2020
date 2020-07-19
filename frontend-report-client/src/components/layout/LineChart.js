import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    // height: '300px', 
    // width: '300px',
  },
  indicator: {
    display: 'flex',
    direction: 'column'
  }, 
  indicatorText: {
    display: 'block'
  }
});


/**
 * Line Chart, creation heavily influenced by https://gist.github.com/maxbbn/2940126
 * 
 * @author Christopher Böhm
 */
function drawLine(ctx, startX, startY, endX, endY,color){
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.stroke();
  ctx.restore();
}

function drawPoint(ctx, startX, startY, color){
  ctx.save();
  ctx.fillStyle=color;
  ctx.beginPath();
  ctx.arc(startX, startY, 50, 0, 2 * Math.PI);
  ctx.stroke(); 
  ctx.restore();
}

function drawText(ctx, startX, startY, text){
  ctx.save()
	ctx.fillText(text, startX, startY)
	ctx.font = "bold 10px Arial"
  ctx.restore()
}

class LineChart extends Component {
  componentDidMount(){
    const canvas = this.refs.canvas
    canvas.height = 300
    canvas.width = this.props.width
    const ctx = canvas.getContext("2d")

    var myChart = new LineChartGenerator({

    })
  }
}

var LineChartGenerator = function(options){
  this.options = options
  this.canvas = options.canvas
  this.ctx = this.canvas.getContext("2d")

  this.draw = function(){
    var maxValue
  }
}

export default withStyles(styles)(LineChart)
