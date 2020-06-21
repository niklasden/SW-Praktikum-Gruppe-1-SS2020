import React, { Component } from 'react'

import Icon from '@material-ui/core/Icon'

// icon imports 
import appleIcon from '../../icons/apple.svg'
import milkIcon from '../../icons/milk.svg'
import breadIcon from '../../icons/bread.svg'
import orangeIcon from '../../icons/orange.svg'
import strawberryIcon from '../../icons/strawberry.svg'
import bananaIcon from '../../icons/banane.svg'
import grapeIcon from '../../icons/grape.svg'
import cucumberIcon from '../../icons/cucumber.svg'
import tomatoIcon from '../../icons/tomato.svg'
import lettuceIcon from '../../icons/lettuce.svg'
import meatIcon from '../../icons/meat.svg'
import fishIcon from '../../icons/fish.svg'
import cheeseIcon from '../../icons/cheese.svg'
import eggIcon from '../../icons/egg.svg'
import noodlesIcon from '../../icons/noodles.svg'
import lipstickIcon from '../../icons/lipstick.svg'
import yoghurtIcon from '../../icons/yoghurt.svg'
import chickenIcon from '../../icons/chicken.svg'
import soapIcon from '../../icons/soap.svg'

// add your icon here, you can then call it by <CustomIcon name='iconname' />
// place the file in icons and import it the same way the appleIcon has been imported
// e.g. <CustomIcon name='apple' /> in case you want an apple icon
const icons = { 
  apple: appleIcon, 
  milk: milkIcon, 
  bread: breadIcon, 
  orange: orangeIcon, 
  strawberyy: strawberryIcon, 
  banana: bananaIcon, 
  grape: grapeIcon, 
  cucumber: cucumberIcon, 
  tomato: tomatoIcon, 
  lettuce: lettuceIcon, 
  meat: meatIcon, 
  chicken: chickenIcon, 
  fish: fishIcon, 
  cheese: cheeseIcon, 
  egg: eggIcon, 
  noodles: noodlesIcon, 
  lipstick: lipstickIcon,
  yoghurt: yoghurtIcon, 
  soap: soapIcon, 
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