import React, { Component } from "react";

import PropTypes from 'prop-types';

import { withStyles } from "@material-ui/styles";
import MaterialIconButton from '@material-ui/core/IconButton';
import { Grid,Avatar} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
    root: {
        backgroundColor: '#F2F2F2',
        borderWidth: 1,
        borderColor: '#BDBDBD',
        borderRadius: 10,
        borderColor: '#BDBDBD',
        borderStyle: 'solid',
        width: 'auto',
        marginLeft: 5,
        height: 35,
        marginRight: 8,
      },small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
});

/**
 * Displays a list item in a Specific Group
 * 
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz)
 * 
*/
class GroupListItem extends Component {
  render() {
    return (
        <div >
    <Grid onClick = {() => {alert("Clicked")}}
    
    style={{marginBottom:5}}
      container 
      direction='row'
      justify='center'
      alignItems='center'
      className={this.props.classes.root}
       >
        
        <Grid item xs={2}>
          <Icon style={{marginLeft:10, color: '#00BCD4', marginTop: 3}}>list</Icon>
        </Grid>
    

        <Grid item xs={8}>
        <t style={{color: '#000000', fontSize: 18}}>{this.props.Listname}</t>
        </Grid>
        
    </Grid>
    </div>
    );
  }
}

GroupListItem.propTypes = {
  imgsrc: PropTypes.string.isRequired,
  Listname: PropTypes.string.isRequired,
}

export default withStyles(styles)(GroupListItem);