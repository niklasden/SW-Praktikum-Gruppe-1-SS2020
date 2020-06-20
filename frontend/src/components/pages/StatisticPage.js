import React, { Component } from 'react';
import Heading from '../layout/Heading'
import StatisticItem from '../layout/StatisticItem';
import { Grid } from '@material-ui/core';
import MainButton from '../layout/MainButton';
import { Link } from 'react-router-dom';

const Top3RETAILER = [
    {nr: 1, name: 'ALDI', amount: 5},
    {nr: 2, name: 'EDEKA', amount: 3},
    {nr: 3, name: 'DM', amount: 2}
];
const Top3ARTICLES = [
    {nr: 1, name: 'BIER', amount: 31},
    {nr: 2, name: 'PIZZA', amount: 19},
    {nr: 3, name: 'PESTO', amount: 12}
];

class StatisticPage extends Component {
    render() { 
        return (
            <>
            <Heading>MEISTBESUCHTE EINZELHÄNDLER</Heading>
            <Grid xs={12} container spacing={1}>
                {Top3RETAILER.map(retailer => {
                    return <StatisticItem retailer number={retailer.nr} name={retailer.name} amount={retailer.amount} />
                })}
            </Grid>
            <Heading>MEISTGEKAUFTE ARTIKEL</Heading>
            <Grid container spacing={1}>
                {Top3ARTICLES.map(article => {
                    return <StatisticItem article number={article.nr} name={article.name} amount={article.amount} />
                })}
            </Grid>
            <Link to="show-statistic">
                <MainButton>STATISTIK ANZEIGEN</MainButton>
            </Link>
            </>
        );
    }
}
 
export default StatisticPage;