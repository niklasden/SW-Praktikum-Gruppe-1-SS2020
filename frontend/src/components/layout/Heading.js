import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import theme from '../../Theme';

class Heading extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <Typography variant={this.props.variant ? this.props.variant : 'h4'} color="primary">{this.props.children}</Typography>
        );
    }
}
 
export default Heading;