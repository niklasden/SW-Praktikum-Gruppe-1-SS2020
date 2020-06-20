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

class ShowStatisticPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: null,
            selectedRetailer: null,
            selectedArticle: null,
            selectedTime: null
        }
    }
    render() { 
        const classes = this.props.classes;
        return (
            <Grid container xs={12} style={{padding: '1em'}}>
                <Grid item xs={12}>
                    <Heading>KATEGORIE AUSWÄHLEN</Heading>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Kategorie</InputLabel>
                        <Select value={this.state.selectedCategory}>
                            <MenuItem value={1}>Lebensmittelläden</MenuItem>
                            <MenuItem value={2}>Drogeriemärkte</MenuItem>
                            <MenuItem value={3}>Baumärkte</MenuItem>
                            <MenuItem value={4}>Elektronikfachhandel</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Heading>EINZELHÄNDLER AUSWÄHLEN</Heading>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Einzelhändler</InputLabel>
                        <Select value={this.state.selectedRetailer}>
                            <MenuItem value={1}>Alle</MenuItem>
                            <MenuItem value={2}>ALDI</MenuItem>
                            <MenuItem value={3}>DM</MenuItem>
                            <MenuItem value={4}>EDEKA</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Heading>ARTIKEL AUSWÄHLEN</Heading>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Einzelhändler</InputLabel>
                        <Select value={this.state.selectedArticle}>
                            <MenuItem value={1}>Alle</MenuItem>
                            <MenuItem value={2}>Apfel</MenuItem>
                            <MenuItem value={3}>Birne</MenuItem>
                            <MenuItem value={4}>Bier</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Heading>ZEITRAUM AUSWÄHLEN</Heading>
                        <TextField
                            id="date"
                            type="date"
                            defaultValue="2020-06-20"
                            style={{minWidth: '75%'}}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                </Grid>
                <Statistic id="test-chart" />
            </Grid>
        );
    }
}
 
export default (withStyles)(styles)(ShowStatisticPage);