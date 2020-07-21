import React, { Component } from "react";
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from "@material-ui/styles";
import { Grid,Avatar } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';


const styles = theme => ({
  root: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    borderStyle: 'solid',
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
/**
 * Displays a member in a Specific Group at "Members"
 * 
 * It has an icon, a name and a delete button
 * 
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz)
 * 
 * @property membername (string): the name of the member which should be displayed 
*/
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
            <Avatar style={{marginLeft:5}} className={this.props.classes.small} alt={this.props.membername} src={this.props.imgsrc}
          />
          </Grid>
          <Grid item xs={8}>
            {this.props.membername}
          </Grid>
          <Grid item xs={2}>
            <IconButton  aria-label="delete" className={this.props.classes.margin} style={{padding:0}}>
              <DeleteIcon onClick={this.props.onclick} fontSize="small" />
              {this.props.children}
            </IconButton>
          </Grid>
      </Grid>
    );
  }
}

GroupMember.propTypes = {
  imgsrc: PropTypes.string,
  membername: PropTypes.string,
}

export default withStyles(styles)(GroupMember);