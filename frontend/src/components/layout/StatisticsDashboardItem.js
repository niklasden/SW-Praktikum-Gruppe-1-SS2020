import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    backgroundColor: '#f2f2f2', 
    // display: 'inline-block', 
    width: 105, 
    height: 81, 
    marginBottom: 12, 
  },
  number: {
    fontSize: 20, 
    color: '#00bcd4', 
    margin: 0, 

  }, 
  article: {
    color: '#000', 
    fontWeight: 'bold',
    margin: 0,  
  }, 
  bought: {
    color: '#000', 
    margin: 0, 
  }
});

class StatisticsArticle extends Component {
  render(){
    return (
      <div className={this.props.classes.root}> 
        <p 
          className={this.props.classes.number}
        >{this.props.number}</p>
        <p 
          className={this.props.classes.article}
        >{this.props.article}</p>
        <p 
          className={this.props.classes.bought}
        >{this.props.bought}</p>
      </div>
    )
  }
}

export default withStyles(styles)(StatisticsArticle);