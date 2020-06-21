import React, { Component } from 'react'

import Icon from '@material-ui/core/Icon'

// icon imports 
import appleIcon from '../../icons/apple.svg'
import milkIcon from '../../icons/milk.svg'
import breadIcon from '../../icons/bread.svg'
import beermugIcon from '../../icons/beermug.svg'
import orangejuiceIcon from '../../icons/orangejuice.svg'
import teaIcon from '../../icons/tea.svg'
import wineIcon from '../../icons/wine.svg'
import colaIcon from '../../icons/cola.svg'
import waterIcon from '../../icons/water.svg'
import icecreamIcon from '../../icons/icecream.svg'
import donutIcon from '../../icons/donut.svg'
import chipsIcon from '../../icons/chips.svg'
import popcornIcon from '../../icons/popcorn.svg'
import bombomsIcon from '../../icons/bomboms.svg'
import chocolateIcon from '../../icons/chocolate.svg'
import cakeIcon from '../../icons/cake.svg'
import cokkiesIcon from '../../icons/cookies.svg'
import flourIcon from '../../icons/flour.svg'
import saltpepperIcon from '../../icons/saltpepper.svg'
import basilIcon from '../../icons/basil.svg'
import chilliIcon from '../../icons/chilli.svg'
import garlicIcon from '../../icons/garlic.svg'
import ketchupIcon from '../../icons/ketchup.svg'
import mustardIcon from '../../icons/mustard.svg'
import pizzaIcon from '../../icons/pizza.svg'






// add your icon here, you can then call it by <CustomIcon name='iconname' />
// place the file in icons and import it the same way the appleIcon has been imported
// e.g. <CustomIcon name='apple' /> in case you want an apple icon
const icons = { 
  apple: appleIcon, 
  milk: milkIcon, 
  bread: breadIcon,
  beermug:beermugIcon,
  orangejuice:orangejuiceIcon,
  tea:teaIcon,
  wine:wineIcon,
  cola:colaIcon,
  water:waterIcon,
  icecream:icecreamIcon,
  donut:donutIcon,
  chips:chipsIcon,
  popcorn:popcornIcon,
  bomboms:bombomsIcon,
  chocolate:chocolateIcon,
  cake:cakeIcon,
  cookies:cokkiesIcon,
  flour:flourIcon,
  saltpepper:saltpepperIcon,
  basil:basilIcon,
  chilli:chilliIcon,
  garlic:garlicIcon,
  ketchup:ketchupIcon,
  mustard:mustardIcon,
  pizza:pizzaIcon,
  






  
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