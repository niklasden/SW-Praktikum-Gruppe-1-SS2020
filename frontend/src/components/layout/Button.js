import React, { Component } from 'react'
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
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
 */
class Button extends Component {
  render(){
    const { classes } = this.props;

    return (
      <Box 
        border={1} 
        borderColor='#e0e0e0'
        borderRadius={5}
        style={{display: 'inline-block'}}
      >
        <IconButton 
          className={classes.root}
          style={{padding: 9}}
        >
          <Icon 
            style={{ color: '#00BCD4'}}
            fontSize="large" 
          />
        </IconButton>
      </Box>

    )
  }
}

Button.propTypes = {
  icon: PropTypes.string,
}

export default withStyles(styles)(Button);