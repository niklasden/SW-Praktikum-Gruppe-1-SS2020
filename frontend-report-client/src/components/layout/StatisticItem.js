import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent } from '@material-ui/core';
import Heading from './Heading';

/**
 * Displays one statistic item
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 * 
 */
class StatisticItem extends Component {
	constructor(props) {
		super(props);
		this.state = {  }
	}
	
	/* Renders the component */
	render() { 
		if(this.props.retailer) {
			return (
				<Grid item xs={4}>
					<Card style={{backgroundColor: '#f2f2f2'}}>
						<CardContent style={{padding: '10px'}}>
							<Heading variant="h5">
								#{this.props.number}
							</Heading>
							<center>
								<h3>{this.props.name}</h3><br />
								{this.props.amount} <br />items bought
							</center>
						</CardContent>
					</Card>
				</Grid>
			)
		} else {
			return (
				<Grid item xs={4}>
					<Card style={{backgroundColor: '#f2f2f2'}}>
						<CardContent style={{padding: '10px'}}>
							<Heading variant="h5">
								#{this.props.number}
							</Heading>
							<center>
								<h3>{this.props.name}</h3><br />
									{this.props.amount}x<br />bought
								</center>
						</CardContent>
					</Card>
				</Grid>
			)
		}   
	}
}
 
const styles = theme => ({
	item: {
		backgroundColor: '#f2f2f2'
	}
})

export default withStyles(styles)(StatisticItem);
