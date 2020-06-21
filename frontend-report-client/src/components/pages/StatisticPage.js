import React, { Component } from 'react';
import Heading from '../layout/Heading';
import MainButton from '../layout/MainButton';
import StatisticItem from '../layout/StatisticItem';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MainBarChart from '../layout/MainBarChart';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';

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
            products: [],
            error: null
        }
    }

    async fetchTopProducts() {
        try {
            const res = await fetch("http://localhost:8081/api/shoppa/products/top");
            const json = await res.json();
            this.setState({products: json})
        }catch(exception) {
            this.setState({error: exception});
        }
        
    }
    async fetchTopRetailers() {
        try {
            const res = await fetch("http://localhost:8081/api/shoppa/retailers/top");
            const json = await res.json();
            this.setState({retailers: json})
        }catch(exception) {
            this.setState({error: exception});
        }
    }
    componentDidMount() {
        this.fetchTopProducts();
        this.fetchTopRetailers();
    }
    render() { 
    const { error } = this.state;
        return (
            <>
            {error ?
                <ContextErrorMessage error={error} contextErrorMsg={`Data could not be loaded. Check if server is running.`} />
            :
                <>
                    <Heading>MEISTBESUCHTE EINZELHÄNDLER</Heading>
                        <MainBarChart data={this.state.retailers} />
                        <Grid item xs={12} container spacing={1}>
                            {this.state.retailers.map(retailer => {
                                return <StatisticItem retailer key={retailer.nr} number={retailer.nr} name={retailer.name} amount={retailer.amount} />
                            })}
                        </Grid>
                        <Heading>MEISTGEKAUFTE ARTIKEL</Heading>
                        <MainBarChart data={this.state.products} />
                        <Grid item xs={12} container spacing={1}>
                            {this.state.products.map(article => {
                                return <StatisticItem article key={article.nr} number={article.nr} name={article.name} amount={article.amount} />
                            })}
                        </Grid>
                        <Link to="/show">
                            <MainButton>STATISTIK ANZEIGEN</MainButton>
                        </Link>
                    </>
                }
            </>
        );
    }
}
 
export default StatisticPage;