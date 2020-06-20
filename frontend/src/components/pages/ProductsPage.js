import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Searchbar from '../layout/Searchbar';
import Article from '../layout/Article';
import IconButton from '../layout/IconButton'
import Heading from '../layout/Heading'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    article: {
      padding: theme.spacing(0), 
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
        className={classes.root} xs={12}
        style={{marginLeft:3, marginRight:5}}>

        <Grid container xs={12}>
        <Grid item xs={9}>
          <Searchbar />
        </Grid>
        <Grid item xs={3}>
          <IconButton />
        </Grid>
        </Grid>
        
        

      <Grid container 
        spacing={12}
        className={classes.article}
        direction="row"
        alginItem="center"
        justify="flex-start"
        >
          <Grid item xs={12}>
            <Heading>fruits</Heading>
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
          <Grid item xs={2.4}>
            <Article />
          </Grid>         
        </Grid>

        <Grid container 
        spacing={12}
        className={classes.article}
        direction="row"
        alginItem="center"
        justify="flex-start"
        >
          <Grid item xs={12}>
            <Heading>vegetables</Heading>
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