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
import ShoppingSettings from '../../shoppingSettings'
import AddListItem from '../layout/AddListItem';

const settings = ShoppingSettings.getSettings()

/**
 * Renders a list of ArticleEntry objects
 * 
 * @see ProductListEntry
 * 
 * @author [Pia Schmid](https://github.com/PiaSchmid)
 */
class ProductsPage extends Component {
  //Init the state
  state = {
    searchValue: '',
    loadingInProgress: false, 
    loadingArticlesError: null, 
    addingArticleError: null, 
    articles: [],
    shoppinglists: [],
    selected_shoppinglist: [], 
    currentGroupID: settings.getGroupID(),

    currentItem: null,
    changeItemOpen: false, 
  }

  /** Fetches ArticleBOs */
  async getProducts(){
    this.setState({
      loadingInProgress: true, 
      loadingArticleError: null 
    })

    try {
      const init = {
        method: 'GET',
        credentials: 'include', 
      }
      const res = await fetch(Config.apiHost + '/Article', init);
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
  }

  /** Lifecycle methods, which is called when the component gets inserted into the browsers DOM */
  componentDidMount(){
    this.getProducts()
  }

  changeCurrentItem(item){
    console.log(item)

    this.setState({
      currentItem: item,
      changeItemOpen: true, 
    })
  }

  /** Renders the Article Objects */
  renderArticles(){
    //set the right icon to the article, in case of no individual icon it returns the specific category icon
    function getIconName(name, category){
      if (articleIDIconMapper[name] !== undefined){
        return articleIDIconMapper[name]
      } else if (categoryIconMapper[category] !== undefined){
        return categoryIconMapper[category]
      }
      return 'advertising'
    }

    //reduce creates an array with all articles of the same category
    var categories = this.state.articles.reduce((itemsSoFar, {category, name, id}) => {
      if (!itemsSoFar[category]) itemsSoFar[category] = [];
      var iconName = getIconName(name, category)
      itemsSoFar[category].push({name, id, iconName});
      return itemsSoFar; 
    }, {});

    //Checks if there is an article equal to the search-value 
    if(this.state.searchValue !== ''){
      categories = this.state.articles.reduce((itemsSoFar, {category, name, id}) => {
        if (!itemsSoFar[category]) itemsSoFar[category] = [];
        var iconName = getIconName(name, category)
        if (name.toLowerCase().includes(this.state.searchValue.toLowerCase())) itemsSoFar[category].push({name, category,  id, iconName});
        return itemsSoFar;
      }, 
      {});
    }
  
   return Object.entries(categories).map(category => (
      <div key={category[1].id}>

        <Heading>{category[0]}</Heading>

        <Grid container
          direction ="row"
        >
          {category[1].sort((a, b) => (a.name > b.name) ? 1 : -1).map(item => (
            <ProductListEntry
              key={item.id}
              item={item}
              id={item.id}
              category={category[0]}
              name={item.name}
              iconName={item.iconName}
              style={{marginBottom:12}}
              changeCurrentItem={this.changeCurrentItem.bind(this)}
            />
          ))}
        </Grid>
      </div>
    ));
  }

  /** Renders the component */
  render(){
    const classes = this.props.classes

    return( 
        <Grid container 
          className={classes.root}
        >
          <Grid container 
          spacing={1}
          >
            <Grid item xs={8}>
              <TextInputBar placeholder="search..." icon="search" onChange={(elem) => this.setState({ searchValue: elem.target.value})}/>
            </Grid>

            <Grid item xs={4}>
              <Link to="/create_article">
                <IconButton icon='add' />
              </Link>
              <Link to="/favorite_products" className = {classes.favProducts}>
                <IconButton icon='star'/>
              </Link>
            </Grid>
          </Grid>
          <div 
            className= {classes.loading}
          >
            {(this.state.currentGroupID === 0) ? 
              <div style={{marginTop:'20px'}}>
                No group found!<br /> Switch to HomePage and select your active group!
              </div>
            :
              this.state.loadingInProgress ?
                <div className = {classes.article}>
                  <CircularProgress size={25} style={{marginTop: 20}} />
                </div> 
              :  
                this.renderArticles()
            }
          </div>
          {this.state.currentItem !== null &&
            <AddListItem
              open={this.state.changeItemOpen}
              item={this.state.currentItem}
              PressButtonBack={() => this.setState({changeItemOpen: false})}
              PressButtonConfirm={() => this.setState({changeItemOpen: false})}
            />
          }
        </Grid>
    )
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginBottom: 50
  },
  article: {
    display: 'flex', 
    justifyContent: 'center' 
  },
  loading: {
    width: '100%'
  }, 
  favProducts: {
    marginLeft: 10
  }
});

 /** individual icons for the articles */
const articleIDIconMapper = {
  apple: 'apple', 
  banana: 'banana',
  oranges: 'orange',
  grape: 'grape', 
  steak: 'meat', 
  meat: 'meat', 
  fish: 'fish', 
  tomato: 'tomato', 
  cucumber: 'cucumber', 
  lettuce: 'lettuce', 
  mustard: 'mustard', 
  strawberry: 'strawberry', 
  tea: 'tea', 
  milk: 'milk', 
  cread: 'bread', 
  beermug: 'beermug', 
  "orange juice": 'orangejuice', 
  wine: 'wine', 
  cola: 'cola', 
  water: 'water',
  cheese: 'cheese',
  eggs: 'egg',
  yoghurt: 'yoghurt',
  noodle: 'noodle',
  flour: 'flour',
  pizza: 'pizza',
  icecream: 'icecream',
  donut: 'donut',
  chips: 'chips',
  salmon: 'fish',
  popcorn: 'popcorn',
  bombom: 'bomboms',
  chocolate: 'chocolate',
  cake: 'cake',
  cookies: 'cookies',
  "salt & pepper": 'salt & pepper',
  basil: 'basil',
  chilli: 'chilli',
  garlic: 'garlic',
  ketchup: 'ketchup',
  lipstick: 'lipstick',
  soap: 'soap',
};

/** Icons for the category */
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

export default withStyles(styles)(ProductsPage);