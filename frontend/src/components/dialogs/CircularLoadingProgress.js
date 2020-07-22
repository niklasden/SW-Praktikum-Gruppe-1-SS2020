import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress } from '@material-ui/core';

/**
 * Shows a  circularloading progress, if the show prop is true.
 * 
 * @See See Materiel-UIs [Progress](https://material-ui.com/components/progress/)
 * @See See Materiel-UIs [Circular Progress](https://material-ui.com/api/linear-progress/)
 * 
 * @author [Niklas Denneler](https://github.com/niklasden)
 */
class CircularLoadingProgress extends Component {

  /** Renders the component */
  render() {
    const { classes, show } = this.props;

    return (
      show ?
        <div className={classes.root} style={{textAlign: 'center'}}>
          <CircularProgress color='primary' />
        </div>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    
  }
});

/** PropTypes */
CircularLoadingProgress.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** If true, the loading progress is rendered */
  show: PropTypes.bool.isRequired,
}

export default withStyles(styles)(CircularLoadingProgress);
