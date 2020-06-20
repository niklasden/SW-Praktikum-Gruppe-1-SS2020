import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MaterialIconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5, 
  },
});

/**
 * Displays an icon button as designed in figma
 * 
 * @author [Niklas Denneler](https://github.com/)
 * @author [Julius Jacobitz]()
 * 
 * @property icon (string): the icon name to display, can be either: add, shopping_cart, shopping_cart_outline, shopping_list, shopping_list_outline, checkmark, people
 */
class SpecificGroup extends Component {
  render(){
    const { classes } = this.props;

    return (
        <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Group Name" variant="outlined" />
      </form>


    )
  }
}

SpecificGroup.propTypes = {
  icon: PropTypes.string,
}

export default withStyles(styles)(SpecificGroup);