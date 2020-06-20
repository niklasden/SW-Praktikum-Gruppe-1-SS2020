import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import Heading from './Heading';

const styles = theme => ({
    item: {
        backgroundColor: '##f2f2f2'
    }
});

class StatisticItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
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
                                {this.props.amount} EINKÄUFE
                            </center>
                        </CardContent>
                    </Card>
                </Grid>
        );
        }else {
            return (
                <Grid item xs={4}>
                    <Card style={{backgroundColor: '#f2f2f2'}}>
                        <CardContent style={{padding: '10px'}}>
                            <Heading variant="h5">
                                #{this.props.number}
                            </Heading>
                            <center>
                                <h3>{this.props.name}</h3><br />
                                {this.props.amount}x GEKAUFT
                            </center>
                        </CardContent>
                    </Card>
                </Grid>
        );
        }
        
    }
}
 
export default withStyles(styles)(StatisticItem);
