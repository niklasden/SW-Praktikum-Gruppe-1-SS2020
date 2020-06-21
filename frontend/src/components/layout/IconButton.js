import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MaterialIconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box'


const styles = theme => ({
  
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
        borderColor='#bdbdbd'
        borderRadius={5}
        style={{
          display: 'inline-block', 
          height: '48px', 
          width: '48px', 
          backgroundColor: '#fafafa',
          ...this.props.style
        }}
      >
        <div style={{
          justifyContent: 'center', 
          alignItems: 'center',
          display: 'flex',
          height: '100%',
        }}>
          <Icon 
            style={{ color: '#00BCD4'}}
            fontSize="medium" 
          >{this.props.icon}</Icon>
        </div>
      </Box>
    )
  }
}

IconButton.propTypes = {
  icon: PropTypes.string, 
}

export default withStyles(styles)(IconButton);