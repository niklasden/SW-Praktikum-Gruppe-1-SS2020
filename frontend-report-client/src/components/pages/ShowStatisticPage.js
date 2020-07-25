import React, { Component } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Statistic from '../layout/Statistic';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import {Config} from '../../config';

/* Initialize start- and end-date of the selection */
const initStartDate = new Date();
const initStartDateMonth = initStartDate.getMonth() < 10 ? "0" + (initStartDate.getMonth() + 1) : (initStartDate.getMonth() + 1);
const initStartDateDay = "04";
const initStartDateFullDate = initStartDate.getFullYear() + "-" + initStartDateMonth + "-" + initStartDateDay;

const initEndDate = new Date(initStartDate.setDate(initStartDate.getDate() + 7));
const initEndDateMonth = initEndDate.getMonth() < 10 ? "0" + (initEndDate.getMonth() + 1) : (initEndDate.getMonth() + 1);
const initEndDateDay = initEndDate.getDate() < 10 ? "0" + initEndDate.getDate() : initEndDate.getDate();
const initEndDateFullDate = initEndDate.getFullYear() + "-" + initEndDateMonth + "-" + initEndDateDay;

/**
 * Displays the statistic page
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 * 
 */
class ShowStatisticPage extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			retailer: [],
			products: [],
			selectedCategory: "Alle",
			selectedRetailer: "Alle",
			selectedArticle: "Alle",
			selectedStartTime: initStartDateFullDate,
			selectedEndTime: initEndDateFullDate,
			error: null,
			group: null
		}

		this.handleChangeArticle = this.handleChangeArticle.bind(this);
		this.handleChangeCategory = this.handleChangeCategory.bind(this);
		this.handleChangeRetailer = this.handleChangeRetailer.bind(this);
		this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
		this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
	}

	/* Change state when category has changed */
	handleChangeCategory(event) {
		this.setState({selectedCategory: event.target.value})
	}

	/* Change state when retailer has changed */
	handleChangeRetailer(event) {
		this.setState({selectedRetailer: event.target.value})
	}

	/* Change state when article has changed */
	handleChangeArticle(event) {
		this.setState({selectedArticle: event.target.value})
	}

	/* Change state when start-date has changed */
	handleChangeStartTime(event) {
		this.setState({selectedStartTime: event.target.value})
	}

	/* Change state when end-date has changed */
	handleChangeEndTime(event) {
		this.setState({selectedEndTime: event.target.value})
	}

	/* Fetches products for selected group */
	async fetchProducts(groupID) {
		try {
			var productIDS = [], productList = [];
			const res = await fetch(Config.apiHost + "/report/" + groupID)
			const json = await res.json();
			json._report_listentries.forEach(lE => {
				if(!productIDS.includes(lE.id)) {
					productList.push(lE);
					productIDS.push(lE.id);
				}
			})
			this.setState({products: productList})
		} catch(exception) {
			this.setState({error: exception})
		}
	}

	/* Fetches retailers for selected group */
	async fetchRetailers(groupID) {
		try {
			var retailerList = [], retailerIDs = [];
			const res = await fetch(Config.apiHost + "/report/" + groupID)
			const json = await res.json();
			json.report_retailer.forEach(retailer => {
				if(!retailerIDs.includes(retailer.id)) {
					retailerList.push(retailer);
					retailerIDs.push(retailer.id);
				}
			})
			this.setState({retailer: retailerList})
		}catch(exception) {
			this.setState({error: exception})
		}
	}

	componentDidMount() {
		const location = window.location.pathname.split("/", 3);
		this.setState({group: parseInt(location[2])})
		this.fetchRetailers(parseInt(location[2]));
		this.fetchProducts(parseInt(location[2]));
	}

	/* Renders the component */
	render() { 
		var categoryTemp = [];
		this.state.retailer.forEach(r => {
			if(!categoryTemp.includes(r.category)) {
				categoryTemp.push(r.category)
			}
		})
		const classes = this.props.classes;
		const { error } = this.state;
		const location = window.location.pathname.split("/", 3); // get the group id out of the URL
		return (
			<Grid container style={{padding: '1em'}}>
				{ error ?
					<Grid item xs={12}>
						<ContextErrorMessage error={error} contextErrorMsg={`Data could not be loaded. Check if database server is running.`} />
					</Grid>
				:
					<>
						<Link to="/">
							<ArrowBackIosIcon fontSize="large" color="primary" />
						</Link>
						<Grid item xs={12}>
							<Typography color="primary">SELECT A RETAILER</Typography>
							<FormControl className={classes.formControl}>
								<InputLabel>Retailer</InputLabel>
								<Select value={this.state.selectedRetailer} onChange={this.handleChangeRetailer}>
									<MenuItem value={"Alle"}>All</MenuItem>
									{this.state.retailer.map(r => (
										<MenuItem key={r.id} value={r.name}>{r.name}</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Typography color="primary">SELECT AN ARTICLE</Typography>
							<FormControl className={classes.formControl} >
								<InputLabel>Article</InputLabel>
								<Select value={this.state.selectedArticle} onChange={this.handleChangeArticle}>
									<MenuItem value={"Alle"}>All</MenuItem>
									{this.state.products.map(p=> (
										<MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid container direction="row">
							<Grid item xs={6}>
								<Typography color="primary">SELECT START</Typography>
								<TextField
									id="date"
									type="date"
									defaultValue={this.state.selectedStartTime}
									style={{minWidth: '100%'}}
									InputLabelProps={{
										shrink: true,
									}}
									onChange={this.handleChangeStartTime}
								/>
							</Grid>
							<Grid item xs={6}>
								<Typography color="primary">SELECT END</Typography>
								<TextField
									id="date"
									type="date"
									defaultValue={this.state.selectedEndTime}
									style={{minWidth: '100%'}}
										InputLabelProps={{
										shrink: true,
									}}
									onChange={this.handleChangeEndTime}
								/>
							</Grid>
						</Grid>
						<Statistic 
							id="test-chart" 
							group={parseInt(location[2])} 
							retailer={this.state.selectedRetailer} 
							category={this.state.selectedCategory} 
							article={this.state.selectedArticle} 
							startTime={this.state.selectedStartTime} 
							endTime={this.state.selectedEndTime} 
						/>
					</>
				}
			</Grid>
		)
	}
}
 
const styles = theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: '75%',
	}
});

export default (withStyles)(styles)(ShowStatisticPage);