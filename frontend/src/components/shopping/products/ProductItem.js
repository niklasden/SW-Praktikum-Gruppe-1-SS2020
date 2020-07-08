import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

/**
 * Renders a Product object.
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 */
export default function ProductItem(props) {
    const [product] = useState(props.p);
    console.log("P", product);
    return(
        <Grid>
            Hi
        </Grid>
    )
}