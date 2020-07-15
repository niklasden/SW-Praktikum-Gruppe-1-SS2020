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
  1: 'apple', 
  2: 'banana',
  3: 'orange',
  //4: '', 
  5: '', 
  6: '', 
  7: '', 
  8: '', 
  9: '', 
  10: '', 
  11: 'cucumber', 
  12: '', 
  13: '', 
  14: '', 
  15: 'strawberyy', 
  16: 'tea', 
  17: 'milk', 
  18: 'bread', 
  19: 'beermug', 
  20: 'orangejuice', 
  21: 'wine', 
  22: 'cola', 
  23: 'water',



}

const categoryIconMapper = {
  1: 'vegetables',
  2: 'meatAndFish',
  3: 'fruits', 
  4: 'beverages', 
  5: 'soap',
  6: 'snacks', 
  7: 'milkAndEggs', 
  8: 'cosmetics', 
  9: 'convenience'
}

/**
const ICONS = [
  {
    id: '1', 
    iconName: 'vegetables'
  }, 
  {
    id: '2', 
    iconName: 'meatAndFish'
  }, 
  {
    id: '3', 
    iconName: 'fruits'
  }, 
  {
    id: '4', 
    iconName: 'beverages'
  }, 
  {
    id: '5', 
    iconName: 'soap'
  },
  {
    id: '6', 
    iconName: 'snacks'
  },
  {
    id: '7', 
    iconName: 'milkAndEggs'
  },
  {
    id: '8', 
    iconName: 'cosmetics'
  },
  {
    id: '9', 
    iconName: 'convenience'
  },
] 

 * Example Categorys with Articles
 
const FRUITS = [
  {
    id: 'art1',
    category: 'fruits', 
    name: 'apple', 
    iconName: 'apple',
  },
  {
    id: 'art2',
    category: 'fruits', 
    name: 'banana',
    iconName: 'banana',
  },
  {
    id: 'art3',
    category: 'fruits', 
    name: 'grape',
    iconName: 'grape',
  }, 
  {
    id: 'art4',
    category: 'fruits', 
    name: 'orange', 
    iconName: 'orange',
  }, 
  {
    id: 'art5',
    category: 'fruits', 
    name: 'strawberry',
    iconName: 'strawberyy',
  }, 
]
  const VEGETABLES = [
  {
    id: 'art1',
    category: 'vegetables', 
    name: 'tomato',
    iconName: 'tomato',
  }, 
  {
    id: 'art2',
    category: 'vegetables', 
    name: 'lettuce',
    iconName: 'lettuce',
  }, {
    id: 'art3',
    category: 'vegetables', 
    name: 'cucumber',
    iconName: 'cucumber',

  },
]
const MEAT =[
  {
    id: "art1",
    category: "meat",
    name: "meat",
    iconName: 'meat',

  }, 
  {
    id: "art2",
    category: "meat",
    name: "fish",
    iconName: 'fish',

  }
]*/

//Braucht man das ???
const getProductsDummy = () => {
    let productsJSON = [];
    fetch("http://localhost:8081/api/shoppa/products")
    .then(res => res.json())
    .then(json => {
        productsJSON.push(json);
    })
    return productsJSON;
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
/**
    setTimeout(() => {
      this.setState({
        loadingInProgress: false, 
        loadingArticleError: null, 
        articles: this.state.articles.concat(MEAT,FRUITS,VEGETABLES)
      })
    }, 1000)
  } */

  renderArticles(){
    /*reduce creates an array with all articles of the same category*/

    function getIconName(id, category){
      if (articleIDIconMapper[id] !== undefined){
        return articleIDIconMapper[id]
      } else if (categoryIconMapper[category.id] !== undefined){
        return categoryIconMapper[category.id]
      }
      return 'otherIcon'
    }
    

    var categories = this.state.articles.reduce((itemsSoFar, {category, name, id}) => {
      if (!itemsSoFar[category]) itemsSoFar[category] = [];
      var iconName = getIconName(id, category)
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
        <div>

          <Heading>{category[0]}</Heading>

          <Grid container
          direction ="row">
           {category[1].map(item => (

             <ProductListEntry
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

      <Grid container 
        className={classes.root} 
      >

        <Grid container spacing={2}>

          <Grid item xs={10}>
            <TextInputBar placeholder="search..." icon="search" onChange={(elem) => this.setState({ searchValue: elem.target.value})}/>
          </Grid>

          <Grid item xs={2}>
            <Link to="/create_article">
              <IconButton icon='add' />
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