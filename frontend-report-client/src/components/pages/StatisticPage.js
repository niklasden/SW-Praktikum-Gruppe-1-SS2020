import React, { Component } from 'react';
import Heading from '../layout/Heading';
import MainButton from '../layout/MainButton';
import StatisticItem from '../layout/StatisticItem';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MainBarChart from '../layout/MainBarChart';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import LoadingProgress from '../dialogs/LoadingProgress';
import {Config} from '../../config';

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
            error: null,
            dataLoading: false,
        }
    }

    async fetchTopProducts() {
        try {
            const res = await fetch(Config.apiHost + "/report/1");
            const json = await res.json();
            this.setState({products: json.top_articles})
        }catch(exception) {
            this.setState({error: exception});
        }
        
    }
    async fetchTopRetailers() {
        try {
            const res = await fetch(Config.apiHost + "/report/1");
            const json = await res.json();
            this.setState({retailers: json.top_retailers})
        }catch(exception) {
            this.setState({error: exception});
        }
    }
    componentDidMount() {
        this.setState({
			dataLoading: true
		});
        this.fetchTopProducts();
        this.fetchTopRetailers();
        this.setState({
			dataLoading: false
        });
    }
    render() { 
    const { error, dataLoading } = this.state;
        return (
            <>
            {error ?
                    <ContextErrorMessage error={error} contextErrorMsg={`Data could not be loaded. Check if database server is running.`} />
                        :
                <>
                    <LoadingProgress show={dataLoading} />
                    <Heading>MEISTBESUCHTE EINZELHÄNDLER</Heading>
                        <MainBarChart retailer data={this.state.retailers} />
                        <Grid item xs={12} container spacing={1}>
                            {this.state.retailers.map(retailer => {
                                return <StatisticItem retailer key={retailer.retailer_id} number={retailer.retailer_id} name={retailer.retailer_name} amount={retailer.amount} />
                            })}
                        </Grid>
                        <Heading>MEISTGEKAUFTE ARTIKEL</Heading>
                        <MainBarChart products data={this.state.products} />
                        <Grid item xs={12} container spacing={1}>
                            {this.state.products.map(article => {
                                return <StatisticItem article key={article.article_id} number={article.article_id} name={article.article_name} amount={article.number_bought} />
                            })}
                        </Grid>
                        
                        <Link to="./show">
                            <MainButton>STATISTIK ANZEIGEN</MainButton>
                        </Link>

                    </>
                }
            </>
        );
    }
}
 
export default StatisticPage;