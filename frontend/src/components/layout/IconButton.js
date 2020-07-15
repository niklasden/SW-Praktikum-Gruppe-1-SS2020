 import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MaterialIconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5, 
    height: "48px",
    width: "48px"
  },
});

/**
 * Displays an icon button
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 * @property icon (string): the name of the icon to display, can be either: add, shopping_cart, 
 * shopping_cart_outline, shopping_list, shopping_list_outline, checkmark, people
 * @property onClick (function): a function that is executed when the button is clicked
 */
class IconButton extends Component {
  render(){
    const { classes } = this.props;
    let size = '48px' 
    if(this.props.size == 'small'){
      size = '35px'
    }

    return (
      <Box 
        border={1} 
        borderColor='#bdbdbd'
        borderRadius={5}
        style={{
          display: 'inline-block', 
          height: size, 
          width: size, 
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
          <MaterialIconButton onClick={this.props.onclick}>
          <Icon 
            style={{ color: '#00BCD4'}}
          >{this.props.icon}</Icon>
          </MaterialIconButton>
        </div>
      </Box>
    )
  }
}

IconButton.propTypes = {
  icon: PropTypes.string, 
  onclick: PropTypes.func,
}

export default withStyles(styles)(IconButton);