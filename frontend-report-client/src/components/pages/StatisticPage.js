import React, { Component } from 'react';
import Heading from '../layout/Heading';
import MainButton from '../layout/MainButton';
import StatisticItem from '../layout/StatisticItem';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MainBarChart from '../layout/MainBarChart';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import LoadingProgress from '../dialogs/LoadingProgress';
import {Config} from '../../config';
import { withStyles } from '@material-ui/core/styles';
import ShoppingSettings from '../../shoppingSettings';
import BarChart from '../../components/layout/BarChart'

/**
 * Displays the statistic page
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 * 
 */

const settingsOptions = ShoppingSettings.getSettings();
var i = 0;
const styles = theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: '75%',
	}
});
class StatisticPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			retailers: [],
			products: [],
			error: null,
			dataLoading: false,
			groups: [],
			selectedGroup : 0,
		}
		this.handleChangeGroup = this.handleChangeGroup.bind(this);
	}

	handleChangeGroup(event) {
		this.setState({selectedGroup: event.target.value});
		this.fetchTopProducts(event.target.value);
		this.fetchTopRetailers(event.target.value);
	}
	async fetchCurrentUserDBID() {
		const res = await fetch(Config.apiHost + "/User/firebaseid/" + this.props.currentUser.uid);
		const json = await res.json();
		return json.id;
	}

	async fetchGroups() {
		try {
			const currentUserDBID = await this.fetchCurrentUserDBID();
			const res = await fetch(Config.apiHost + "/Group/Usergroup/" + currentUserDBID);
			const json = await res.json();
			this.setState({groups: json})
			this.setState({selectedGroup: json[0].id})
			this.fetchTopProducts(json[0].id);
			this.fetchTopRetailers(json[0].id);
			this.setState({dataLoading: false});
		}catch(exception) {
			this.setState({error: exception})
		}
	}
	async fetchTopProducts(group_id) {
		try {
			var topArticlesList = [], articleIDs = [], i = 1;
			const res = await fetch(Config.apiHost + "/report/" + group_id);
			const json = await res.json();
			json.top_articles.forEach(article => {
				if(!articleIDs.includes(article.article_id)) {
					article.rank = i;
					i++;
					topArticlesList.push(article);
					articleIDs.push(article.article_id);
				}
			})
			this.setState({products: topArticlesList})
		}catch(exception) {
			this.setState({error: exception});
		}
	}
	async fetchTopRetailers(group_id) {
		try {
			var topRetailersList = [], retailerIDs = [], i = 1;
			const res = await fetch(Config.apiHost + "/report/" + group_id);
			console.log(res);
			const json = await res.json();
			json.top_retailers.forEach(retailer => {
				if(!retailerIDs.includes(retailer.retailer_id)) {
					retailer.rank = i;
					i++;
					topRetailersList.push(retailer);
					retailerIDs.push(retailer.retailer_id);
				}
			})
			console.log(topRetailersList);
			this.setState({retailers: topRetailersList})
		}catch(exception) {
			this.setState({error: exception});
		}
	}
	componentDidMount() {
		this.setState({
			dataLoading: true
		});
		if(settingsOptions.currentUserID !== 0) {
			this.fetchGroups();
		}

	}
	render() { 
		const retailerChartData = []
		this.state.retailers.forEach(d => {
			retailerChartData.push({
				title: d.retailer_name,
				value: d.amount
			})
		})

		const productsChartData = []
		this.state.products.forEach(d => {
			productsChartData.push({
				title: d.article_name,
				value: d.number_bought
			})
		})

		var myVinyls = [
			{
				title: 'hello', 
				value: 31
			},
			{
				title: 'fresh', 
				value: 41
			},
			{
				title: 'again', 
				value: 20
			},
		];

		console.log(retailerChartData)

		const { error, dataLoading } = this.state;
		const classes = this.props.classes;
		
		if(settingsOptions.getCurrentUserID() !== 0 && i === 0) {
			this.fetchGroups();
			i++;
		}
		return (
			<>
				{error ?
					<ContextErrorMessage error={error} contextErrorMsg={`Data could not be loaded. Check if database server is running.`} />
				:
					<>
						<LoadingProgress show={dataLoading} />
						<Heading>GRUPPE AUSWÄHLEN</Heading>
						<FormControl className={classes.formControl} >
								<InputLabel>Gruppe</InputLabel>
								<Select value={this.state.selectedGroup} onChange={this.handleChangeGroup} onLoad={this.handleChangeGroup}>
									{this.state.groups.map(g=> (
										<MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
									))}
								</Select>
						</FormControl>
						<Heading>MEISTBESUCHTE EINZELHÄNDLER</Heading>
						{/* <MainBarChart retailer data={this.state.retailers} /> */}
						<Grid align='center'>
							{retailerChartData.length != 0 &&
								<BarChart 
									width={window.innerWidth - 50}
									data={retailerChartData}
									title='Einzelhändler'
								/>
							}
						</Grid>
						<Grid item xs={12} container spacing={1}>
							{this.state.retailers.map(retailer => {
									return <StatisticItem retailer key={retailer.retailer_id} number={retailer.rank} name={retailer.retailer_name} amount={retailer.amount} />
							})}
						</Grid>
						<Heading>MEISTGEKAUFTE ARTIKEL</Heading>
						{/* <MainBarChart products data={this.state.products} /> */}
						<Grid align='center'>
							{productsChartData.length != 0 &&
								<BarChart 
									width={window.innerWidth - 50}
									data={productsChartData}
									title='Einzelhändler'
								/>
							}
						</Grid>
						<Grid item xs={12} container spacing={1}>
							{this.state.products.map(article => {
								return <StatisticItem article key={article.article_id} number={article.rank} name={article.article_name} amount={article.number_bought} />
							})}
						</Grid>
						
						<Link to={`./show/${this.state.selectedGroup}`}>
							<MainButton>STATISTIK ANZEIGEN</MainButton>
						</Link>
					</>
				}
			</>
		);
	}
}
 
export default (withStyles)(styles)(StatisticPage);