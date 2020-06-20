import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Searchbar from '../layout/Searchbar';
import Article from '../layout/Article';
import IconButton from '../layout/IconButton'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2)
    },
    article: {
      padding: theme.spacing(1), 
    }

  }));
const getProductsDummy = () => {
    let productsJSON = [];
    fetch("http://localhost:8081/api/shoppa/products")
    .then(res => res.json())
    .then(json => {
        productsJSON.push(json);
    })
    return productsJSON;
}
function ProductsPage() {
    const classes = useStyles();
    const products = getProductsDummy();
    return (   
      <Grid container 
      spacing={10} 
      className={classes.root}>
        <Grid item xs={9}>
          <Searchbar />
        </Grid>
        <Grid item xs={3}>
          <IconButton />
        </Grid>

      <Grid container  
        className={classes.article}
        direction="row"
        justify="space-between"
        alginItem="center"
        >
          <Grid item xs={2.4}>
            <Article />
          </Grid>
          <Grid item xs={2.4}>
            <Article />
          </Grid>
          <Grid item xs={2.4}>
            <Article />
          </Grid>
          <Grid item xs={2.4}>
            <Article />
          </Grid>
          <Grid item xs={2.4}>
            <Article />
          </Grid>
        </Grid>
    </Grid>
    )
}
export default ProductsPage;