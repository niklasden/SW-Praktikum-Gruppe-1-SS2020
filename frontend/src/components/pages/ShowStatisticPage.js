import React, { Component } from 'react';
import Heading from '../layout/Heading';
import { Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Statistic from '../layout/Statistic';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const styles = theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '75%',
    }
});
const todaysDay = new Date().getDate();
const todaysMonth = new Date().getMonth() + 1;
if(todaysMonth < 10) {
    var clearedTodaysMonth = "0" + todaysMonth
}else {
    var clearedTodaysMonth = todaysMonth;
}
const todaysYear = new Date().getFullYear();
const todaysDate = todaysYear + "-" + clearedTodaysMonth + "-" + todaysDay;
class ShowStatisticPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: "Alle",
            selectedRetailer: "Alle",
            selectedArticle: "Alle",
            selectedTime: todaysDate
        }
        this.handleChangeArticle = this.handleChangeArticle.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeRetailer = this.handleChangeRetailer.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
    }
    handleChangeCategory(event) {
        this.setState({selectedCategory: event.target.value})
    }
    handleChangeRetailer(event) {
        console.log(event.target.value);
        this.setState({selectedRetailer: event.target.value})
    }
    handleChangeArticle(event) {
        this.setState({selectedArticle: event.target.value})
    }
    handleChangeTime(event) {
        this.setState({selectedTime: event.target.value})
        console.log(event.target.value)
    }

    render() { 
        const classes = this.props.classes;
        return (
            <Grid container xs={12} style={{padding: '1em'}}>
                <Grid item xs={12}>
                    <Heading>KATEGORIE AUSWÄHLEN</Heading>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Kategorie</InputLabel>
                        <Select value={this.state.selectedCategory} onChange={this.handleChangeCategory}>
                            <MenuItem value={"Alle"}>Alle</MenuItem>
                            <MenuItem value={"Lebensmittelläden"}>Lebensmittelläden</MenuItem>
                            <MenuItem value={"Drogeriemärkte"}>Drogeriemärkte</MenuItem>
                            <MenuItem value={"Baumärkte"}>Baumärkte</MenuItem>
                            <MenuItem value={"Elektronikfachhandel"}>Elektronikfachhandel</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Heading>EINZELHÄNDLER AUSWÄHLEN</Heading>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Einzelhändler</InputLabel>
                        <Select value={this.state.selectedRetailer} onChange={this.handleChangeRetailer}>
                            <MenuItem value={"Alle"}>Alle</MenuItem>
                            <MenuItem value={"ALDI"}>ALDI</MenuItem>
                            <MenuItem value={"DM"}>DM</MenuItem>
                            <MenuItem value={"EDEKA"}>EDEKA</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Heading>ARTIKEL AUSWÄHLEN</Heading>
                    <FormControl className={classes.formControl} >
                        <InputLabel>Artikel</InputLabel>
                        <Select value={this.state.selectedArticle} onChange={this.handleChangeArticle}>
                            <MenuItem value={"Alle"}>Alle</MenuItem>
                            <MenuItem value={"Apfel"}>Apfel</MenuItem>
                            <MenuItem value={"Birne"}>Birne</MenuItem>
                            <MenuItem value={"Bier"}>Bier</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Heading>ZEITRAUM AUSWÄHLEN</Heading>
                        <TextField
                            id="date"
                            type="date"
                            defaultValue={this.state.selectedTime}
                            style={{minWidth: '75%'}}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={this.handleChangeTime}
                        />
                </Grid>
                <Statistic id="test-chart" retailer={this.state.selectedRetailer} category={this.state.selectedCategory} article={this.state.selectedArticle} time={this.state.selectedTime} />
            </Grid>
        );
    }
}
 
export default (withStyles)(styles)(ShowStatisticPage);