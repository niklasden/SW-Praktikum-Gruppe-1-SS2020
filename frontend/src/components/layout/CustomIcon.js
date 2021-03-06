import React, { Component } from 'react';

// icon imports 
import appleIcon from '../../icons/apple.svg';
import milkIcon from '../../icons/milk.svg';
import breadIcon from '../../icons/bread.svg';
import beermugIcon from '../../icons/beermug.svg';
import orangejuiceIcon from '../../icons/orangejuice.svg';
import teaIcon from '../../icons/tea.svg';
import wineIcon from '../../icons/wine.svg';
import colaIcon from '../../icons/cola.svg';
import waterIcon from '../../icons/water.svg';
import icecreamIcon from '../../icons/icecream.svg';
import donutIcon from '../../icons/donut.svg';
import chipsIcon from '../../icons/chips.svg';
import popcornIcon from '../../icons/popcorn.svg';
import bombomsIcon from '../../icons/bomboms.svg';
import chocolateIcon from '../../icons/chocolate.svg';
import cakeIcon from '../../icons/cake.svg';
import cokkiesIcon from '../../icons/cookies.svg';
import flourIcon from '../../icons/flour.svg';
import saltpepperIcon from '../../icons/saltpepper.svg';
import basilIcon from '../../icons/basil.svg';
import chilliIcon from '../../icons/chilli.svg';
import garlicIcon from '../../icons/garlic.svg';
import ketchupIcon from '../../icons/ketchup.svg';
import mustardIcon from '../../icons/mustard.svg';
import pizzaIcon from '../../icons/pizza.svg';
import orangeIcon from '../../icons/orange.svg';
import strawberryIcon from '../../icons/strawberry.svg';
import bananaIcon from '../../icons/banane.svg';
import grapeIcon from '../../icons/grape.svg';
import cucumberIcon from '../../icons/cucumber.svg';
import tomatoIcon from '../../icons/tomato.svg';
import lettuceIcon from '../../icons/lettuce.svg';
import meatIcon from '../../icons/meat.svg';
import fishIcon from '../../icons/fish.svg';
import cheeseIcon from '../../icons/cheese.svg';
import eggIcon from '../../icons/egg.svg';
import noodlesIcon from '../../icons/noodles.svg';
import lipstickIcon from '../../icons/lipstick.svg';
import yoghurtIcon from '../../icons/yoghurt.svg';
import soapIcon from '../../icons/soap.svg';
import advertisingIcon from '../../icons/advertising.svg';

// category icons imports
import beveragesIcon from '../../icons/beverages.svg';
import convenienceIcon from '../../icons/convenience.svg';
import cosmeticsIcon from '../../icons/cosmetics.svg';
import fruitsIcon from '../../icons/fruits.svg';
import meatAndFishIcon from '../../icons/meat_and_fish.svg';
import milkAndEggsIcon from '../../icons/milk_and_eggs.svg';
import snacksIcon from '../../icons/snacks.svg';
import vegetablesIcon from '../../icons/vegetables.svg';

// add your icon here, you can then call it by <CustomIcon iconName='iconname' />
// place the file in icons and import it the same way the appleIcon has been imported
// e.g. <CustomIcon name='apple' /> in case you want an apple icon
const icons = { 
  apple: appleIcon,
  milk: milkIcon, 
  bread: breadIcon,
  beer: beermugIcon,
  orangejuice: orangejuiceIcon,
  tea: teaIcon,
  wine: wineIcon,
  cola: colaIcon,
  water: waterIcon,
  "ice cream": icecreamIcon,
  donut: donutIcon,
  chips: chipsIcon,
  popcorn: popcornIcon,
  bomboms: bombomsIcon,
  chocolate: chocolateIcon,
  cake: cakeIcon,
  cookies: cokkiesIcon,
  flour: flourIcon,
  "salt & pepper": saltpepperIcon,
  basil: basilIcon,
  chilli: chilliIcon,
  garlic: garlicIcon,
  ketchup: ketchupIcon,
  mustard: mustardIcon,
  pizza: pizzaIcon,
  orange: orangeIcon, 
  strawberry: strawberryIcon, 
  banana: bananaIcon, 
  grape: grapeIcon, 
  cucumber: cucumberIcon, 
  tomato: tomatoIcon, 
  lettuce: lettuceIcon, 
  steak: meatIcon, 
  meat: meatIcon, 
  fish: fishIcon, 
  salmon: fishIcon,
  cheese: cheeseIcon, 
  egg: eggIcon, 
  noodle: noodlesIcon, 
  lipstick: lipstickIcon,
  yoghurt: yoghurtIcon, 
  soap: soapIcon, 
  spinach: vegetablesIcon,

  // category icons
  beverages: beveragesIcon,
  convenience: convenienceIcon, 
  cosmetics: cosmeticsIcon,
  fruits: fruitsIcon,
  meatAndFish: meatAndFishIcon,
  milkAndEggs: milkAndEggsIcon,
  snacks: snacksIcon, 
  vegetables: vegetablesIcon, 

  // non food related icons
  advertising: advertisingIcon, 
}

/**
 * Displays a custom icon using the icons placed in icons folder. 
 * To add an icon just place the svg in icons folder, import it at the beginning of CustomIcon
 * and add it to the icons dictionary 
 * 
 * @author [Christopher Böhm](https://github.com/christopherboehm1)
 * 
 * @property iconName (string): the icon name that is defined in icons constant, default is apple
 */
class CustomIcon extends Component {
  render(){
    let icon = 'apple'
    if (this.props.iconName !== undefined){
      if (this.props.iconName in icons){
        icon = this.props.iconName
      }
      else {
        icon = this.props.category
      }
    }
    else {
      icon = this.props.category
    }    

    let dimension = 20
    if (this.props.width !== undefined){
      dimension = this.props.width
    }

    return (
      <img
        style={{ 
          width: dimension, 
          height: dimension,
          // we don't want colors, so we apply a gray filter on the icons
          filter: `grayscale(100%)`,
          ...this.props.style    
        }} 
        alt={this.props.iconName}
        src={icons[icon]}
      />
    )
  }
}

export default CustomIcon