import React, { Component } from 'react'

// color array used to get a color for any item in line chart
const colorArray = [
	'#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
	'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
	'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
	'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
	'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
	'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
	'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
	'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
	'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
	'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];
			
/**
 * Bar Chart, creation heavily influenced by https://www.c-sharpcorner.com/UploadFile/18ddf7/html5-line-graph-using-canvas/
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 */
export default class LineChart extends Component {
	componentDidMount(){
		this.drawLineChart()
	}
	
	componentDidUpdate(){
		this.drawLineChart()
	}
	
	drawLineChart(){
		let maxAmount = 0
		this.props.options.forEach(el => {
			if (el.amount > maxAmount){
				maxAmount = el.amount
			}
		})

		const maxDate = new Date(this.props.maxDate)
		const minDate = new Date(this.props.minDate)
		
		const maxNumberDates = (maxDate.getTime() - minDate.getTime()) / (1000 * 3600 * 24)

		var myLineChart = new LineChartGenerator({  
			canvasId: "myLineCanvas",  
			minX: 0,
			minY: 0,
			unitsPerTickX: 1,
			unitsPerTickY: maxAmount / 10,

			minDate: minDate, 
			maxDate: maxDate, 

			minDateDay: 0, 

			options: this.props.options,
			maxX: maxNumberDates, 
			maxY: maxAmount
		})

		// color maps is used to set a different color for each article id
		const colorMaps = {}
		let nextColor = 0

		this.props.options.forEach((el, i) => {
			if (colorMaps[el.article_id] === undefined){
				colorMaps[el.article_id] = colorArray[nextColor]
				nextColor += 1
			}
		})

		// we form a data dict here, so that we get one data object per article including its data points
		var dataDict = {}
		this.props.options.forEach(el => {
			if (dataDict[el.article_id] === undefined){
				dataDict[el.article_id] = []
			} 
			dataDict[el.article_id].push({
				x: el.date.getDate() - minDate.getDate(),
				y: el.amount, 
			})
		})

		// we draw one line for each article
		for (var key in dataDict){
			myLineChart.drawLine(dataDict[key], colorMaps[key], 3)
		}
	}

	renderArticles(){
		const renderedArticles = []
		const colorMaps = {}
		let nextColor = 0

		this.props.options.forEach((el, i) => {
			if (colorMaps[el.article_name] === undefined){
				colorMaps[el.article_name] = colorArray[nextColor]
				nextColor += 1

				renderedArticles.push(
					<div>
						<text style={{color: colorMaps[el.article_name], fontWeight: 'bold'}}>{el.article_name}</text>
					</div>
				)
			}
		})

		return renderedArticles
	}

	render(){
		return (
			<>
				<canvas 
					id="myLineCanvas" 
					// width="600" 
					height="300" 
					width={this.props.width}
				/>
				{this.renderArticles()}
			</>
		)
	}
}

function LineChartGenerator(con) {  
  // user defined properties  
	this.canvas = document.getElementById(con.canvasId)
  this.minX = con.minX
  this.minY = con.minY
  this.maxX = con.maxX
  this.maxY = con.maxY
  this.unitsPerTickX = con.unitsPerTickX
  this.unitsPerTickY = con.unitsPerTickY

	this.minDate = con.minDate
	this.maxDate = con.maxDate

	this.minDateDay = con.minDateDay

  // constants  
  this.padding = 10
  this.tickSize = 10
  this.axisColor = "#555"
  this.pointRadius = 5
  this.font = "12pt Calibri"

  this.fontHeight = 12

  // relationships       
	this.context = this.canvas.getContext("2d")
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.rangeX = this.maxX - this.minY
  this.rangeY = this.maxY - this.minY
  this.numXTicks = Math.round(this.rangeX / this.unitsPerTickX)
  this.numYTicks = Math.round(this.rangeY / this.unitsPerTickY)
	this.x = this.getLongestValueWidth() + this.padding * 2
  this.y = this.padding * 2
  this.width = this.canvas.width - this.x - this.padding * 2
  this.height = this.canvas.height - this.y - this.padding - this.fontHeight
  this.scaleX = this.width / this.rangeX
  this.scaleY = this.height / this.rangeY

  // draw x y axis and tick marks  
  this.drawXAxis()
  this.drawYAxis()
}  

LineChartGenerator.prototype.getLongestValueWidth = function(){  
  this.context.font = this.font
  var longestValueWidth = 0
  for (var n = 0; n <= this.numYTicks; n++) {  
		// var value = this.maxY - (n * this.unitsPerTickY)
		var value = Math.round(this.maxY - n * this.maxY / this.numYTicks)
		longestValueWidth = Math.max(longestValueWidth, this.context.measureText(value).width)
  }  
  return longestValueWidth
}

LineChartGenerator.prototype.drawXAxis = function(){  
  var context = this.context
  context.save()
  context.beginPath()
  context.moveTo(this.x, this.y + this.height)
  context.lineTo(this.x + this.width, this.y + this.height)
  context.strokeStyle = this.axisColor
  context.lineWidth = 2
  context.stroke()

  // draw tick marks  
  for (var n = 0; n < this.numXTicks; n++){ 
		context.beginPath()
		context.moveTo((n + 1) * this.width / this.numXTicks + this.x, this.y + this.height)
		context.lineTo((n + 1) * this.width / this.numXTicks + this.x, this.y + this.height - this.tickSize)
		context.stroke()
  }  

  // draw labels  
  context.font = this.font
  context.fillStyle = "black"
  context.textAlign = "center"
  context.textBaseline = "middle"

	const monthNumberDays = {
		1: 31, 
		2: 28, 
		3: 31, 
		4: 30, 
		5: 31, 
		6: 30,  
		7: 31, 
		8: 31, 
		9: 30, 
		10: 31, 
		11: 30, 
		12: 31, 
	}

  // for (var n = 0; n < this.numXTicks; n++) {  
	for (var n = this.minDate.getDate(); n < this.numXTicks + this.minDate.getDate(); n++){
		var label = ""
		if (n % 3 === 0){
			let dayIndex = Math.round((n + 1) * this.maxX / this.numXTicks)
			let month = this.minDate.getMonth()

			// this confusing function is used to get the month and date 
			// calculated from the minDate day of month and the index n the for function is
			// providing
			while(((dayIndex - monthNumberDays[month + 1]) / monthNumberDays[month]) > 0){
				dayIndex = dayIndex - monthNumberDays[month + 1]
				if (dayIndex === 0){
					dayIndex = 1
				}
				month = month + 1
				if (month === 13){
					month = 1
				}
			}

			label = (dayIndex) + "." + (month + 1) + "."

		}
		context.save()
		context.translate((n - this.minDate.getDate() + 1) * this.width / this.numXTicks + this.x, this.y + this.height + this.padding)
		context.fillText(label, 0, 0)
		context.restore()
  }  
  context.restore()
}

LineChartGenerator.prototype.drawYAxis = function(){  
  var context = this.context  
  context.save()
  context.save()
  context.beginPath()
  context.moveTo(this.x, this.y)
  context.lineTo(this.x, this.y + this.height)
  context.strokeStyle = this.axisColor
  context.lineWidth = 2
  context.stroke()
  context.restore()

  // draw tick marks  
  for (var n = 0; n < this.numYTicks; n++) {  
		context.beginPath()
		context.moveTo(this.x, n * this.height / this.numYTicks + this.y)
		context.lineTo(this.x + this.tickSize, n * this.height / this.numYTicks + this.y)
		context.stroke()
  }  

  // draw values  
  context.font = this.font
  context.fillStyle = "black"
  context.textAlign = "right"
  context.textBaseline = "middle"

  for (var n = 0; n < this.numYTicks; n++) {  
		var value = Math.round(this.maxY - n * this.maxY / this.numYTicks)
		context.save()
		context.translate(this.x - this.padding, n * this.height / this.numYTicks + this.y)
		context.fillText(value, 0, 0)
		context.restore()
	}  

  context.restore()
}  

LineChartGenerator.prototype.drawLine = function(data, color, width) {  
  var context = this.context
  context.save()
  this.transformContext()
  context.lineWidth = width
  context.strokeStyle = color
  context.fillStyle = color
  context.beginPath()
  context.moveTo(data[0].x * this.scaleX, data[0].y * this.scaleY)

  for (var n = 0; n < data.length; n++) {  
		var point = data[n]

		// draw segment  
		context.lineTo(point.x * this.scaleX, point.y * this.scaleY)
		context.stroke()
		context.closePath()
		context.beginPath()
		context.arc(point.x * this.scaleX, point.y * this.scaleY, this.pointRadius, 0, 2 * Math.PI, false)
		context.fill()
		context.closePath()

		// position for next segment  
		context.beginPath()
		context.moveTo(point.x * this.scaleX, point.y * this.scaleY)
  }  
  context.restore()
}

LineChartGenerator.prototype.transformContext = function () {  
  var context = this.context

  // move context to center of canvas  
  this.context.translate(this.x, this.y + this.height)

  // invert the y scale so that that increments  
  // as you move upwards  
  context.scale(1, -1)
}