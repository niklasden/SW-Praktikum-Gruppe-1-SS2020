import React, { Component } from 'react'

import Icon from '@material-ui/core/Icon'

// icon imports 
import appleIcon from '../../icons/apple.svg'
import milkIcon from '../../icons/milk.svg'
import breadIcon from '../../icons/bread.svg'

// add your icon here, you can then call it by <CustomIcon name='iconname' />
// place the file in icons and import it the same way the appleIcon has been imported
// e.g. <CustomIcon name='apple' /> in case you want an apple icon
const icons = { 
  apple: appleIcon, 
  milk: milkIcon, 
  bread: breadIcon, 
}

/**
 * Displays an icon button as designed in figma
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 */
class CustomIcon extends Component {
  render(){
    let icon = 'apple'
    if (this.props.iconName != undefined){
      icon = this.props.iconName
    }

    let dimension = 20
    if (this.props.width != undefined){
      dimension = this.props.width
    }

    return (
      <img
        style={{ 
          width: dimension, 
          height: dimension 
        }} 
        src={icons[icon]}
      />
    )
  }
}

export default CustomIcon