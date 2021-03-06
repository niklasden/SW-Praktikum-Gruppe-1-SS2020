import React, {Component} from 'react'
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box'
import MaterialIconButton from '@material-ui/core/IconButton';
import { withRouter } from "react-router-dom";
import CustomIcon from "../layout/CustomIcon"

/**
 * 
 * Displays an item with icon and description of a favorite article
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 * 
 */

 class FavoriteArticle extends Component{
  constructor(){
    super()
    this.handleButtonPress = this.handleButtonPress.bind(this)
    this.handleButtonRelease = this.handleButtonRelease.bind(this)
  }

  /* When button is pressed for 1000ms the user get's redirected to the page for editing the selected favorite article*/
  handleButtonPress(){
    this.buttonPressTimer = setTimeout(() => this.props.history.push({pathname: '/edit_favorite_article/' + this.props.id, state:{id: this.props.id, name: this.props.itemname, category: this.props.category}
    }), 1000)
  }
  /* When button is released before 1000ms the timer gets cleared. */

  handleButtonRelease(){
    clearTimeout(this.buttonPressTimer);
  }

      /* Renders the component */
     render(){
        const classes = this.props.classes;
        return(
      <Box 
        border={1} 
        borderColor='#e0e0e0'
        borderRadius={5}
        style={{display: 'inline-block', margin: '3px', fontFamily: "'Montserrat', sans-serif"}}
        onTouchStart={this.handleButtonPress} 
        onTouchEnd={this.handleButtonRelease} 
        onMouseDown={this.handleButtonPress} 
        onMouseUp={this.handleButtonRelease} 
        onMouseLeave={this.handleButtonRelease}
      >
        
        <MaterialIconButton className={classes.root} style={{padding: '1px' , width:'60px',height:'60px' }} >
          <div style={{height:'100%',width:'100%',margin:'9px'}}>
            <CustomIcon iconName ={this.props.iconName}></CustomIcon>
            <p style={{fontSize: "12px", color: 'black',  overflowWrap: "break-word", marginTop: '5px'}}>{this.props.itemname}</p>
          </div>
        </MaterialIconButton>
      </Box>
        ) 
     }
}

const styles = theme => ({
  root:{
  backgroundColor: '#f2f2f2', 
  borderRadius: 5,
  fontFamily: "'Montserrat', sans-serif"
  },
  imageIcon:{
    height: '100%'
  },
  iconRoot:{
    textAlign: 'center'
  },
  textroot:{

  }
})

 export default withRouter(withStyles(styles)(FavoriteArticle));