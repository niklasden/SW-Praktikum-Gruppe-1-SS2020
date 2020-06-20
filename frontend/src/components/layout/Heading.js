import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class Heading extends Component {
    render() { 
        return (
            <Typography variant={this.props.variant ? this.props.variant : 'h4'} color="primary">{this.props.children}</Typography>
        );
    }
}
 
export default Heading;