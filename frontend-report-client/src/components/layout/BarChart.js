import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';

/**
 * Bar Chart, creation heavily influenced by https://code.tutsplus.com/tutorials/how-to-draw-bar-charts-using-javascript-and-html5-canvas--cms-28561
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 */
class BarChart extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas
    canvas.height = 300;
    canvas.width = this.props.width
    const ctx = canvas.getContext("2d")
    // const img = this.refs.image

    var myBarchart = new BarChartGenerator({
			canvas:canvas,
			title:"Vinyl records",
			padding:10,
			gridColor:"#eeeeee",
			data: this.props.data,
			colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
		});
    myBarchart.draw();
  }

  render(){
    return(
      <>
        <canvas ref="canvas" className={styles.root}></canvas>
        {/* <legend for="canvas"></legend> */}
      </>
    )
  }
}

const styles = theme => ({
  root: {

  },
  indicator: {
    display: 'flex',
    direction: 'column'
  }, 
  indicatorText: {
    display: 'block'
  }
})

/**
 * Draw a line on the canvas
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 * @param {*} ctx The canvas 
 * @param {number} startX 
 * @param {number} startY 
 * @param {number} endX 
 * @param {number} endY 
 * @param {string} color 
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

/**
 * Draw a bar on the canvas for the bar chart
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 * @param {*} ctx 
 * @param {number} upperLeftCornerX 
 * @param {number} upperLeftCornerY 
 * @param {number} width 
 * @param {number} height 
 * @param {string} color 
 */
function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
  ctx.save();
  ctx.fillStyle=color;
  ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width - 20,height);
  ctx.restore();
}

/**
 * Draw a text on the canvas
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 * @param {*} ctx 
 * @param {number} startX 
 * @param {number} startY 
 * @param {string} text Text to draw on canvas 
 */
function drawText(ctx, startX, startY, text){
  ctx.save()
	ctx.fillText(text, startX, startY)
	ctx.font = "bold 10px Arial"
  ctx.restore()
}

/**
 * Generates the bar chart using the options you pass to it
 * 
 * @param {*} options 
 */
var BarChartGenerator = function(options){
  this.BarChartGenerator = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;

  this.draw = function(){
		var maxValue = 0;
		// find highest value of data
		// for (var categ in this.options.data){
		// 	maxValue = Math.max(maxValue,this.options.data[categ]);
		// }

		this.options.data.forEach(el => {
			maxValue = Math.max(maxValue, el.value)
		})


		var canvasActualHeight = this.canvas.height - this.options.padding * 2;
		var canvasActualWidth = this.canvas.width - this.options.padding * 2;

		//drawing the grid lines
		var gridValue = 0;
		while (gridValue <= maxValue){
			var gridY = (canvasActualHeight - 10) * (1 - gridValue/maxValue) + this.options.padding;
			drawLine(
				this.ctx,
				0,
				gridY,
				this.canvas.width,
				gridY,
				this.options.gridColor
			);

			drawText(this.ctx, 0, gridY, "" + gridValue)

			gridValue += Math.round(maxValue / 5)
		}

		//drawing the bars
		var barIndex = 0;
		var numberOfBars = this.options.data.length;
		var barSize = (canvasActualWidth)/numberOfBars;

		this.options.data.forEach((el) => {
			console.log("categ" + el.title)
			var val = el.value;
			var barHeight = Math.round( (canvasActualHeight - 10) * val/maxValue);
			drawBar(
				this.ctx,
				this.options.padding + barIndex * barSize + 20,
				this.canvas.height - barHeight - this.options.padding - 10,
				barSize,
				barHeight,
				this.colors[barIndex%this.colors.length]
			);

			barIndex++;
			drawText(this.ctx, barIndex * barSize - barSize + 30, this.canvas.height - 10, "" + el.title + " (" + el.value + ")")

		}) 
  }
}

export default withStyles(styles)(BarChart)