import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';

/**
 * Bar Chart, creation heavily influenced by https://code.tutsplus.com/tutorials/how-to-draw-bar-charts-using-javascript-and-html5-canvas--cms-28561
 * 
 * @author Christopher Böhm
 * @param {*} ctx 
 * @param {*} startX 
 * @param {*} startY 
 * @param {*} endX 
 * @param {*} endY 
 * @param {*} color 
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

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
  ctx.save();
  ctx.fillStyle=color;
  ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width - 20,height);
  ctx.restore();
}

var myVinyls = {
  "Classical music": 10,
  "Alternative rock": 14,
  "Pop": 2,
  "Jazz": 12
};

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

class BarChart extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas
    // canvas.width = 300;
    // canvas.width = '100%';
    canvas.height = 300;
    canvas.width = window.innerWidth
    const ctx = canvas.getContext("2d")
    // const img = this.refs.image

    var myBarchart = new Barchart(
      {
        canvas:canvas,
        seriesName:"Vinyl records",
        padding:10,
        gridScale:5,
        gridColor:"#eeeeee",
        data:myVinyls,
        colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
      }
    );
    myBarchart.draw();
  }

  render(){
    return(
      <>
        <canvas ref="canvas" className={styles.root}></canvas>
        <legend for="canvas"></legend>
      </>
    )
  }
}

var Barchart = function(options){
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;

  this.draw = function(){
      var maxValue = 0;
      for (var categ in this.options.data){
          maxValue = Math.max(maxValue,this.options.data[categ]);
      }
      var canvasActualHeight = this.canvas.height - this.options.padding * 2;
      var canvasActualWidth = this.canvas.width - this.options.padding * 2;

      //drawing the grid lines
      var gridValue = 0;
      while (gridValue <= maxValue){
          var gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
          drawLine(
              this.ctx,
              0,
              gridY,
              this.canvas.width,
              gridY,
              this.options.gridColor
          );
           
          //writing grid markers
          this.ctx.save();
          this.ctx.fillStyle = this.options.gridColor;
          this.ctx.font = "bold 10px Arial";
          this.ctx.fillText(gridValue, 10,gridY - 2);
          this.ctx.restore();

          gridValue+=this.options.gridScale;
      }

      //drawing the bars
      var barIndex = 0;
      var numberOfBars = Object.keys(this.options.data).length;
      var barSize = (canvasActualWidth)/numberOfBars;

      for (categ in this.options.data){
          var val = this.options.data[categ];
          var barHeight = Math.round( canvasActualHeight * val/maxValue) ;
          drawBar(
              this.ctx,
              this.options.padding + barIndex * barSize,
              this.canvas.height - barHeight - this.options.padding,
              barSize,
              barHeight,
              this.colors[barIndex%this.colors.length]
          );

          barIndex++;
      }

      //drawing series name
      this.ctx.save();
      this.ctx.textBaseline="bottom";
      this.ctx.textAlign="center";
      this.ctx.fillStyle = "#000000";
      this.ctx.font = "bold 14px Arial";
      this.ctx.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
      this.ctx.restore();  

  }
}

export default withStyles(styles)(BarChart)