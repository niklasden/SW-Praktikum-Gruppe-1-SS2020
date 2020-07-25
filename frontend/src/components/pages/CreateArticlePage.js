import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import TextInputBar from '../layout/TextInputBar';
import Icon from '@material-ui/core/Icon';
import { Grid, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import MainButton from '../layout/MainButton';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar';
import { Redirect, withRouter } from 'react-router';
import Button from '@material-ui/core/Button'
import { Config } from '../../config';
import { timeout } from '../../timeout'

/**
 * Renders the page to create an article.
 * 
 * @see ArticleEntry
 * 
 * @author [Pia Schmid](https://github.com/PiaSchmid)
 * 
 */
  
class CreateArticlePage extends Component {
	// Init the state
	state = {
		snackbarOpen: false, 
		isSaving: false,
		redirectToArticlePage: false,
		id: 0, 
		name: '', 
		category: '',
		categorys: [
			{ id: 1, name: 'vegetables' },
			{ id: 2, name: 'meat & fish' },
			{ id: 3, name: 'fruits' },
			{ id: 4, name: 'drinks' },
			{ id: 5, name: 'other' },
			{ id: 6, name: 'snacks' },
			{ id: 7, name: 'milk & cheese' },
			{ id: 8, name: 'cosmetic' },
			{ id: 9, name: 'convenience & frozen products' },
		], 
	}

	/** Adds an article to the ProductsPage */
	async onClickSave(){
		this.setState({ isSaving: true })
		await timeout(500)
		let id = this.state.item
		if ((id === '') && (this.state.name !== '') && (this.state.category !== '')){
			id = 0
		} else {
			this.showErrorSnackBar()
		}
		const article ={
			id: id, 
			name: this.state.name, 
			category: this.state.category,
			// this is the creation date, it will not be used but we need 
			// to send it anyway so there is no marshall error
			cd: '', 
		}
		const requestBody = JSON.stringify(article)
		const rInit = {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: requestBody
		}
		const resp = await fetch(Config.apiHost + '/Article', rInit)
		if(resp.ok){
			this.props.history.push('/products')
		} else {
			this.showErrorSnackBar()
		}
		this.setState({ isSaving: false})
	}

	/** Deletes an article from the ProductPage */
	async onClickDelete(){
		this.setState({ isSaving: true })
		await timeout(0)
			const article = {
			id: parseInt(this.state.item), 
			name: this.state.name, 
			category: this.state.category		
		}
		const rInit = {
			method: 'DELETE', 
			credentials: 'include',
			headers: {
				'Content-Type': 'aplication/jason'
			}, 
			body: JSON.stringify(article)
		}
		const resp = await fetch(Config.apiHost +'/Article/' + article.id, rInit)
		if(resp.ok){
			this.props.history.push('/products')
		} else {
			this.showErrorSnackBar()
		}
		this.setState({ isSaving: false })
	}

	showErrorSnackBar(){
		this.setState({ snackbarOpen: true })
		setTimeout(() => {
			this.setState({ snackbarOpen: false })
		}, 2000)
	}

 	/** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  	componentDidMount(){
		let name = ''
		let category = ''
		let id = ''
		//checks if there has been an article from the article page
		// if yes, it takes name and category from there
		if (this.props.location.state !== undefined){
			id = this.props.location.state.id
			name = this.props.location.state.name
			this.state.categorys.forEach((element, i) => {
				if (element.name === this.props.location.state.category){
					category = element.id 
				}
			})
		} 
		this.setState({
			item: id,
			name: name, 
			category: category
		})
	}

	/** Renders the component */
	render(){ 
		// if we created an article this will be true and we will be redirected to article page
		if (this.state.redirectToArticlePage) {
			return <Redirect push to= "/products"/>
		} 

		return (
			<Grid container 
				direction="column"
				xs={12} 
				style={{padding: "1em"}}
			>
				<Grid item xs={12}>
					<TextInputBar 
						icon="playlist_add" 
						placeholder="article name"
						onChange={(e) => this.setState({name: e.target.value})}
						value={this.state.name}
					/>
				</Grid>

				<Grid container 
					xs={12} 
					direction="row"
					className={styles.box}
					alignContent="center"
					justify="center"
					alignItems="center"
					style={{marginTop: "1em", paddingBottom: "1em", paddingLeft: "1em", border: '1px solid #bdbdbd', borderRadius: 10}}
				>
					<Grid item xs={1}>
							<Icon style={{color: "#00BCD4", marginTop: "1em" }} fontSize="medium" >description</Icon>
					</Grid>

					<Grid item xs={11}> 
						<FormControl
							className={styles.formControl}
							style={{ color: "#00BCD4", marginLeft:"20px", width:"85%" }}
						>
							<InputLabel>select category</InputLabel>

							<Select 
								onChange={(e) => this.setState({category: e.target.value})}
								value={this.state.category}
							>		
								{this.state.categorys.map((element) => {
									return <MenuItem value={element.id}>{element.name}</MenuItem>
								})}
							</Select>
						</FormControl>
					</Grid>
				<Grid
					container
					xs ={11}
					direction="row"
					justify="center"
					alignItems="flex-end"
					style={{position: "absolute", bottom: "80px"}}
				>
					<Grid item>
						<div style={{display: 'flex', flexDirection: 'row'}}>
							<MainButton 
								className={styles.CreateButton}
								onclick={this.onClickSave.bind(this)}
							>save</MainButton>

							<div style={{marginLeft: 12}}>
								<MainButton 
									className={styles.CreateButton} 
									onclick={this.onClickDelete.bind(this)}
									disabled={this.state.id === ''}
								>delete</MainButton>
							</div>
						</div>   

						{this.state.isSaving &&
							<div style={{display: 'flex', justifyContent: 'center', marginTop: 12}}>
								<CircularProgress size={20} />
							</div>
						}
					</Grid>
				</Grid>
			</Grid>            

			{/* Snackbar that is shown when an error in posting or deleting is thrown */}
			<Snackbar
					open={this.state.snackbarOpen}
					onClose={() => this.setState({snackbarOpen: false})}
					message="Error connecting to server"
					action={
						<Button 
							color="inherit" 
							size="small"
							onClick={() => this.setState({ snackbarOpen: false })}
						>Undo</Button>
					}
				/>
			</Grid>
		)
	}
}; 

/** Component specific styles */
const styles = theme => ({
	root: {
		backgroundColor: '#fafafa', 
		borderRadius: 5, 
		padding: "5px",
	},
	formControl: {
		borderRadius: 5,
	},
	box: {
		backgroundColor: '#fafafa', 
		borderRadius: 10,
		verticalAlign: 'center'
	}, 
	CreateButton: {
		justifyContent: 'center',
		alignContent: 'center', 
	},
});
  
export default withRouter(withStyles(styles)(CreateArticlePage)); 