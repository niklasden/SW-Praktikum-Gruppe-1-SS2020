import React, {Component} from 'react'
import { Divider, SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import PropTypes from 'prop-types';


import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box'
import MaterialIconButton from '@material-ui/core/IconButton';
import svg from '@material-ui/icons/AccessAlarm';

import { withRouter } from "react-router-dom";


const styles = theme => ({
    root:{
        backgroundColor: '#f2f2f2', 
    borderRadius: 5,
    
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



/**
 * Displays an article icon / button as designed in figma
 * 
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz)
 * 
 */


 class Article extends Component{
  constructor(){
    super()
    this.handleButtonPress = this.handleButtonPress.bind(this)
    this.handleButtonRelease = this.handleButtonRelease.bind(this)
  }


  /*handleButtonPress(){
    this.buttonPressTimer = setTimeout(() => window.location.assign("/create_article"), 1500)
  }*/

  handleButtonPress(){
    this.buttonPressTimer = setTimeout(() => this.props.history.push({pathname: '/create_article', state:{name: this.props.name, category: this.props.category}
  }), 1500)
  }

  handleButtonRelease(){
    clearTimeout(this.buttonPressTimer);
  }

     render(){
        const classes = this.props.classes;
        const {history } = this.props;

        return(
            
      <Box 
        
        border={1} 
        borderColor='#e0e0e0'
        borderRadius={5}
        style={{display: 'inline-block', margin: '3px'}}

        onTouchStart={this.handleButtonPress} 
        onTouchEnd={this.handleButtonRelease} 
        onMouseDown={this.handleButtonPress} 
        onMouseUp={this.handleButtonRelease} 
        onMouseLeave={this.handleButtonRelease}
      >
        <MaterialIconButton 
          
          className={classes.root}
          style={{padding: '1px' , width:'60px',height:'60px' }}
          /**
            @pia changed padding to 1px, damit die Artikelbezeichnung über die ganze Länge des Buttons geht
           */
        >
        <div style={{height:'100%',width:'100%',margin:'9px'}}>
        
        <Icon 
        classes={{root: classes.iconRoot}}
        style={{height:'80%',width:'80%'}}> 
        <img className={classes.imageIcon} style={{margin:'3px',height:'100%',width:'100%'}} src={this.props.imgsrc}/>
          
        </Icon>
        
        
        <p style={{fontSize: "12px" ,color: "black", overflowWrap: "break-word"}}>{this.props.itemname}</p>
        {/**
         * @pia added overflowWrap, für eine automatische Worttrennung 
         */}
        
        </div>
        </MaterialIconButton>
      </Box>
        
        


        ) 
     }
    
}
Article.propTypes = {
  imgsrc: PropTypes.string.isRequired,
  itemname: PropTypes.string.isRequired,
}

 export default withStyles(styles)(Article);