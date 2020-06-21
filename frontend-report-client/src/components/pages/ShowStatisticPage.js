import React, { Component } from 'react';
import Heading from '../layout/Heading';
import { Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Statistic from '../layout/Statistic';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';

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
const initStartDate = new Date().getDate();
const initStartDateMonth = new Date().getMonth() + 1;
var clearedStartDateMonth = 0;
initStartDateMonth < 10 ? clearedStartDateMonth = "0" + initStartDateMonth : clearedStartDateMonth = initStartDateMonth;
const initStartDateYear = new Date().getFullYear();
const todaysDateinOneWeek = initStartDateYear + "-" + clearedStartDateMonth + "-" + parseInt(initStartDate + 7)
const todaysDate = initStartDateYear + "-" + clearedStartDateMonth + "-" + initStartDate;

class ShowStatisticPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            retailer: [],
            products: [],
            selectedCategory: "Alle",
            selectedRetailer: "Alle",
            selectedArticle: "Alle",
            selectedStartTime: todaysDate,
            selectedEndTime: todaysDateinOneWeek
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
    fetchProducts() {
        fetch("http://localhost:8081/api/shoppa/products")
        .then(res => res.json())
        .then(json => {
            this.setState({products: json})
        })
    }
    fetchRetailers() {
        fetch("http://localhost:8081/api/shoppa/retailers")
        .then(res => res.json())
        .then(json => {
            this.setState({retailer: json})
        })
    }
    componentDidMount() {
        this.fetchRetailers();
        this.fetchProducts();
    }
    render() { 
        var categoryTemp = [];
        this.state.retailer.map(r => {
            if(!categoryTemp.includes(r.category)) {
                categoryTemp.push(r.category)
            }
        })
        const retailerCategories = categoryTemp;
        const classes = this.props.classes;
        return (
            <Grid container xs={12} style={{padding: '1em'}} spacing={1}>
            <Link to="/">
                <ArrowBackIosIcon fontSize="large" color="primary" />
            </Link>
                <Grid item xs={12}>
                    <Heading>KATEGORIE AUSWÄHLEN</Heading>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Kategorie</InputLabel>
                        <Select value={this.state.selectedCategory} onChange={this.handleChangeCategory}>
                            <MenuItem value={"Alle"}>Alle</MenuItem>
                            {retailerCategories.map(rC => (
                                <MenuItem value={rC}>{rC}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Heading>EINZELHÄNDLER AUSWÄHLEN</Heading>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Einzelhändler</InputLabel>
                        <Select value={this.state.selectedRetailer} onChange={this.handleChangeRetailer}>
                            <MenuItem value={"Alle"}>Alle</MenuItem>
                            {this.state.retailer.map(r => (
                                <MenuItem value={r.name}>{r.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Heading>ARTIKEL AUSWÄHLEN</Heading>
                    <FormControl className={classes.formControl} >
                        <InputLabel>Artikel</InputLabel>
                        <Select value={this.state.selectedArticle} onChange={this.handleChangeArticle}>
                            <MenuItem value={"Alle"}>Alle</MenuItem>
                            {this.state.products.map(p=> (
                                <MenuItem value={p.name}>{p.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container xs={12} direction="row" justify="space-evenly">
                    <Grid item xs={6}>
                        <Heading>STARTDATUM AUSWÄHLEN</Heading>
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
                        <Heading>ENDDATUM AUSWÄHLEN</Heading>
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
            </Grid>
        );
    }
}
 
export default (withStyles)(styles)(ShowStatisticPage);