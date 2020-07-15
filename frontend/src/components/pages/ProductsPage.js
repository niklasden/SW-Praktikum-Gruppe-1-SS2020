import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextInputBar from '../layout/TextInputBar';
import IconButton from '../layout/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import ProductListEntry from '../layout/ProductListEntry';
import { Link } from 'react-router-dom';
import Heading from '../layout/Heading';
import { Config } from '../../config';
import { ListItemIcon } from '@material-ui/core';

const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    article: {
      padding: theme.spacing(0), 
    }
 });

const articleIDIconMapper = {
  apple: 'apple', 
  banana: 'banana',
  oranges: 'orange',
  grape: 'grape', 
  chicken: 'chicken', 
  steak: 'meat', 
  meat: 'meat', 
  fish: 'fish', 
  tomato: 'tomato', 
  cucumbers: 'cucumber', 
  lettuce: 'lettuce', 
  mustard: 'mustard', 
  strawberry: 'strawberyy', 
  tea: 'tea', 
  milk: 'milk', 
  cread: 'bread', 
  beer: 'beermug', 
  "orange juice": 'orangejuice', 
  wine: 'wine', 
  cola: 'cola', 
  water: 'water',
  cheese: 'cheese',
  eggs: 'egg',
  yoghurt: 'yoghurt',
  noodle: 'noodles',
  flour: 'flour',
  pizza: 'pizza',
  "ice cream": 'icecream',
  donut: 'donut',
  chips: 'chips',
  popcorn: 'popcorn',
  bombom: 'bomboms',
  chocolate: 'chocolate',
  cake: 'cake',
  cookies: 'cookies',
  "salt & pepper": 'saltpepper',
  basil: 'basil',
  chilli: 'chilli',
  garlic: 'garlic',
  ketchup: 'ketchup',
  lipstick: 'lipstick',
  soap: 'soap',
}

const categoryIconMapper = {
  vegetables: 'vegetables',
  "meat & fish": 'meatAndFish',
  fruits: 'fruits', 
  "drinks": 'beverages', 
  other: 'soap',
  snacks: 'snacks', 
  "milk & cheese": 'milkAndEggs', 
  cosmetic: 'cosmetics', 
  "convenience & frozen products": 'convenience'
}

/**
 * Renders a list of ArticleEntry objects
 * 
 * @see ProductListEntry
 * 
 * @author [Pia Schmid](https://github.com/PiaSchmid)
 */


class ProductsPage extends Component {
  state = {
    searchValue: '',
    loadingInProgress: false, 
    loadingArticlesError: null, 
    addingArticleError: null, 
    articles: [],
  }

  componentDidMount(){
    this.getProducts()
  }

  async getProducts(){
    this.setState({
      loadingInProgress: true, 
      loadingArticleError: null 
    })

  setTimeout(async () => {
    try {
      const res = await fetch(Config.apiHost + '/Article')
      const json = await res.json()

      this.setState({
        loadingInProgress: false, 
        loadingArticleError: null, 
        articles: json, 
      })
    } catch (e) {
      this.setState({
        loadingInProgress: false, 
        loadingArticleError: '', 
      })
    } 
  }, 1000)
}

  renderArticles(){
    /*reduce creates an array with all articles of the same category*/

    function getIconName(name, category){
      if (articleIDIconMapper[name] !== undefined){
        return articleIDIconMapper[name]
      } else if (categoryIconMapper[category] !== undefined){
        return categoryIconMapper[category]
      }
      return 'advertising'
    }

    var categories = this.state.articles.reduce((itemsSoFar, {category, name, id}) => {
      if (!itemsSoFar[category]) itemsSoFar[category] = [];
      var iconName = getIconName(name, category)
      itemsSoFar[category].push({name, id, iconName});
      return itemsSoFar; 
    }, {});

    /* Checks if there is a Article equal to the search-value*/ 
    if(this.state.searchValue != ''){
      //Erst this.state.articles filtern und dann reducen?
      categories = this.state.articles.reduce((itemsSoFar, {category, name, id, iconName}) => {
        if (!itemsSoFar[category]) itemsSoFar[category] = [];
        if (name.toLowerCase().includes(this.state.searchValue.toLowerCase())) itemsSoFar[category].push({name, category,  id, iconName});
        return itemsSoFar;
      }, {});
    }
  
   return Object.entries(categories).map(category => (
        <div key={category[1].id}>

          <Heading>{category[0]}</Heading>

          <Grid container
          direction ="row">
           {category[1].map(item => (

             <ProductListEntry
             key={item.id}
             id={item.id}
             category={category[0]}
             name={item.name}
             iconName={item.iconName}
             style={{marginBottom:12}}
             />

           ))}
           </Grid>

        </div>
      ));
  }

  render(){
    const classes = this.props.classes
    return(
      <Grid container className={classes.root} >
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <TextInputBar placeholder="search..." icon="search" onChange={(elem) => this.setState({ searchValue: elem.target.value})}/>
          </Grid>
          <Grid item xs={4}>
            <Link to="/create_article">
              <IconButton icon='add' />
            </Link>
            <Link to="/favourite_products" style={{marginLeft: "10px"}}>
              <IconButton icon='star' />
            </Link>
          </Grid>
        </Grid>
        <div style={{width: '100%'}}>
          {this.state.loadingInProgress ?
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress size={25} />
              </div>
            :  
              this.renderArticles()
            }
        </div>
      </Grid>
    )
  }
}

export default withStyles(styles)(ProductsPage);