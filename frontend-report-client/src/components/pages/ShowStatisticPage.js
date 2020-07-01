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

/**
 * Displays the statistic page
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 * 
 */

const styles = theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '75%',
    }
});
const initStartDate = new Date();
const initStartDateMonth = initStartDate.getMonth() < 10 ? "0" + (initStartDate.getMonth() + 1) : (initStartDate.getMonth() + 1);
const initStartDateDay = initStartDate.getDate() < 10 ? "0" + initStartDate.getDate() : initStartDate.getDate();
const initStartDateFullDate = initStartDate.getFullYear() + "-" + initStartDateMonth + "-" + initStartDateDay;

const initEndDate = new Date(initStartDate.setDate(initStartDate.getDate() + 7));
const initEndDateMonth = initEndDate.getMonth() < 10 ? "0" + (initEndDate.getMonth() + 1) : (initEndDate.getMonth() + 1);
const initEndDateDay = initEndDate.getDate() < 10 ? "0" + initEndDate.getDate() : initEndDate.getDate();
const initEndDateFullDate = initEndDate.getFullYear() + "-" + initEndDateMonth + "-" + initEndDateDay;
console.log("StartTime:", initStartDateFullDate, " Endtime:", initEndDateFullDate)
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
            error: null
        }
        this.handleChangeArticle = this.handleChangeArticle.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeRetailer = this.handleChangeRetailer.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
    }
    handleChangeCategory(event) {
        this.setState({selectedCategory: event.target.value})
    }
    handleChangeRetailer(event) {
        this.setState({selectedRetailer: event.target.value})
    }
    handleChangeArticle(event) {
        this.setState({selectedArticle: event.target.value})
    }
    handleChangeStartTime(event) {
        this.setState({selectedStartTime: event.target.value})
    }
    handleChangeEndTime(event) {
        this.setState({selectedEndTime: event.target.value})
    }
    async fetchProducts() {
       try {
            const res = await fetch("http://localhost:8081/api/shoppa/products/shopped")
            const json = await res.json();
            this.setState({products: json})
       }catch(exception) {
        this.setState({error: exception})
       }
    }
    async fetchRetailers() {
        try {
            const res = await fetch("http://localhost:8081/api/shoppa/retailers")
            const json = await res.json();
            this.setState({retailer: json})
        }catch(exception) {
            this.setState({error: exception})
        }
        
    }
    componentDidMount() {
        this.fetchRetailers();
        this.fetchProducts();
    }
    render() { 
        var categoryTemp = [];
        this.state.retailer.forEach(r => {
            if(!categoryTemp.includes(r.category)) {
                categoryTemp.push(r.category)
            }
        })
        // const retailerCategories = categoryTemp;
        const classes = this.props.classes;
        const { error } = this.state;
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
                {/* <Grid item xs={12}>
                    <Typography color="primary">KATEGORIE AUSWÄHLEN</Typography>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Kategorie</InputLabel>
                        <Select value={this.state.selectedCategory} onChange={this.handleChangeCategory}>
                            <MenuItem value={"Alle"}>Alle</MenuItem>
                            {retailerCategories.map(rC => (
                                <MenuItem key={rC} value={rC}>{rC}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid> */}
                <Grid item xs={12}>
                    <Typography color="primary">EINZELHÄNDLER AUSWÄHLEN</Typography>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Einzelhändler</InputLabel>
                        <Select value={this.state.selectedRetailer} onChange={this.handleChangeRetailer}>
                            <MenuItem value={"Alle"}>Alle</MenuItem>
                            {this.state.retailer.map(r => (
                                <MenuItem key={r.id} value={r.name}>{r.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography color="primary">ARTIKEL AUSWÄHLEN</Typography>
                    <FormControl className={classes.formControl} >
                        <InputLabel>Artikel</InputLabel>
                        <Select value={this.state.selectedArticle} onChange={this.handleChangeArticle}>
                            <MenuItem value={"Alle"}>Alle</MenuItem>
                            {this.state.products.map(p=> (
                                <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container direction="row">
                    <Grid item xs={6}>
                        <Typography color="primary">START AUSWÄHLEN</Typography>
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
                        <Typography color="primary">ENDE AUSWÄHLEN</Typography>
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
                <Statistic id="test-chart" retailer={this.state.selectedRetailer} category={this.state.selectedCategory} article={this.state.selectedArticle} startTime={this.state.selectedStartTime} endTime={this.state.selectedEndTime} />
                </>
                }
            </Grid>
        );
    }
}
 
export default (withStyles)(styles)(ShowStatisticPage);