import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from "@material-ui/styles";
import Box from '@material-ui/core/Box';
import MaterialIconButton from '@material-ui/core/IconButton';
import { Grid,Avatar } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import avatar from '../img/avatar.jpg';
/**
 * Displays a group member item in a specific group
 * 
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz)
 * 
*/

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
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginLeft:10
  },
  margin: {
    margin: theme.spacing(1),
  },
});

class GroupMember extends Component {
  render() {
    return (
    <Grid 
    style={{marginBottom:5}}
    container 
    direction='row'
    justify='center'
    alignItems='center'
    className={this.props.classes.root}
       >
        <Grid item xs={2}>
          {/*<img style={{height:'25px', width: '25px', marginTop:4}} src={this.props.imgsrc}></img>*/}
          <Avatar style={{marginLeft:10}} className={this.props.classes.small} alt={this.props.membername} src={this.props.imgsrc}
					/>
        </Grid>

        <Grid item xs={8}>
        <t style={{color: '#000000', fontSize: 18}}>{this.props.membername}</t>
        </Grid>

        <Grid item xs={2}>
          
            <IconButton aria-label="delete" className={this.props.classes.margin} style={{padding:0}}>
              <DeleteIcon fontSize="small" />
          </IconButton>
        </Grid>
        
    </Grid>
    );
  }
}

GroupMember.propTypes = {
  imgsrc: PropTypes.string.isRequired,
  membername: PropTypes.string.isRequired,
}

export default withStyles(styles)(GroupMember);