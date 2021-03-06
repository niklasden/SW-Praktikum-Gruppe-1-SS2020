import React, { Component } from 'react';
import Heading from '../layout/Heading';
import MainButton from '../layout/MainButton';
import StatisticItem from '../layout/StatisticItem';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
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

		// we need this to get statistics page width to render the 
		// charts accordingly
		this.statRef = React.createRef()
	}

	/* Method to fetch all products and retailers when group in dropdown has changed. */
	handleChangeGroup(event) {
		this.setState({selectedGroup: event.target.value});
		this.fetchTopProducts(event.target.value);
		this.fetchTopRetailers(event.target.value);
	}

	/* Method to check, if user exists in database */
	async fetchCurrentUserDBID() {
		const res = await fetch(Config.apiHost + "/User/firebaseid/" + this.props.currentUser.uid);
		const json = await res.json();
		return json.id;
	}

	/* fetches user assigned groups */
	async fetchGroups() {
		/* Try to fetch groups, otherwise raise an exception */
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
	/* Fetches top three products where the group has bought the most */
	async fetchTopProducts(group_id) {
		try {
			var topArticlesList = [], articleIDs = [], i = 1;
			const res = await fetch(Config.apiHost + "/report/" + group_id);
			const json = await res.json();
			json.top_articles.sort((a, b) => (a.number_bought > b.number_bought) ? -1 : 1)
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
	/* Fetches top three retailers where the group has visited the most */
	async fetchTopRetailers(group_id) {
		try {
			var topRetailersList = [], retailerIDs = [], i = 1;
			const res = await fetch(Config.apiHost + "/report/" + group_id);
			const json = await res.json();
			json.top_retailers.forEach(retailer => {
				if(!retailerIDs.includes(retailer.retailer_id)) {
					retailer.rank = i;
					i++;
					topRetailersList.push(retailer);
					retailerIDs.push(retailer.retailer_id);
				}
			})
			this.setState({retailers: topRetailersList})
		} catch(exception) {
			this.setState({error: exception});
		}
	}
	
	/* Lifecycle method */
	componentDidMount() {
		this.setState({
			dataLoading: true
		});
		if(settingsOptions.currentUserID !== 0) {
			this.fetchGroups();
		}
	}

	/* Renders the component */
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
					<Grid container style={{padding: '1em', marginBottom: 70}} ref={this.statRef}>
						<LoadingProgress show={dataLoading} />
						<Heading>SELECT A GROUP</Heading>
						<FormControl className={classes.formControl} >
								<InputLabel>Group</InputLabel>
								<Select value={this.state.selectedGroup} onChange={this.handleChangeGroup} onLoad={this.handleChangeGroup}>
									{this.state.groups.map(g=> (
										<MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
									))}
								</Select>
						</FormControl>
						<Heading>MOST VISITED RETAILERS</Heading>
						<Grid align='center'>
							{( (this.statRef.current !== null) && (retailerChartData.length !== 0)) &&
								<BarChart 
									width={this.statRef.current.offsetWidth - 50}
									data={retailerChartData}
									title='Einzelhändler'
								/>
							}
						</Grid>
						<Grid container spacing={1}>
							{this.state.retailers.map(retailer => {
									return <StatisticItem retailer key={retailer.retailer_id} number={retailer.rank} name={retailer.retailer_name} amount={retailer.amount} />
							})}
						</Grid>
						<Heading>MOST BOUGHT ARTICLES</Heading>
						<Grid align='center'>
							{ ((this.statRef.current !== null) && (productsChartData.length !== 0)) &&
								<BarChart 
									width={this.statRef.current.offsetWidth - 50}
									data={productsChartData}
									title='Einzelhändler'
								/>
							}
						</Grid>
						<Grid container spacing={1}>
							{this.state.products.map(article => {
								return <StatisticItem article key={article.article_id} number={article.rank} name={article.article_name} amount={article.number_bought} />
							})}
						</Grid>
						<Grid container alignContent="center" justify="center" direction="row">
						<Link to={`./show/${this.state.selectedGroup}`}>
							<MainButton>Show statistic</MainButton>
						</Link>
						</Grid>
					</Grid>
				}
			</>
		);
	}
}
 
export default (withStyles)(styles)(StatisticPage);