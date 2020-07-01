import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    // height: '300px', 
    // width: '300px',
  },
  indicator: {
    display: 'flex',
    direction: 'column'
  }, 
  indicatorText: {
    display: 'block'
  }
});


/**
 * Bar Chart, creation heavily influenced by https://gist.github.com/maxbbn/2940126
 * 
 * @author Christopher Böhm
 */
class LineChart extends Component {
  render(){
    return (
      <>
        
      </>
    )
  }
}

export default withStyles(styles)(LineChart)
