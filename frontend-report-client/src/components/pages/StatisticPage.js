import React, { Component } from 'react';
import Heading from '../layout/Heading';
import MainButton from '../layout/MainButton';
import StatisticItem from '../layout/StatisticItem';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

/**
 * Displays the statistic page
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 * 
 */
class StatisticPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            retailers: [],
            products: []
        }
    }

    fetchTopProducts() {
        fetch("http://localhost:8081/api/shoppa/products/top")
        .then(res => res.json())
        .then(json => {
            this.setState({products: json})
        })
    }
    fetchTopRetailers() {
        fetch("http://localhost:8081/api/shoppa/retailers/top")
        .then(res => res.json())
        .then(json => {
            this.setState({retailers: json})
        })
    }
    componentDidMount() {
        this.fetchTopProducts();
        this.fetchTopRetailers();
    }
    render() { 
        return (
            <>
            <Heading>MEISTBESUCHTE EINZELHÄNDLER</Heading>
            <Grid item xs={12} container spacing={1}>
                {this.state.retailers.map(retailer => {
                    return <StatisticItem retailer number={retailer.nr} name={retailer.name} amount={retailer.amount} />
                })}
            </Grid>
            <Heading>MEISTGEKAUFTE ARTIKEL</Heading>
            <Grid item xs={12} container spacing={1}>
                {this.state.products.map(article => {
                    return <StatisticItem article number={article.nr} name={article.name} amount={article.amount} />
                })}
            </Grid>
            <Link to="/show">
                <MainButton>STATISTIK ANZEIGEN</MainButton>
            </Link>
            </>
        );
    }
}
 
export default StatisticPage;