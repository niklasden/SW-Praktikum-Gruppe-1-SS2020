import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductList from '../shopping/products/ProductList';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
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
      <Grid container spacing={3} className={classes.root}>
            <ProductList products={products} />
    </Grid>
    )
}
export default ProductsPage;