import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MaterialIconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box'

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5, 
  },
});

/**
 * Displays an icon button as designed in figma
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 * @property icon (string): the icon name to display, can be either: add, shopping_cart, shopping_cart_outline, shopping_list, shopping_list_outline, checkmark, people
 */
class IconButton extends Component {
  render(){
    const { classes } = this.props;

    return (
      <Box 
        border={1} 
        borderColor='#e0e0e0'
        borderRadius={5}
        style={{display: 'grid'}}
      >
        <MaterialIconButton 
          className={classes.root}
          style={{padding: 9}}
        >
          <Icon 
            style={{ color: '#00BCD4'}}
            fontSize="large" 
          />
        </MaterialIconButton>
      </Box>

    )
  }
}

IconButton.propTypes = {
  icon: PropTypes.string,
}

export default withStyles(styles)(IconButton);