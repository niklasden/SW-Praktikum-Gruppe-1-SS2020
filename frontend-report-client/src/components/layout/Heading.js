import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

/**
 * Displays headline-text based on material ui typography and theme.js
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 * 
 */

class Heading extends Component {
    render() { 
        return (
            <Typography variant={this.props.variant ? this.props.variant : 'h6'} color="primary">{this.props.children}</Typography>
        );
    }
}
 
export default Heading;