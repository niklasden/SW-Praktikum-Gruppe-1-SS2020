import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class Heading extends Component {
    render() { 
        return (
            <Typography variant={this.props.variant ? this.props.variant : 'h6'} color="primary">{this.props.children}</Typography>
        );
    }
}
 
export default Heading;