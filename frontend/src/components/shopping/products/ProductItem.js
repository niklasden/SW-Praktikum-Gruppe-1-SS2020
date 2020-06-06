import React, { useState } from 'react';

/**
 * Renders a Product object.
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 */


function ProductItem(props) {
    const [product, setProduct] = useState(props.product);
    console.log("ProductItem:", product);
    return(
        <div>
            Hi
        </div>
    )
}
export default ProductItem;