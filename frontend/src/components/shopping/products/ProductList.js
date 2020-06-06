import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ProductItem from './ProductItem';

/**
 * Renders a list of Product objects.
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 */
export default function ProductList(props) {
  const [products, setProducts] = useState(props.products);
  console.log("ProductList:", products);
  return (
    <Grid>
      HI
      {
        products.map((product) =>
          <ProductItem product={product} />
        )
      }
    </Grid>
      )
}