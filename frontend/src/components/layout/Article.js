import React, {Component} from 'react'
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box'
import MaterialIconButton from '@material-ui/core/IconButton';
import { withRouter } from "react-router-dom";
import CustomIcon from "../layout/CustomIcon"

const styles = theme => ({
    root:{
    backgroundColor: '#f2f2f2', 
    borderRadius: 5,
    fontFamily: "'Montserrat', sans-serif",
    padding:'1px', 
    width:'60px', 
    height:'60px',
    },
    imageIcon:{
      height: '100%'
    },
    iconRoot:{
      textAlign: 'center'
    },
    icon: {
      height:'100%',
      width:'100%',
      margin:'9px', 
      marginTop: '22px',
    },
    itemName: {
      fontSize: "12px", 
      color: 'black',  
      overflowWrap: "break-word", 
      marginTop: '2px'

    }
})

/**
 * Displays an article icon / button as designed in figma
 * 
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz)
 * @author [Pia Schmid](https://github.com/PiaSchmid)
 * 
 */
 class Article extends Component{
  constructor(){
    super()
    this.handleButtonPress = this.handleButtonPress.bind(this)
    this.handleButtonRelease = this.handleButtonRelease.bind(this)
  }

  handleButtonPress(){
    this.buttonPressTimer = setTimeout(() => this.props.history.push({pathname: '/create_article', state:{id: this.props.id, name: this.props.itemname, category: this.props.category}
    }), 1000)
  }

  handleButtonRelease(){
    clearTimeout(this.buttonPressTimer);
  }

     render(){
        const classes = this.props.classes;
        //const {history} = this.props;

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
        
        <MaterialIconButton 
          className={classes.root}
          //style={{padding: '1px' , width:'60px', height:'60px' }}
        >
          <div className = {classes.icon}
          //style={{height:'100%',width:'100%',margin:'9px', marginTop: '20px'}}
          >

            <CustomIcon iconName ={this.props.iconName}></CustomIcon>
 
            <p className = {classes.itemName}
            //style={{fontSize: "12px", color: 'black',  overflowWrap: "break-word", marginTop: '5px'}}
            >
            {this.props.itemname}</p>
          
          </div>
        </MaterialIconButton>
      </Box>
        ) 
     }
}

Article.propTypes = {
  iconName: PropTypes.string.isRequired,
  itemname: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired, 
}

 export default withRouter(withStyles(styles)(Article));