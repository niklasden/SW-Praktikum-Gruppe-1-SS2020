import CanvasJSReact from './statistic/canvasjs.react'
import React, { Component } from 'react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class MainBarChart extends Component {
	render() {
        const data = this.props.data;
        var itemList = [];
        data.map(d => {
            var item = {
                label: d.name,
                y: d.amount
            }
        itemList.push(item);
        })
		const options = {
			data: [
			{
				type: "column",
				dataPoints: itemList
			}
			]
		}
		return (
		<div>
			<CanvasJSChart options = {options} />
		</div>
		);
	}
}