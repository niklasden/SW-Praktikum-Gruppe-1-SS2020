import CanvasJSReact from './statistic/canvasjs.react'
import React, { Component } from 'react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class MainBarChart extends Component {
	render() {
		const data = this.props.data;
		var itemList = [];
		if(this.props.retailer) {
			data.forEach(d => {
				var item = {
					label: d.retailer_name,
					y: d.amount
				}
			itemList.push(item);
			})
		} else {
			data.forEach(d => {
				var item = {
					label: d.article_name,
					y: d.number_bought
				}
			itemList.push(item);
			})
		}
        
		const options = {
			data: [{
				type: "column",
				dataPoints: itemList
			}]
		}
		return (
			<div>
				<CanvasJSChart options = {options} />
			</div>
		);
	}
}