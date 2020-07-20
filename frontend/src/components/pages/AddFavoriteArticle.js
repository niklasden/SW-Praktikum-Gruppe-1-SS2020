import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router';
import { Config } from '../../config';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MainButton from '../layout/MainButton';
import Heading from '../layout/Heading';
import shoppingSettings from '../../shoppingSettings';

const styles = theme => ({
    root: {},
    control: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '90%'
      },
      button: {
          minWidth: 200,
      }
});
const settingsobj = shoppingSettings.getSettings();

class AddFavoriteArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentGroupID: window.location.pathname.split("/")[2],
            currentArticleID: 0,
            currentAmount: 0,
            currentUnit: '',
            currentRetailerID: 0,
            currentCreationDate: '',
            articles: [],
            retailer: [],
            isLoading: false,
            error: null,
            inputArticle: '',
            inputRetailer: ''
        }
        this.handleChangeArticleName = this.handleChangeArticleName.bind(this);
        this.handleChangeRetailerName = this.handleChangeRetailerName.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.saveFavArticle = this.saveFavArticle.bind(this);
        this.handleChangeUnit = this.handleChangeUnit.bind(this);
    }
    handleChangeArticleName(event) {
        this.setState({currentArticleID: event.target.value});
    }
    handleChangeRetailerName(event) {
        this.setState({currentRetailerID: event.target.value});
    }
    handleChangeAmount(event) {
        console.log("changed amount of", this.state.currentAmount, " to ", parseInt(event.target.value));
        this.setState({currentAmount: parseInt(event.target.value)});
    }
    handleChangeUnit(event) {
        this.setState({currentUnit: event.target.value});
    }
    async getArticles() {
        const json = await fetch(Config.apiHost + "/Article");
        const res = await json.json();
        res.forEach(article => {
            if(article.id === this.state.currentArticleID) {
                this.setState({currentArticleID: article.id})
            }
        })
        this.setState({articles: res});
    }
    async getRetailer() {
        const json = await fetch(Config.apiHost + "/Retailer");
        const res = await json.json();
        res.forEach(retailer => {
            if(retailer.id === this.state.currentRetailerID) {
                this.setState({currentRetailerID: retailer.id})
            }
        })
        this.setState({retailer: res})
    }

    async saveFavArticle() {
        try{
            const groupID = await settingsobj.onlySettingsGetSettingsGroupID();
            console.log(groupID);
            const rb = {
                id: 0,
                group_id: parseInt(this.state.currentGroupID),
                article_id: parseInt(this.state.currentArticleID),
                amount: parseInt(this.state.currentAmount),
                unit: this.state.currentUnit,
                retailer_id: parseInt(this.state.currentRetailerID),
                creationdate: "2020-07-16T08:32:04.104Z"
            }
            const requestBody = JSON.stringify(rb)
            console.log(requestBody);
            const rInit = {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json'
              }, 
              body: requestBody
            } 
            const resp = await fetch(Config.apiHost + '/favoriteArticle', rInit)
            if(resp.ok){
                this.props.history.push('/favorite_products')
            }else {
                this.setState({error: resp});
            }
        }catch(e) {
        this.setState({error: e})
        }
    }
    async componentDidMount() {
        this.setState({isLoading: true})
        await this.getArticles();
        await this.getRetailer();
        this.setState({isLoading: false})
    }
    render() {
        const {error, isLoading, currentArticleID, currentRetailerID, currentAmount, currentUnit} = this.state;
        const {classes} = this.props;
        return (
            error ?
            <ContextErrorMessage error={error} contextErrorMsg={error.message} />
            :
            isLoading ?
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress size={25} />
              </div>
            :
            <>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12}>
                    <Heading>Edit Favorite Article</Heading>
                </Grid>
            <Grid item xs={12}>
                <FormControl className={classes.control}>
                    <InputLabel>Article</InputLabel>
                    <Select
                    displayEmpty
                    value={currentArticleID}
                    onChange={this.handleChangeArticleName}
                    >
                        {this.state.articles.map(article => (
                            <MenuItem key={article.id} value={article.id}>{article.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl className={classes.control}>
                    <InputLabel>Retailer</InputLabel>
                    <Select
                    displayEmpty
                    value={currentRetailerID}
                    onChange={this.handleChangeRetailerName}
                    >
                        {this.state.retailer.map(retailer => (
                            <MenuItem key={retailer.id} value={retailer.id}>{retailer.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField className={classes.control} label="Amount" defaultValue={currentAmount} onChange={this.handleChangeAmount} />
            </Grid>
            <Grid item xs={12}>
                
                <FormControl className={classes.control}>
                    <InputLabel>UNIT</InputLabel>
                    <Select
                    displayEmpty
                    defaultValue={currentUnit}
                    onChange={this.handleChangeUnit}
                    
                    >
                    <MenuItem value={'kg'}>Kg</MenuItem>
                    <MenuItem value={'g'}>g</MenuItem>
                    <MenuItem value={'l'}>l</MenuItem>
                    <MenuItem value={'ml'}>ml</MenuItem>
                    <MenuItem value={'Stk.'}>Stk.</MenuItem>
                    <MenuItem value={'Pkg.'}>Pkg.</MenuItem>
                    </Select>
                </FormControl>
                
                
                {/* <TextField className={classes.control} label="Unit" defaultValue={currentUnit} onChange={this.handleChangeUnit} /> */}
            </Grid>
        </Grid>
        <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
            <Grid item xs={6}>
              <MainButton className={classes.button}>CANCEL</MainButton>
            </Grid>
            <Grid item xs={6}>
              <MainButton className={classes.button} onclick={this.saveFavArticle}>SAVE</MainButton>
            </Grid>
        </Grid>
        </>
        )
    }
}
export default withRouter(withStyles(styles)(AddFavoriteArticle)); 
